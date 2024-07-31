import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  evidence: string[];
}

interface AiRequestBody {
  url: string;
  question: string;
  history: ChatMessage[];
}

interface Answer {
  answer: string;
  evidence: string[]
}

type AiResponse = {
  answer: Answer;
  history: ChatMessage[];  
};

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [currentImg, setCurrentImg] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');

  useEffect(() => {
    // Function to get the current tab's URL
    const getCurrentTabUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // console.log(tabs)
        if (tabs[0] && tabs[0].url && tabs[0].favIconUrl && tabs[0].title) {
          setCurrentUrl(tabs[0].url);
          setCurrentImg(tabs[0].favIconUrl)
          setCurrentTitle(tabs[0].title)
        }
      });
    };

    // Get the URL when the component mounts
    getCurrentTabUrl();

    // Set up a listener for tab updates
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === 'complete') {
        getCurrentTabUrl();
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      chrome.tabs.onUpdated.removeListener(getCurrentTabUrl);
    };
  }, []);

  const handleEvidenceClick = (evidence: string) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "searchText",
          text: evidence
        });
      }
    });
  };


  const aiMutation = useMutation({
    mutationFn: (data: AiRequestBody) => 
      axios.post<AiResponse>('http://localhost:5000/api/v1/ai', data).then(res => res.data),
    onSuccess: (data) => {
      setMessages(data.history);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = { role: 'user', content: input, evidence: [] };
    setMessages(prev => [...prev, newMessage]);

    // console.log(messages)

    aiMutation.mutate({
      url: currentUrl,
      question: input,
      history: messages,
    });

    setInput('');
  };

  return (
    <div className="flex-grow flex-1 flex flex-col gap-2">
      <div className="text-sm flex gap-2 items-center bg-blue-100 p-2 rounded">
        <img src={currentImg} alt={currentTitle} className='h-6 w-6 rounded' />
        <div className='flex flex-col'>
          <h1 className='font-semibold'>{currentTitle ?? "Not Found"}</h1>
          <p className='text-xs'>{currentUrl ?? "Not Found Url"}</p>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 rounded p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
            {msg.role == "ai" ? (
              <div className='flex flex-col text-xs gap-[1.5px] font-medium mt-[2px] justify-start items-start text-start'>
                {msg.evidence.length > 0 && msg.evidence.map((ev, idx) => (
                  <button className='text-start' onClick={() => handleEvidenceClick(ev)} key={idx}>🔍 {ev}</button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {aiMutation.isPending && <div className="text-center">Thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full focus:border-blue-600 outline-none p-2 border-[1.5px] border-gray-300 rounded"
          placeholder="Ask a question about this page"
        />
        <button 
          type="submit" 
          className="h-9 w-9 bg-blue-600 text-white p-1 rounded"
          disabled={aiMutation.isPending}
        >
          <PaperAirplaneIcon />
        </button>
      </form>
    </div>
  );
};

export default AiChat;
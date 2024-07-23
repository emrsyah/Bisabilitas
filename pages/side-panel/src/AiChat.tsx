import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import React from 'react';

const apiKey = import.meta.env.VITE_APP_MISTRAL_KEY;

function extractPageContent() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = document.body.innerHTML;

    const scripts = tempElement.getElementsByTagName('script');
    while (scripts[0]) scripts[0].parentNode?.removeChild(scripts[0]);

    const styles = tempElement.getElementsByTagName('style');
    while (styles[0]) styles[0].parentNode?.removeChild(styles[0]);

    console.log("tempElement 1")
    console.log(tempElement)
    console.log("tempElement 2")

    const nonContentSelectors = ['header', 'footer', 'nav', 'aside', '.sidebar', '#sidebar', '.ad', '.advertisement'];
    nonContentSelectors.forEach(selector => {
      const elements = tempElement.querySelectorAll(selector);
      elements.forEach(el => el.parentNode?.removeChild(el));
    });

    let content = tempElement.textContent || tempElement.innerText || '';
    console.log("content 1")
    console.log(content)
    console.log("content 2")
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    return content;
  }

const AiChat = () => {
//   React.useEffect(() => {
//     // extractPageContent()
//     extractPageContentUtil
//   },[])
  return (
    <div className="flex-grow flex-1 flex flex-col gap-2">
      <div className="flex-grow bg-gray-100 rounded"></div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full focus:border-blue-600 outline-none p-2 border-[1.5px] border-gray-300 rounded"
          placeholder="Tanyakan Sesuatu"
        />
        <button className="h-9 w-9 bg-blue-600 text-white p-1 rounded">
          <PaperAirplaneIcon />
        </button>
      </div>
    </div>
  );
};

export default AiChat;

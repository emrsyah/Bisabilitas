import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { aiAssistantStorage } from '../../../packages/storage/dist/esm';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {  AIMessageChunk, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { formatDocumentsAsString } from "langchain/util/document";


export default function App() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<(AIMessageChunk | HumanMessage)[]>([]);
  const [vectorStore, setVectorStore] = useState<MemoryVectorStore | null>(null);
  const [ragChain, setRagChain] = useState<RunnableSequence<Record<string, unknown>, AIMessageChunk> | null>(null);
  const activated = useStorageSuspense(aiAssistantStorage);


  useEffect(() => {
    console.log('content ui loaded');
    console.log(activated);
    // initializeRAG();
  }, []);

  async function initializeRAG() {
    const tmpCont="Kembali ke Blog Programming Monday, 31 July 2023 | 2 min read Pengalaman Typescript dari Mantan Pengguna Javascript Sebagai web developer terutama yang bermain di lingkungan javascript (react, next, vue, angular, dll) pasti sudah tidak asing dengan yang namanya typescript. Tapi bagaimana sih perbedaan dan pengalaman dari seorang pengguna javascript menggunakan typescript? Apa itu Typescript? Pada dasarnya typescript adalah javascript dengan tambahan type system. Ini berarti kita bisa memberikan type pada variabel, parameter function, dan return value function. Konsep ini sendiri sebenarnya lumayan asing bagi saya orang yang sering menggunakan JS murni. Pada awalnya tentu saja saya merasa sedikit “skeptis” mengenai kegunaan typescript, tapi nyatanya setelah belajar dan menggunakannya selama kurang lebih 3 bulan saya merasakan hal sebaliknya"
    console.log("flag 1")
    const pageContent = extractPageContent();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    console.log("flag 2", pageContent)
    const splits = await textSplitter.splitText(tmpCont);
    const vectorStore = await MemoryVectorStore.fromTexts(
      splits,
      splits.map((_, i) => ({ id: i })),
      new OpenAIEmbeddings({
        apiKey: apiKey,
      })
    );
    setVectorStore(vectorStore);
    console.log("flag 3", vectorStore)

    const retriever = vectorStore.asRetriever();
    const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0, apiKey: apiKey});

    const qaSystemPrompt = `You are an assistant for question-answering tasks.
    Use the following pieces of retrieved context to answer the question.
    If you don't know the answer, just say that you don't know.
    Use three sentences maximum and keep the answer concise.

    {context}`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", qaSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{question}"],
    ]);

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", "Given a chat history and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is."],
      new MessagesPlaceholder("chat_history"),
      ["human", "{question}"],
    ]);

    const contextualizeQChain = contextualizeQPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

      const ragChain = RunnableSequence.from([
        RunnablePassthrough.assign({
          context: async (input: Record<string, unknown>) => {
            // Type guard to check if input matches ChainInput
            if (
              typeof input.question === "string" &&
              Array.isArray(input.chat_history) &&
              input.chat_history.every((msg): msg is BaseMessage => msg instanceof BaseMessage)
            ) {
              if (input.chat_history.length > 0) {
                const contextualizedQ = await contextualizeQChain.invoke(input);
                const retrievedDocs = await retriever.invoke(contextualizedQ);
                return formatDocumentsAsString(retrievedDocs);
              }
              const retrievedDocs = await retriever.invoke(input.question);
              return formatDocumentsAsString(retrievedDocs);
            }
            throw new Error("Invalid input format");
          },
        }),
        qaPrompt,
        llm,
      ]);
    
      setRagChain(ragChain);
      console.log("flag 4", ragChain)
  }

  function extractPageContent() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = document.body.innerHTML;

    const scripts = tempElement.getElementsByTagName('script');
    while (scripts[0]) scripts[0].parentNode?.removeChild(scripts[0]);

    const styles = tempElement.getElementsByTagName('style');
    while (styles[0]) styles[0].parentNode?.removeChild(styles[0]);

    const nonContentSelectors = ['header', 'footer', 'nav', 'aside', '.sidebar', '#sidebar', '.ad', '.advertisement'];
    nonContentSelectors.forEach(selector => {
      const elements = tempElement.querySelectorAll(selector);
      elements.forEach(el => el.parentNode?.removeChild(el));
    });

    let content = tempElement.textContent || tempElement.innerText || '';
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    return content;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initializeRAG()
    console.log(ragChain)
    if (!input.trim() || !ragChain) return;
    console.log("halo")

    const question = input;
    setInput('');

    const aiMsg = await ragChain.invoke({ question, chat_history: chatHistory });
    setChatHistory(prev => [...prev, new HumanMessage(question), aiMsg]);
  };

  return (
    activated === "disabled" ? null : (
      <div className="flex flex-col gap-4 fixed bottom-7 right-7 w-96">
        <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg._getType() === 'human' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${msg._getType() === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {/* {typeof(msg.content.valueOf()) == 'string' ? msg.content.valueOf() : "tes"} */}
                {msg.content as string}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this page..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    )
  );
}
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import * as React from 'react';
import {PaperAirplaneIcon, MicrophoneIcon} from '@heroicons/react/16/solid'
import { aiAssistantStorage } from '../../../packages/storage/dist/esm';

export default function App() {
  const [input, setInput] = React.useState('');
  // const [aiAssistantEnabled, setAiAssistantEnabled] = React.useState();

  const activated = useStorageSuspense(aiAssistantStorage);

  React.useEffect(() => {
    console.log('content ui loaded');
    console.log(activated)
  }, []);

  return (
    activated == "disabled" ? (
      null
    ) : (
    <div className="flex gap-1 fixed bottom-7 items-center justify-center w-full flex-col">
    {/* style={{
      backgroundColor: theme === 'light' ? '#eee' : '#222',
    }}
    > */}
      {/* {theme} Edit <strong>pagex/content-ui/src/app.tsx</strong> and save to reloads. */}
      <div className='bg-blue-500 w-[540px] p-4 rounded-md gap-3 flex items-center'>
        <button className='bg-white w-8 h-8 text-blue-600 hover:text-blue-700 flex items-center justify-center rounded'>
          <MicrophoneIcon className='w-6 h-6' />
        </button>
        <input placeholder='Tanyakan sesuatu tentang website' type="text" className='w-full flex-1 flex-grow bg-transparent outline-none text-white' value={input} onChange={(e) => setInput(e.target.value)} />
      <button className='bg-white w-8 h-8 text-blue-600 hover:text-blue-700 flex items-center justify-center rounded'>
      <PaperAirplaneIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
    )
  );
}

import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

import { ComponentPropsWithoutRef } from 'react';

const Popup = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  const changeFont = async () => {
    alert('changeFont 2');
    // TODO: change font size
    // changeFontSize
    console.log("halo 20")
    const [tab] = await chrome.tabs.query({ active: true });
    console.log("halo 1")
    console.log(tab)
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        alert('changeFont 3');
        console.log("halo 3")
        document.body.style.backgroundColor = 'red';
    //       document.body.style.fontSize = '10px';
    //           const style = document.createElement('style');
    // style.textContent = `* { font-size: ${10}px !important; }`;
    // document.head.append(style);
      }
  });
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <img src={chrome.runtime.getURL('new-tab/logo.svg')} className="App-logo" alt="logo" />
<button onClick={changeFont}>change font</button>
        <p>
          Edit <code>pages/popup/src/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>
          Learn React halo
        </a>
        <ToggleButton>Toggle theme</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);

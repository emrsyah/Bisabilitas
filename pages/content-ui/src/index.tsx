import { createRoot } from 'react-dom/client';
import App from '@src/app';
// import TextSearch from './TextSearch'; // Make sure to create this file
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';
import $ from "jquery"

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
shadowRoot.appendChild(styleElement);


// to receive messages from popup script
chrome.runtime.onMessage.addListener((message) => {
  (async () => {
    console.log(message)
    if (message.action === 'searchText') {
      $(window).scrollTop($("*:contains('" + message.text + "'):last").offset().top);
    }
  })();
});

createRoot(rootIntoShadow).render(
  <>
    <App />
    {/* <TextSearch /> */}
  </>
);
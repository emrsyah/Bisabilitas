import 'webextension-polyfill';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

exampleThemeStorage.get().then(theme => {
  console.log('themex', theme);
});

// to find the windowId of the active tab
let windowId: number;
chrome.tabs.onActivated.addListener(function (activeInfo) {
  windowId = activeInfo.windowId;
});

// to receive messages from popup script
chrome.runtime.onMessage.addListener((message) => {
  (async () => {
    console.log(message)
    if (message.action === 'open_side_panel') {
      chrome.sidePanel.open({ windowId: windowId });
    }
  })();
});



console.log('background loadedoxxx');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");

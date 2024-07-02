import { dyslexicFontStorage } from '@chrome-extension-boilerplate/storage';

export async function applyDyslexicFont() {
  // Function to inject the OpenDyslexic font
  function injectOpenDyslexicFont() {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('chrome-extension://${chrome.runtime.id}/fonts/OpenDyslexic-Regular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('chrome-extension://${chrome.runtime.id}/fonts/OpenDyslexic-Bold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('chrome-extension://${chrome.runtime.id}/fonts/OpenDyslexic-Italic.otf') format('opentype');
        font-weight: normal;
        font-style: italic;
      }
    `;
    document.head.appendChild(style);
  }

  function setFont(state: "default" | "openDyslexic") {
    if (state === 'openDyslexic') {
      injectOpenDyslexicFont();
      document.body.style.fontFamily = "'OpenDyslexic', sans-serif";
    } else {
      document.body.style.fontFamily = '';
    }
  }

  dyslexicFontStorage.get().then(setFont);
  dyslexicFontStorage.subscribe(() => {
    const state = dyslexicFontStorage.getSnapshot();
    if (state) {
      setFont(state);
    }
  });
}
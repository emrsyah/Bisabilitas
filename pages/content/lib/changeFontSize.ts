import { fontSizeStorage } from '@chrome-extension-boilerplate/storage';

export async function applyTextSize() {
  function setTextSize(state: "normal" | "medium" | "large" | "extra-large") {
    const bodyElement = document.body;
    switch (state) {
      case 'normal':
        bodyElement.style.fontSize = '1em';
        break;
      case 'medium':
        bodyElement.style.fontSize = '1.1em';
        break;
      case 'large':
        bodyElement.style.fontSize = '1.3em';
        break;
      case 'extra-large':
        bodyElement.style.fontSize = '1.4em';
        break;
    }
  }

  fontSizeStorage.get().then(setTextSize);
  fontSizeStorage.subscribe(() => {
    const state = fontSizeStorage.getSnapshot();
    if (state) {
      setTextSize(state);
    }
  });
}
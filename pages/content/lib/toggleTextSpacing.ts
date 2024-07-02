import { textSpacingStorage } from '@chrome-extension-boilerplate/storage';

export async function applyTextSpacing() {
  function setTextSpacing(state: "normal" | "medium" | "wide" | "extra-wide") {
    const bodyElement = document.body;
    switch (state) {
      case 'normal':
        bodyElement.style.letterSpacing = 'normal';
        bodyElement.style.wordSpacing = 'normal';
        break;
      case 'medium':
        bodyElement.style.letterSpacing = '0.1em';
        bodyElement.style.wordSpacing = '0.2em';
        break;
      case 'wide':
        bodyElement.style.letterSpacing = '0.15em';
        bodyElement.style.wordSpacing = '0.3em';
        break;
      case 'extra-wide':
        bodyElement.style.letterSpacing = '0.2em';
        bodyElement.style.wordSpacing = '0.4em';
        break;
    }
  }

  textSpacingStorage.get().then(setTextSpacing);
  textSpacingStorage.subscribe(() => {
    const state = textSpacingStorage.getSnapshot();
    if (state) {
      setTextSpacing(state);
    }
  });
}
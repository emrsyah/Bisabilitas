import { cursorBiggerStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleBigCursor() {
  function applyBigCursor(state: 'enabled' | 'disabled') {
    const bodyElement = document.body;

    if (state === 'enabled') {
      bodyElement.style.cursor = `url('chrome-extension://${chrome.runtime.id}/cursor.cur'), pointer`;
    //   bodyElement.style.cursor = `pointer`;
    } else {
      bodyElement.style.cursor = 'auto';
    }
    // Apply to all elements to ensure consistent cursor across the page
    // const allElements = document.querySelectorAll('*');
    // allElements.forEach((element) => {
    //   if (element instanceof HTMLElement) {
    //     element.style.cursor = 'inherit';
    //   }
    // });
  }

  // Initial application of big cursor based on stored state
  cursorBiggerStorage.get().then(applyBigCursor);

  // Subscribe to changes in storage
  cursorBiggerStorage.subscribe(() => {
    const state = cursorBiggerStorage.getSnapshot();
    if (state) {
      applyBigCursor(state);
    }
  });
}
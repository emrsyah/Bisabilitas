import { cursorBiggerStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleBigCursor() {
  function applyBigCursor(state: 'enabled' | 'disabled') {
    const bodyElement = document.body;

    if (state === 'enabled') {
      bodyElement.style.cursor = `url('https://utfs.io/f/cfc3ed60-c884-4d68-9c9e-7520e3bb1036-xuhkfh.png'), auto`;
      // bodyElement.style.cursor = `url('https://github.com/user-attachments/assets/cb132f01-1750-4b77-b9f4-3361b5027af5'), auto`;
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
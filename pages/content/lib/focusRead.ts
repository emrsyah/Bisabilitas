import { focusReadStorage } from '@chrome-extension-boilerplate/storage';

export async function applyFocusRead() {
  let topOverlay: HTMLDivElement | null = null;
  let bottomOverlay: HTMLDivElement | null = null;
  let isActive = false;

  function createOverlays() {
    topOverlay = document.createElement('div');
    bottomOverlay = document.createElement('div');

    const overlayStyle = `
      position: fixed;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9999;
      pointer-events: none;
      transition: height 0.1s ease;
    `;

    topOverlay.style.cssText = overlayStyle + 'top: 0;';
    bottomOverlay.style.cssText = overlayStyle + 'bottom: 0;';

    document.body.appendChild(topOverlay);
    document.body.appendChild(bottomOverlay);
  }

  function removeOverlays() {
    if (topOverlay && topOverlay.parentNode) {
      topOverlay.parentNode.removeChild(topOverlay);
    }
    if (bottomOverlay && bottomOverlay.parentNode) {
      bottomOverlay.parentNode.removeChild(bottomOverlay);
    }
    topOverlay = null;
    bottomOverlay = null;
  }

  function updateOverlayPositions(e: MouseEvent) {
    if (isActive && topOverlay && bottomOverlay) {
      const lineHeight = 60; // Adjust this value to change the highlight line height
      const y = e.clientY;
      
      topOverlay.style.height = `${Math.max(0, y - lineHeight / 2)}px`;
      bottomOverlay.style.height = `${Math.max(0, window.innerHeight - y - lineHeight / 2)}px`;
    }
  }

  function enableFocusRead() {
    if (!topOverlay || !bottomOverlay) {
      createOverlays();
    }
    isActive = true;
    document.addEventListener('mousemove', updateOverlayPositions);
    updateOverlayPositions({ clientY: window.innerHeight / 2 } as MouseEvent); // Initial position
  }

  function disableFocusRead() {
    removeOverlays();
    isActive = false;
    document.removeEventListener('mousemove', updateOverlayPositions);
  }

  function setFocusRead(state: 'enabled' | 'disabled') {
    if (state === 'enabled') {
      enableFocusRead();
    } else {
      disableFocusRead();
    }
  }

  focusReadStorage.get().then(setFocusRead);
  focusReadStorage.subscribe(() => {
    const state = focusReadStorage.getSnapshot();
    if (state) {
      setFocusRead(state);
    }
  });
}
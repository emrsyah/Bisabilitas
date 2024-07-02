import { hideImagesStorage } from '@chrome-extension-boilerplate/storage';

export async function hideImages() {
  function applyHideImages(status: "enabled" | "disabled") {
    const images = document.querySelectorAll('img, picture, video');
    images.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = status === 'enabled' ? 'none' : '';
      }
    });
  }

  hideImagesStorage.get().then(applyHideImages);
  hideImagesStorage.subscribe(() => {
    const status = hideImagesStorage.getSnapshot();
    if (status) {
      applyHideImages(status);
    }
  });
}

import { saturationStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleSaturation() {
  function applySaturation(level: "normal" | "low" | "high") {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      switch (level) {
        case 'normal':
          htmlElement.style.filter = "saturate(1)";
          break;
        case 'low':
          htmlElement.style.filter = "saturate(0.5)";
          break;
        case 'high':
          htmlElement.style.filter = "saturate(2)";
          break;
      }
    }
  }

  saturationStorage.get().then(applySaturation);
  saturationStorage.subscribe(() => {
    const level = saturationStorage.getSnapshot();
    if (level) {
      applySaturation(level);
    }
  });
}

import { contrastStorage } from '@chrome-extension-boilerplate/storage';
export async function toggleContrast() {
  const media = document.querySelectorAll('img, picture, video');

  function applyContrast(contrast: "normal" | "low" | "medium" | "high") {
    const htmlElement = document.querySelector('html');
    if (!htmlElement) return;

    switch (contrast) {
      case 'low':
        htmlElement.style.filter = "contrast(150%)";
        break;
      case 'medium':
        htmlElement.style.filter = "contrast(200%)";
        break;
      case 'high':
        htmlElement.style.filter = "contrast(300%)";
        break;
      case 'normal':
      default:
        htmlElement.style.filter = "contrast(100%)";
        break;
    }

    media.forEach((element) => {
      if (element instanceof HTMLElement) {
        switch (contrast) {
          case 'low':
            element.style.filter = "contrast(90%)";
            break;
          case 'medium':
            element.style.filter = "contrast(100%)";
            break;
          case 'high':
            element.style.filter = "contrast(110%)";
            break;
          case 'normal':
          default:
            element.style.filter = "contrast(100%)";
            break;
        }
      }
    });
  }

  contrastStorage.get().then(applyContrast);
  contrastStorage.subscribe(() => {
    // alert("haloo")
    const contrast = contrastStorage.getSnapshot();
    if (contrast) {
      applyContrast(contrast);
    }
  });
}

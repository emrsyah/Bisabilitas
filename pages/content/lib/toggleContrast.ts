import { contrastStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleContrast() {
  const media = document.querySelectorAll('img, picture, video, svg, button');
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, body');

  function applyContrast(contrast: 'normal' | 'dark-contrast' | 'light-contrast' | 'high') {
    const htmlElement = document.querySelector('html');
    if (!htmlElement) return;

    // Reset styles to avoid conflicts
    if (htmlElement instanceof HTMLElement) {
      htmlElement.style.filter = '';
      htmlElement.style.backgroundColor = '';
      htmlElement.style.color = '';
      htmlElement.style.transition = 'all 0.3s ease';
    }

    textElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.color = ''; // Reset text color
      }
    });

    switch (contrast) {
      case 'dark-contrast':
        textElements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.backgroundColor = '#000000'; // Black background
            element.style.color = '#FFFFFF'; // White text
          }
        });
        media.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.color = ''; // Default text color
            element.style.backgroundColor = ''; // Reset to default background
          }
        });
        break;

      case 'light-contrast':
        textElements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.backgroundColor = '#FFFFFF'; // White background
            element.style.color = '#000000'; // Black text
          }
        });
        media.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.color = ''; // Default text color
            element.style.backgroundColor = ''; // Reset to default background
          }
        });
        break;

      case 'high':
        if (htmlElement instanceof HTMLElement) {
          htmlElement.style.filter = 'contrast(300%)';
        }
        break;

      case 'normal':
      default:
        if (htmlElement instanceof HTMLElement) {
          htmlElement.style.filter = 'contrast(100%)';
        }
        textElements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.color = ''; // Default text color
            element.style.backgroundColor = ''; // Reset to default background
          }
        });
        break;
    }

    media.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.filter = ''; // Reset filter for media elements
      }
    });
  }

  contrastStorage.get().then(applyContrast);
  contrastStorage.subscribe(() => {
    const contrast = contrastStorage.getSnapshot();
    if (contrast) {
      applyContrast(contrast);
    }
  });
}

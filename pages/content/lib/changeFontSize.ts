import { fontSizeStorage } from '@chrome-extension-boilerplate/storage';

export async function changeFontSize() {
    // Define a mapping from font size keys to scale factors
    const fontSizeMap = {
      small: 0.8,
      normal: 1.0,
      medium: 1.04,
      large: 1.08,
    };

    
    type FontSize = 'small' | 'normal' | 'medium' | 'large';
    
    // Function to apply the font size adjustment
    async function applyFontSize({ current, previous } : { current: FontSize, previous: FontSize | null }) {
      const currentScaleFactor = fontSizeMap[current];
      const previousScaleFactor = previous ? fontSizeMap[previous] : 1.0;
      console.log(currentScaleFactor, previousScaleFactor);
      const scaleFactor = currentScaleFactor / previousScaleFactor;
    
      const elements = document.querySelectorAll('*');
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(element);
          const currentSize = parseFloat(computedStyle.fontSize);
          element.style.fontSize = `${currentSize * scaleFactor}px`;
        }
      });
    }
    
    fontSizeStorage.get().then(applyFontSize);
    
    // Subscribe to changes and apply the new font size
    fontSizeStorage.subscribe(() => {
      const fontSize = fontSizeStorage.getSnapshot();
      if (fontSize) {
        applyFontSize(fontSize);
      }
    });
    
    // Execute the initial setup
    // storeOriginalFontSize();
}


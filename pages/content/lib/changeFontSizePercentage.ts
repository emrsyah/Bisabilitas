import { fontSizeStoragePercentage } from '@chrome-extension-boilerplate/storage';

export async function applyTextSizePercentage() {
  // Store the original font sizes of elements
  const originalFontSizes = new Map<HTMLElement, number>();

  function setTextSize(percentage: number) {
    const textElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'blockquote'];

    textElements.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;

        // If original font size is not stored, store it
        if (!originalFontSizes.has(htmlElement)) {
          const computedStyle = window.getComputedStyle(htmlElement);
          const originalSize = parseFloat(computedStyle.fontSize);
          originalFontSizes.set(htmlElement, originalSize);
        }

        // Get the original font size and calculate the new size
        const originalSize = originalFontSizes.get(htmlElement) ?? 16; // Fallback to 16px if something goes wrong
        htmlElement.style.fontSize = `${(originalSize * percentage) / 100}px`;
      });
    });
  }

  // Initialize font size
  const initialSize = await fontSizeStoragePercentage.get() ?? 100;
  setTextSize(initialSize);

  // Subscribe to changes
  fontSizeStoragePercentage.subscribe(() => {
    const state = fontSizeStoragePercentage.getSnapshot();
    if (state) {
      setTextSize(state);
    }
  });
}

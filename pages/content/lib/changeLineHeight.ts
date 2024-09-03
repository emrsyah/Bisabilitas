import { lineHeightStorage } from "@chrome-extension-boilerplate/storage";

export async function applyLineHeight() {
  // Store the original line heights of elements
  const originalLineHeights = new Map<HTMLElement, number>();

  function setLineHeight(percentage: number) {
    const scalingFactor = percentage / 100;

    // List of text-related elements to apply the line height change
    const textElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'blockquote'];

    textElements.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;

        // If original line height is not stored, store it
        if (!originalLineHeights.has(htmlElement)) {
          const computedStyle = window.getComputedStyle(htmlElement);
          const originalHeight = parseFloat(computedStyle.lineHeight);

          // Check for 'normal' line-height, defaulting to 1.5 (normal line height multiplier)
          if (isNaN(originalHeight)) {
            const fontSize = parseFloat(computedStyle.fontSize);
            originalLineHeights.set(htmlElement, fontSize * 1.5);
          } else {
            originalLineHeights.set(htmlElement, originalHeight);
          }
        }

        // Get the original line height and calculate the new size
        const originalHeight = originalLineHeights.get(htmlElement) ?? 1.5; // Fallback to 1.5 if something goes wrong
        htmlElement.style.lineHeight = `${originalHeight * scalingFactor}px`;
      });
    });
  }

  // Initialize line height
  const initialSpacing = (await lineHeightStorage.get()) ?? 100;
  setLineHeight(initialSpacing);

  // Subscribe to changes
  lineHeightStorage.subscribe(() => {
    const state = lineHeightStorage.getSnapshot();
    if (state !== null) {
      setLineHeight(state);
    }
  });
}

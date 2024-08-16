import { textAlignmentStorage } from '@chrome-extension-boilerplate/storage';

export async function applyTextAlignment() {
  function setTextAlignment(alignment: "normal" | "left" | "right" | "justify") {
    const bodyElement = document.body;
    const allElements = document.getElementsByTagName('*');

    switch (alignment) {
      case 'normal':
        resetAlignment(bodyElement, allElements);
        break;
      case 'left':
        applyAlignment(bodyElement, allElements, 'left');
        break;
      case 'right':
        applyAlignment(bodyElement, allElements, 'right');
        break;
      case 'justify':
        applyAlignment(bodyElement, allElements, 'justify');
        break;
    }
  }

  function applyAlignment(bodyElement: HTMLElement, elements: HTMLCollectionOf<Element>, alignment: string) {
    bodyElement.style.setProperty('text-align', alignment, 'important');
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      const originalAlign = element.getAttribute('data-original-align') || computedStyle.textAlign;
      
      if (!element.hasAttribute('data-original-align')) {
        element.setAttribute('data-original-align', originalAlign);
      }
      
      element.style.setProperty('text-align', alignment, 'important');
    }
  }

  function resetAlignment(bodyElement: HTMLElement, elements: HTMLCollectionOf<Element>) {
    bodyElement.style.removeProperty('text-align');
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const originalAlign = element.getAttribute('data-original-align');
      
      if (originalAlign) {
        element.style.textAlign = originalAlign;
        element.removeAttribute('data-original-align');
      } else {
        element.style.removeProperty('text-align');
      }
    }
  }

  // Initial setup
  textAlignmentStorage.get().then(setTextAlignment);

  // Listen for changes
  textAlignmentStorage.subscribe(() => {
    const alignment = textAlignmentStorage.getSnapshot();
    if (alignment) {
      setTextAlignment(alignment);
    }
  });
}
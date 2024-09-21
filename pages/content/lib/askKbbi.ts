import axios from 'axios'

let popupElement: HTMLElement | null = null;

export const askKbbi = () => {
  if (popupElement == null) {
    document.addEventListener('mouseup', handleMouseUp);
  }
};

function handleMouseUp(event: MouseEvent) {
  const selectedText = window.getSelection()?.toString().trim();

  if (popupElement && popupElement.contains(event.target as Node)) {
    return;
  }

  if (selectedText && selectedText.length > 0) {
    showPopup(selectedText, event);
  } else {
    hidePopup();
  }
}

function showPopup(word: string, event: MouseEvent): void {
  if (popupElement) {
    document.body.removeChild(popupElement);
  }
  popupElement = document.createElement('button');
  popupElement.id = 'kbbi-popup';
  popupElement.textContent = 'Tanya KBBI';
  document.body.appendChild(popupElement);
  applyPopupStyles(popupElement, true);

  const rect = {
    left: event.clientX,
    top: event.clientY,
    bottom: event.clientY,
    right: event.clientX
  };

  positionPopup(popupElement, rect);

  console.log('Popup shown');

  popupElement.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Popup clicked');
    transformToDiv(word);
  });
}

function transformToDiv(word: string): void {
  if (!popupElement) return;

  console.log('transformToDiv called');

  const divElement = document.createElement('div');
  divElement.id = 'kbbi-popup';
  divElement.textContent = 'Loading...';

  const rect = popupElement.getBoundingClientRect();
  document.body.replaceChild(divElement, popupElement);
  popupElement = divElement;

  applyPopupStyles(divElement, false);
  positionPopup(divElement, rect);

  fetchDefinition(word);
}

async function fetchDefinition(word: string) {
    const res = await axios.post(`http://localhost:5000/api/v1/ai/kbbi`, {
        word: word,
    })
    if(popupElement){
        popupElement.textContent = res.data.definition
    }
}

function hidePopup(): void {
  if (popupElement) {
    document.body.removeChild(popupElement);
    popupElement = null;
  }
}

function positionPopup(element: HTMLElement, rect: { top: number, left: number, bottom: number, right: number }): void {
  const viewportHeight = window.innerHeight;
  const spaceBelow = viewportHeight - rect.bottom;
  const elementHeight = 50; // Estimate height, adjust as needed
  const spacing = 10; // Space between text and popup

  if (spaceBelow >= elementHeight + spacing) {
    // Show below with spacing
    element.style.top = `${rect.bottom + window.scrollY + spacing}px`;
  } else {
    // Show above with spacing
    element.style.top = `${rect.top + window.scrollY - elementHeight - spacing}px`;
  }

  element.style.left = `${rect.left + window.scrollX}px`;
}

function applyPopupStyles(element: HTMLElement, isButton: boolean): void {
  element.style.position = 'absolute';
  element.style.backgroundColor = '#3E2723'; // Dark brown background
  element.style.color = 'white'; // White text
  element.style.border = 'none';
  element.style.padding = '10px';
  element.style.borderRadius = '5px';
  element.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  element.style.zIndex = '1000';
  element.style.maxWidth = isButton ? 'auto' : '300px';
  element.style.fontSize = '14px';
  element.style.fontFamily = 'Arial, sans-serif';

  if (isButton) {
    element.style.cursor = 'pointer';
  } else {
    element.style.minWidth = '200px';
    element.style.minHeight = '50px';
  }
}
import { textMagnifierStorage } from '@chrome-extension-boilerplate/storage';

let magnifierElement: HTMLElement | null = null;
let magnifierEnabled = false;

export const textMagnifier = () => {
  textMagnifierStorage.get().then((state) => {
    if (state === 'enabled') {
      enableMagnifier();
    } else {
      disableMagnifier();
    }
  });

  textMagnifierStorage.subscribe(() => {
    textMagnifierStorage.get().then((state) => {
      if (state === 'enabled') {
        enableMagnifier();
      } else {
        disableMagnifier();
      }
    });
  });
};

function handleMouseOver(event: MouseEvent) {
  if (!magnifierEnabled) return;

  const targetText = (event.target as HTMLElement).innerText;

  if (targetText && targetText.trim().length > 0) {
    showMagnifier(targetText, event);
  }
}

function handleMouseMove(event: MouseEvent) {
  if (!magnifierEnabled || !magnifierElement) return;

  positionMagnifier(magnifierElement, event);
}

function handleMouseOut() {
  hideMagnifier();
}

function showMagnifier(text: string, event: MouseEvent): void {
  if (magnifierElement) {
    document.body.removeChild(magnifierElement);
  }

  magnifierElement = document.createElement('div');
  magnifierElement.id = 'text-magnifier';
  magnifierElement.textContent = text;
  document.body.appendChild(magnifierElement);
  applyMagnifierStyles(magnifierElement);

  positionMagnifier(magnifierElement, event);
}

function hideMagnifier(): void {
  if (magnifierElement) {
    document.body.removeChild(magnifierElement);
    magnifierElement = null;
  }
}

function positionMagnifier(element: HTMLElement, event: MouseEvent): void {
  const spacing = 10; // Space between cursor and magnifier

  element.style.top = `${event.clientY + spacing}px`;
  element.style.left = `${event.clientX + spacing}px`;
}

function applyMagnifierStyles(element: HTMLElement): void {
  element.style.position = 'absolute';
  element.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  element.style.color = 'white';
  element.style.padding = '10px';
  element.style.borderRadius = '5px';
  element.style.zIndex = '1000';
  element.style.fontSize = '24px'; // Increase font size for magnification
  element.style.lineHeight = '1.5';
  element.style.maxWidth = '300px';
  element.style.wordWrap = 'break-word';
  element.style.pointerEvents = 'none'; // Make sure the magnifier itself doesn't trigger events
}

export async function toggleMagnifier() {
  const currentState = await textMagnifierStorage.get();
  const newState = currentState === 'enabled' ? 'disabled' : 'enabled';
  await textMagnifierStorage.set(newState);

  if (newState === 'enabled') {
    enableMagnifier();
  } else {
    disableMagnifier();
  }
}

function enableMagnifier() {
  magnifierEnabled = true;
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseout', handleMouseOut);
}

function disableMagnifier() {
  magnifierEnabled = false;
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseout', handleMouseOut);
  hideMagnifier();
}
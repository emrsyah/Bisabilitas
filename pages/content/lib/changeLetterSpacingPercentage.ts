import { textSpacingStoragePercentage } from "@chrome-extension-boilerplate/storage";

export async function applyTextSpacing() {
  function setTextSpacing(percentage: number) {
    // console.log("spacing", percentage);
    const downPercentage = (percentage - 100) / 100;
    console.log("persen turun",downPercentage)
    const textElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'blockquote'];

    textElements.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
        (element as HTMLElement).style.letterSpacing = `${downPercentage/2}em`;
        (element as HTMLElement).style.wordSpacing = `${downPercentage}em`;
      });
    });
  }

  const initialSpacing = (await textSpacingStoragePercentage.get()) ?? 0;
  setTextSpacing(initialSpacing);

  textSpacingStoragePercentage.subscribe(() => {
    const state = textSpacingStoragePercentage.getSnapshot();
    console.log("joi", state)
    if (state !== null) {
      setTextSpacing(state);
    }
  });
}

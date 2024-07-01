import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

// ini dia manggil function toggleTheme() dari file pages\content\lib\toggleTheme.ts
// dan file ini itu sebenernya manggil doang dan ngeinject, dia ga ngapa-ngapain lagi

export async function toggleTheme() {
  // alert('toggleTheme');
  const media = document.querySelectorAll('img, picture, video')
  async function applyTheme(theme : "dark" | "light") {
    if (theme === 'light') {
      document.querySelector('html')!.style.filter = "invert(0) hue-rotate(0deg)";
      media.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.filter = "invert(0) hue-rotate(0deg)";
        }
      });
    } else {
      document.querySelector('html')!.style.filter = "invert(1) hue-rotate(180deg)";
      media.forEach((element) => {
        console.log(media, element instanceof HTMLElement)
        if (element instanceof HTMLElement) {
          element.style.filter = "invert(1) hue-rotate(180deg)";
        }
      });
    }
  }
  exampleThemeStorage.get().then(applyTheme)
  exampleThemeStorage.subscribe(() => {
    const theme = exampleThemeStorage.getSnapshot();
    if (theme) {
      applyTheme(theme);
    }
  });
}

// fontSizeStorage.get().then(applyFontSize);
    
// // Subscribe to changes and apply the new font size
// fontSizeStorage.subscribe(() => {
//   const fontSize = fontSizeStorage.getSnapshot();
//   if (fontSize) {
//     applyFontSize(fontSize);
//   }
// });
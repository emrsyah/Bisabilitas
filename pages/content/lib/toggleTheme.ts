import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

// ini dia manggil function toggleTheme() dari file pages\content\lib\toggleTheme.ts
// dan file ini itu sebenernya manggil doang dan ngeinject, dia ga ngapa-ngapain lagi

export async function toggleTheme() {
  // alert('toggleTheme');
  console.log('initial theme:', await exampleThemeStorage.get());
  await exampleThemeStorage.toggle();
  console.log('toggled theme:', await exampleThemeStorage.get());
}

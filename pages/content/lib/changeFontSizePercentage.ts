import { fontSizeStoragePercentage } from '@chrome-extension-boilerplate/storage';

export async function applyTextSizePercentage() {
  function setTextSize(percentage: number) {
    document.body.style.fontSize = `${percentage}%`;
  }

  // Inisialisasi ukuran font
  const initialSize = await fontSizeStoragePercentage.get() ?? 100;
  setTextSize(initialSize);
  
  // Subscribe ke perubahan
  fontSizeStoragePercentage.subscribe(() => {
    const state = fontSizeStoragePercentage.getSnapshot();
    // console.log('secon size',state)
    if (state) {
      setTextSize(state);
    }
  });
}
import { monochromeModeStorage } from '@chrome-extension-boilerplate/storage';

export async function applyMonochromeMode() {
  function setMonochromeMode(status: "enabled" | "disabled") {
    const elements = document.querySelectorAll('img, picture, video, *'); // Mencakup semua elemen di halaman

    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        // Terapkan filter monokrom atau hapus filter tergantung pada status
        element.style.filter = status === 'enabled' ? 'grayscale(100%)' : '';
      }
    });
  }

  monochromeModeStorage.get().then(setMonochromeMode);
  monochromeModeStorage.subscribe(() => {
    const status = monochromeModeStorage.getSnapshot();
    if (status) {
      setMonochromeMode(status);
    }
  });
}

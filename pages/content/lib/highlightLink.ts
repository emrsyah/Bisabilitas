import { linkHighlightStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleHighlightLink() {
  const links = document.querySelectorAll('a');

  function applyHighlight(state: string) {
    links.forEach((link) => {
      if (state == "enabled") {
        link.style.backgroundColor = 'yellow';
        link.style.color = 'black';
        link.style.textDecoration = 'underline';
        link.style.padding = '2px 4px';
        link.style.borderRadius = '3px';
      } else {
        link.style.backgroundColor = '';
        link.style.color = '';
        link.style.textDecoration = '';
        link.style.padding = '';
        link.style.borderRadius = '';
      }
    });
  }

  // Initial application of highlight based on stored state
  linkHighlightStorage.get().then(applyHighlight);

  // Subscribe to changes in storage
  linkHighlightStorage.subscribe(() => {
    const isEnabled = linkHighlightStorage.getSnapshot();
    if (isEnabled) {
      applyHighlight(isEnabled);
    }
  });
}
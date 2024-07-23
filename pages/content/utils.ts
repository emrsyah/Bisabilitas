export function extractPageContentUtils() {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = document.body.innerHTML;

    const scripts = tempElement.getElementsByTagName('script');
    while (scripts[0]) scripts[0].parentNode?.removeChild(scripts[0]);

    const styles = tempElement.getElementsByTagName('style');
    while (styles[0]) styles[0].parentNode?.removeChild(styles[0]);

    const nonContentSelectors = ['header', 'footer', 'nav', 'aside', '.sidebar', '#sidebar', '.ad', '.advertisement'];
    nonContentSelectors.forEach(selector => {
      const elements = tempElement.querySelectorAll(selector);
      elements.forEach(el => el.parentNode?.removeChild(el));
    });

    let content = tempElement.textContent || tempElement.innerText || '';
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    return content;
  }
export async function changeFontSize() {
    // const fontSize = await fontSizeStorage.get();
    document.body.style.fontSize = `${10}px`;
    // document.body.style.fontSize = `${10}px`;
    const style = document.createElement('style');
    style.textContent = `* { font-size: ${10}px !important; }`;

    // Append the style element to the head
    document.head.append(style);
}
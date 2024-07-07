import { aiAssistantStorage } from '@chrome-extension-boilerplate/storage';

export async function toggleAiAssistant() {
    let floatingMenu: HTMLDivElement | null = null;

    function createFloatingMenu() {
        // Ensure previous floating menu is removed before creating a new one
        removeFloatingMenu();

        floatingMenu = document.createElement('div');
        floatingMenu.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgb(37, 99, 235);  // Blue color
            border-color: rgba(37, 99, 235, 1);
            border-style: solid;
            width: 540px;
            border-width: 2px;
            color: white;
            padding: 12px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            z-index: 10000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // Optional: Adds a subtle shadow for better visibility
        `;
    
        // Mic button
        const micButton = document.createElement('button');
        micButton.style.cssText = `
            background: white;
            border: none;
            color: #007BFF;
            font-size: 24px;
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
        `;
        // micButton.innerHTML = ''; // You can replace this with an actual mic icon
        micButton.innerHTML = `
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
           </svg>
        `;
    
        // Text input
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = 'Tulis Pertanyaan Kamu Di sini';
        textInput.style.cssText = `
            flex: 1;
            padding: 5px 10px;
            border: none;
            outline: none;
            border-radius: 5px;
            background: none;
            margin-right: 10px;
            font-size: 16px;
        `;
    
        // Send button
        const sendButton = document.createElement('button');
        sendButton.style.cssText = `
            background-color: white;
            color: #007BFF;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        `;
        sendButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
        `;

        floatingMenu.appendChild(micButton);
        floatingMenu.appendChild(textInput);
        floatingMenu.appendChild(sendButton);
    
        document.body.appendChild(floatingMenu);
    }
    
    function removeFloatingMenu() {
        if (floatingMenu && floatingMenu.parentNode) {
            floatingMenu.parentNode.removeChild(floatingMenu);
        }
        floatingMenu = null;
    }

    function activateAiAssistant(status: "enabled" | "disabled") {
        if (status === "enabled") {
            createFloatingMenu();
        } else {
            removeFloatingMenu();
        }
    }

    aiAssistantStorage.get().then(activateAiAssistant);
    aiAssistantStorage.subscribe(() => {
        const status = aiAssistantStorage.getSnapshot();
        if (status) {
            activateAiAssistant(status);
        }
    });
}

import { soundNavigationStorage } from '@chrome-extension-boilerplate/storage';

export async function applySoundNavigation() {
  // let isActive = false;
  let floatingMenu: HTMLDivElement | null = null;
  let clickableElements: Array<HTMLElement> = [];
  let recognition: SpeechRecognition | null = null;

  function createFloatingMenu(message: string) {
    floatingMenu = document.createElement('div');
    floatingMenu.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      z-index: 10000;
    `;

    const micIcon = document.createElement('span');
    micIcon.innerHTML = '🎙️'; // You can replace this with an actual mic icon
    micIcon.style.marginRight = '10px';

    const text = document.createElement('span');
    text.textContent = message;

    floatingMenu.appendChild(micIcon);
    floatingMenu.appendChild(text);

    document.body.appendChild(floatingMenu);
  }

  function removeFloatingMenu() {
    if (floatingMenu && floatingMenu.parentNode) {
      floatingMenu.parentNode.removeChild(floatingMenu);
    }
    floatingMenu = null;
  }

  function addNumbersToElements() {
    clickableElements = Array.from(document.querySelectorAll('a, button'));
    clickableElements.forEach((element, index) => {
      const numberLabel = document.createElement('span');
      numberLabel.textContent = (index + 1).toString();
      numberLabel.setAttribute('data-sound-nav', 'true');
      numberLabel.style.cssText = `
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 2px 5px;
        border-radius: 10px;
        font-size: 12px;
      `;
      element.style.position = 'relative';
      element.appendChild(numberLabel);
    });
  }

  function removeNumbersFromElements() {
    clickableElements.forEach(element => {
      const numberLabel = element.querySelector('span[data-sound-nav]');
      if (numberLabel) {
        element.removeChild(numberLabel);
      }
    });
    clickableElements = [];
  }

  function setupSpeechRecognition(): boolean {
    // console.log("flag1")
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    if (!SpeechRecognition) {
      console.error('Speech recognition is not supported in this browser.');
      createFloatingMenu('Speech recognition not supported');
      return false;
    }

    recognition = new SpeechRecognition();

    // console.log("flag2")


    if (SpeechGrammarList) {
      const speechRecognitionList = new SpeechGrammarList();
      const numbers = Array.from({ length: 100 }, (_, i) => i + 1).join(' | ');
      const grammar = `#JSGF V1.0; grammar numbers; public <number> = ${numbers};`;
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
      console.log(grammar)
    }

    recognition.continuous = false;
    recognition.lang = 'id';
    // recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    // recognition.

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const number = parseInt(event.results[0][0].transcript);
      console.log("hasil", number)
      if (!isNaN(number) && number > 0 && number <= clickableElements.length) {
        clickableElements[number - 1].click();
      }
      // Restart recognition after processing the result
      
      // if (isActive) {
      //   recognition?.start();
      // }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      console.error('Speech recognition error', event.message);
      // Restart recognition after an error
      // if (isActive) {
      //   recognition?.start();
      // }
    };

    recognition.onend = () => {
      // recognition?.stop()
      console.log("selesai on end")
      // if (isActive) {
      //   recognition?.start();
      // }
    };

    recognition.onspeechstart = () => {
      console.log("speech started")
    }

    recognition.onspeechend = () => {
      // recognition?.stop()
      console.log("speech ended")
    }

    // recognition.onsp

    return true;
  }

  function startSpeechRecognition() {
    // console.count('cek brp kali')
    if (recognition && !recognition.ongoing) {
      recognition.ongoing = true;
      recognition.start();
      console.log('Ready to receive a voice command.');
    }
  }

  function stopSpeechRecognition() {
    if (recognition) {
      recognition.stop();
      recognition = null;
    }
  }

  function enableSoundNavigation() {
    // console.count("haloo")
    if (setupSpeechRecognition()) {
      addNumbersToElements();
      createFloatingMenu('Bisabilitas is listening');
      startSpeechRecognition();
      isActive = true;
    }
  }

  function disableSoundNavigation() {
    removeFloatingMenu();
    removeNumbersFromElements();
    stopSpeechRecognition();
    isActive = false;
  }

  function setSoundNavigation(state: 'enabled' | 'disabled') {
    if (state === 'enabled') {
      enableSoundNavigation();
    } else {
      disableSoundNavigation();
    }
  }

  // Handle page navigation to clean up and re-initialize speech recognition
  window.addEventListener('beforeunload', () => {
    disableSoundNavigation();
  });

  soundNavigationStorage.get().then(setSoundNavigation);
  soundNavigationStorage.subscribe(() => {
    const state = soundNavigationStorage.getSnapshot();
    if (state) {
      setSoundNavigation(state);
    }
  });
}

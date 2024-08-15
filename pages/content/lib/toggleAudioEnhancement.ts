import { audioEnhancementStorage } from '@chrome-extension-boilerplate/storage';

export async function applyAudioEnhancement() {
  function setAudioEnhancement(state: "normal" | "loud" | "louder" | "loudest") {
    const mediaElements = [...document.getElementsByTagName('audio'), ...document.getElementsByTagName('video')];
    
    mediaElements.forEach(element => {
      switch (state) {
        case 'normal':
          resetAudio(element);
          break;
        case 'loud':
          enhanceAudio(element, 1.25, 3);
          break;
        case 'louder':
          enhanceAudio(element, 1.5, 6);
          break;
        case 'loudest':
          enhanceAudio(element, 2, 9);
          break;
      }
    });
  }

  function enhanceAudio(element: HTMLMediaElement, volumeMultiplier: number, highShelfGain: number) {
    resetAudio(element); // Remove any existing enhancements

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(element);
    const gainNode = audioCtx.createGain();
    const biquadFilter = audioCtx.createBiquadFilter();

    element.volume = Math.min(element.volume * volumeMultiplier, 1);
    gainNode.gain.value = volumeMultiplier;
    biquadFilter.type = "highshelf";
    biquadFilter.frequency.value = 1000;
    biquadFilter.gain.value = highShelfGain;

    source.connect(gainNode);
    gainNode.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);

    // Store the audio context and nodes on the element for later removal
    element.audioEnhancementNodes = { audioCtx, source, gainNode, biquadFilter };
  }

  function resetAudio(element: HTMLMediaElement) {
    if (element.audioEnhancementNodes) {
      const { audioCtx, source, gainNode, biquadFilter } = element.audioEnhancementNodes;
      source.disconnect();
      gainNode.disconnect();
      biquadFilter.disconnect();
      audioCtx.close();
      delete element.audioEnhancementNodes;
    }
    element.volume = Math.min(element.volume, 1); // Ensure volume is not above 100%
  }

  // Initial setup
  audioEnhancementStorage.get().then(setAudioEnhancement);

  // Listen for changes
  audioEnhancementStorage.subscribe(() => {
    const state = audioEnhancementStorage.getSnapshot();
    if (state) {
      setAudioEnhancement(state);
    }
  });
}
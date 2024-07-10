function calculateHash(samples: Float32Array) {
  let hash = 0;
  for (let i = 0; i < samples.length; ++i) {
    hash += Math.abs(samples[i]);
  }
  return hash;
}

declare global {
  interface Window {
    webkitOfflineAudioContext: typeof OfflineAudioContext
  }
}

export async function getAudioFingerprint(): Promise<string| undefined> {
  try {
    return await fetchAudioFingerprint()
  } catch (error) {
    console.error('Error generating audio fingerprint:', error);
    return undefined;
  }
}

export async function fetchAudioFingerprint(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Set up audio parameters
      const sampleRate = 44100;
      const numSamples = 5000;
      const audioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
        1,
        numSamples,
        sampleRate,
      );
      const audioBuffer = audioContext.createBufferSource();

      const oscillator = audioContext.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 1000;
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.attack.value = 0;
      compressor.release.value = 0.2;
      oscillator.connect(compressor);
      compressor.connect(audioContext.destination);
      oscillator.start();
      let samples: Float32Array;

      audioContext.oncomplete = (event) => {
        samples = event.renderedBuffer.getChannelData(0);
        resolve(calculateHash(samples).toString(10));
      };

      audioContext.startRendering();
    } catch (error) {
      console.error('Error creating audio fingerprint:', error);
      reject(error);
    }
  });
}

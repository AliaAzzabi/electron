const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

const { desktopCapturer, remote } = require('electron');

// Get the available video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });
    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
          return {
            label: source.name,
            click: () => selectSource(source)
          };
        })
      );
      videoOptionsMenu.popup();
  }
  let mediaRecorder; // MediaRecorder instance to capture footage
  const recordedChunks = [];

  async function selectSource(source) {

    videoSelectBtn.innerText = source.name;
  
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    }
    const stream = await navigator.mediaDevices
    .getUserMedia(constraints);

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play();

  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
  }
// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}
const { writeFile } = require('fs');

async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({

    buttonLabel: 'Save video',
    defaultPath: `vid-${Date.now()}.webm`
  });

  console.log(filePath);

  writeFile(filePath, buffer, () => console.log('video saved successfully!'));
}
  
startBtn.onclick = e => {
  mediaRecorder.start();
  startBtn.classList.add('is-danger');
  startBtn.innerText = 'Recording';
};
stopBtn.onclick = e => {
  mediaRecorder.stop();
  startBtn.classList.remove('is-danger');
  startBtn.innerText = 'Start';
};
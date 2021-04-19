if (window.File && window.FileReader && window.FileList) 
{ console.log('Todas las APIs soportadas');
} else {
alert('La API de FILE no es soportada en este navegador.');
}

//select input and video tag

const fileInput = document.querySelector('input[type="file"]');
// const media = document.querySelector('video');
const mediaSrc = document.querySelector('source');
//select progress bar elements
let progressBar = document.querySelector('progress');
let progressNumber = document.querySelector('#percentCalc');
//select drop zone
let dropZone = document.querySelector('#drop-zone');


const reader = new FileReader();

//function to show loaded percentage
function progressHandler(event) {
  var percent = Math.round((event.loaded / event.total) * 100);
  progressBar.value = percent;
  
    progressNumber.textContent = percent + '%';
    
};
//function to get and read loaded file
function handleEvent(event) {
    progressHandler(event)
    if (event.type === "load") {
        mediaSrc.src = reader.result
        media.load()
    }
}
//function to show reader's alerts
function addListeners(reader) {
    reader.addEventListener('loadstart', handleEvent);
    reader.addEventListener('load', handleEvent);
    reader.addEventListener('loadend', handleEvent);
    reader.addEventListener('progress', handleEvent);
    reader.addEventListener('error', handleEvent);
    reader.addEventListener('abort', handleEvent);
}
//function to display the video once it's loaded
function handleSelected(e) {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        addListeners(reader);
        reader.readAsDataURL(selectedFile);
        dropZone.setAttribute('class','drop-zone--hidden'); //Hides the drop-zoe once the video is loaded
    }
}
fileInput.addEventListener('change', handleSelected);


dropZone.addEventListener('click', () => fileInput.click())

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('drop-zone--active')
})

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropZone.classList.remove('drop-zone--active')
})

dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    fileInput.files = e.dataTransfer.files
    handleSelected(e)
     
    // console.log(fileInput.files);
});

//function to show control buttons when media is loaded
reader.onload = function() {    
    controls.setAttribute('class','showing');    
};

//select control buttons
let controls = document.querySelector('#controls');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const vup = document.querySelector('#vup');
const vdown = document.querySelector('#vdown');
//functions and event listeners to give functionality to control buttons
function playMedia() {
    media.play();
}
play.addEventListener('click',playMedia);

function pauseMedia() {
    media.pause();
}
pause.addEventListener('click',pauseMedia);

function stopMedia() {
    media.currentTime = 0;
    media.pause();  
    
}
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);


function volumeUp() {
    media.volume +=0.1;
}

vup.addEventListener('click', volumeUp);

function volumeDown() {
    media.volume -=0.1;
}

vdown.addEventListener('click', volumeDown);

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');
media.addEventListener('timeupdate', setTime);
function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }
  
    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;
  
    let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
    timerBar.style.width = barLength + 'px';
  }
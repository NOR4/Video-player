if (window.File && window.FileReader && window.FileList) 
{ console.log('Todas las APIs soportadas');
} else {
alert('La API de FILE no es soportada en este navegador.');
}

//select input and video tag

const fileInput = document.querySelector('input[type="file"]');
const media = document.querySelector('video');
const mediaSrc = document.querySelector('source');
//select progress bar elements
let progressBar = document.querySelector('progress');
let progressNumber = document.querySelector('#percentCalc');
//select control buttons
let controls = document.querySelector('#controls');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');
const vup = document.querySelector('#vup');
const vdown = document.querySelector('#vdown');

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
    }
}
fileInput.addEventListener('change', handleSelected);

//function to show control buttons when media is loaded
reader.onload = function() {    
        controls.setAttribute('class','showing');    
};

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

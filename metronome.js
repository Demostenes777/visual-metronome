window.last_timestamp = 0;
window.active_item = 0;
window.running = false;
window.timerId = null;
window.visualizationMode = 1;

function runMetronome() {
    let bpms = getBpms();
    let items = getItems();
    let i = getIndex();
    let delay = 0;

    if (window.running) {
        clearTimeout(window.timerId);
        delay = Date.now() - window.last_timestamp;
    }

    let offset = bpms - delay;

    window.timerId = setTimeout(function displayNextItem() {
        displayItem(items[i], i);
        window.last_timestamp = Date.now();
        i = getNextIndex(i)
        window.timerId = setTimeout(displayNextItem, bpms)
    }, offset);

    window.running = true;
}

function stopMetronome() {
    showItems();
    clearTimeout(window.timerId);
    window.running = false;
}

function showItems() {
    var elements = document.getElementsByClassName("numbered-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('d-block');
        elements[i].classList.remove('d-none');
    }
}

function hideItems() {
    var elements = document.getElementsByClassName("numbered-item");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('d-block');
        elements[i].classList.remove('bg-white');
        elements[i].classList.remove('text-white');
        elements[i].classList.add('bg-info');
        elements[i].classList.add('d-none');
        elements[i].classList.add('text-dark');
    }
}

function displayItem(element, i) {
    hideItems();
    if (hasToBeDisplayed(i)) {
        element.classList.remove('d-none');
        element.classList.add('d-block');
        element.classList.add('bg-info');
        window.active_item = i;
        let mySound = new Audio('audio/beep1.mp3')
        if (i == 0) {
            mySound = new Audio('audio/beep2.mp3')
        }
        mySound.play();
    } else {
        element.classList.remove('d-none');
        element.classList.add('bg-white');
        element.classList.add('text-white');
    }
}

function hasToBeDisplayed(i) {
    if (window.visualizationMode == 1) {return true;} 
    if (window.visualizationMode == 2 && i != 0) {return false;}
    if (window.visualizationMode == 3) {
        if (i == 1 || i == 3) {return false;}
    }
    return true;
}

function getBpms() {
    let bpm = document.getElementById("bpm").value;
    let bpms = 60000 / bpm;
    return bpms;
}

function getIndex() {
    let index = 0;
    if (window.running) {
        index = getNextIndex(window.active_item);
    }
    return index;
}

function getNextIndex(i) {
    if (i < 3) {
        i++;
    } else {
        i = 0;
    }
    return i;
}

function getItems() {
    var firstItem = document.getElementById("first-item");
    var secondItem = document.getElementById("second-item");
    var thirdItem = document.getElementById("third-item");
    var fourthItem = document.getElementById("fourth-item");

    return [firstItem, secondItem, thirdItem, fourthItem];
}

function updateVisualization() {
    window.visualizationMode = document.getElementById("visualization-mode").value;
}
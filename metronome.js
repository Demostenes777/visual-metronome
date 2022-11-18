window.last_timestamp = 0;
window.active_item = 0;
window.running = false;
window.timerId = null;

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
    var elements = document.getElementsByClassName( "numbered-item" );
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('d-block');
        elements[i].classList.remove('d-none');
    }
}

function hideItems() {
    var elements = document.getElementsByClassName( "numbered-item" );
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('d-block');
        elements[i].classList.add('d-none');
    }
}

function displayItem(element, i) {
    hideItems();
    element.classList.remove('d-none');
    element.classList.add('d-block');
    window.active_item = i;
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
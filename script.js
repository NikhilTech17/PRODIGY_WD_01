let startTime, updatedTime, difference;
let running = false, interval, laps = [];

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
        difference = new Date().getTime() - startTime;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("lapsList").innerHTML = "";
    difference = 0;
    laps = [];
}

function recordLap() {
    if (running) {
        laps.push(document.getElementById("display").innerText);
        updateLaps();
    }
}

function updateLaps() {
    const lapList = document.getElementById("lapsList");
    lapList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(lapItem);
    });
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    let seconds = Math.floor((updatedTime / 1000) % 60);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);

    milliseconds = String(milliseconds).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");

    document.getElementById("display").innerText = `${minutes}:${seconds}:${milliseconds}`;
}

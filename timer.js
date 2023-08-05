let timerInterval; 
let currentIndex = 0; 

let dailyCounts = [];

function startStudySession() {
  const studyTimers = [
    { duration: 25, message: "Starting 25-minute study timer!" },
    { duration: 5, message: "Starting 5-minute break!" },
    { duration: 25, message: "Starting 25-minute study timer!" },
    { duration: 5, message: "Starting 5-minute break!" },
    { duration: 25, message: "Starting 25-minute study timer!" },
    { duration: 5, message: "Starting 5-minute break!" },
    { duration: 25, message: "Starting 25-minute study timer!" },
    { duration: 15, message: "Great Work! Enjoy a 15 minute break and restart the pomodoro if you'd like to keep studying!" }
  ];

  let timerElement = document.getElementById("timer");
  let cancelButton = document.getElementById("cancelButton");
  let skipButton = document.getElementById("skipButton");

  cancelButton.style.display = "inline-block";
  skipButton.style.display = "inline-block";

  timerElement.innerHTML = "";

  executeTimer();

  function executeTimer() {
    if (currentIndex >= studyTimers.length) {
      timerElement.innerHTML = "Study session complete!";
      cancelButton.style.display = "none";
      skipButton.style.display = "none";
      return;
    }

    let { duration, message } = studyTimers[currentIndex];

    if (confirm(message)) {
      let endTime = new Date().getTime() + duration * 60000;

      clearInterval(timerInterval); 
      timerInterval = setInterval(() => {
        let now = new Date().getTime();
        let distance = endTime - now;

        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (distance <= 0) {
          clearInterval(timerInterval);
          timerElement.innerHTML = "Time's up!";
          cancelButton.style.display = "none";

          if (currentIndex < studyTimers.length - 1) {
            skipButton.style.display = "inline-block";
          }
        }
      }, 1000);
    } else {
      cancelButton.style.display = "none";
      skipButton.style.display = "inline-block";
    }
  }

  startTimer();

  drawBarGraph();
}

function cancelTimer() {
  clearInterval(timerInterval);
  let timerElement = document.getElementById("timer");
  let cancelButton = document.getElementById("cancelButton");
  let skipButton = document.getElementById("skipButton");

  timerElement.innerHTML = "Timer canceled.";
  timerElement.style.fontSize = "24px";
  cancelButton.style.display = "none";
  skipButton.style.display = "none";

  currentIndex = 0;
  drawBarGraph();
}

function skipTimer() {
  clearInterval(timerInterval);
  let timerElement = document.getElementById("timer");
  let cancelButton = document.getElementById("cancelButton");
  let skipButton = document.getElementById("skipButton");

  timerElement.innerHTML = "Timer skipped.";
  timerElement.style.fontSize = "24px";
  cancelButton.style.display = "none";
  skipButton.style.display = "none";

  currentIndex++;
  executeTimer();
}

// Canvas Graph 

const graphCanvas = document.getElementById("graphCanvas");
const ctx = graphCanvas.getContext("2d");
const barSpacing = 30;
const barColor = "#2196F3";
const barWidth = 20; 

let counter = 0;


function startTimer() {
  counter++;

  const today = new Date().toLocaleDateString();

  // Check if there is a count
  const countIndex = dailyCounts.findIndex((item) => item.date === today);

  if (countIndex !== -1) {
    // If count already exists update 
    dailyCounts[countIndex].count = counter;
  } else {
    // If count doesn't exist create 
    dailyCounts.push({ date: today, count: counter });
  }
}


var buttonClicks = [];


function getButtonClicks() {
  return buttonClicks;
}

function handleButtonClick() {
  var today = new Date().toLocaleDateString();

  // Check if todays entry already exists in array
  var existingEntry = buttonClicks.find(entry => entry.date === today);

  if (existingEntry) {
    // Increment the count
    existingEntry.count++;
  } else {
    buttonClicks.push({ date: today, count: 1 });
  }
  // Calll draw function to display graph
  drawBarGraph();
}

var buttonClicks = getButtonClicks();

function drawBarGraph() {
  var canvas = document.getElementById("graphCanvas");
  var ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  var graphWidth = canvas.width - 40;
  var graphHeight = canvas.height - 60;
  var barSpacing = 40;

  // Calculate the max count
  var maxCount = Math.max(...dailyCounts.map(item => item.count));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the graph title
  ctx.font = "25px Helvetica Neue";
  ctx.fillStyle = "white";
  var title = "Pomodoros Per Day";
  var titleWidth = ctx.measureText(title).width; 
  var titleX = (canvas.width - titleWidth) / 2; 
  
  var titleY = 50; 
  ctx.fillText(title, titleX, titleY);

  var barWidth = 50;
  var maxBarHeight = graphHeight - titleY - 30; 

  // Draw the left label 
  ctx.font = "14px Helvetica Neue";
  ctx.fillStyle = "white";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  var labelInterval = 1; 
  for (var i = 1; i <= 10; i += labelInterval) {
    var labelY = canvas.height - 30 - (i / 10) * maxBarHeight;
    ctx.fillText(i.toString(), 50, labelY);
  }

  // Draw x label
  ctx.font = "14px Helvetica Neue";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Date", canvas.width / 2, canvas.height - 20);

  // Draw y label
  ctx.save();
  ctx.translate(20, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText("Number of Pomodoros", 0, 0);
  ctx.restore();

  // Draw bars
  for (var i = 0; i < dailyCounts.length; i++) {
    var count = dailyCounts[i].count;

    // Calculate the height 
    var barHeight = (count / 10) * maxBarHeight;

    // Calculate the position 
    var x = 75 + (barWidth + barSpacing) * i;
    var y = canvas.height - 30 - barHeight - 20;

    // Draw bar
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, barWidth, barHeight);

}
}

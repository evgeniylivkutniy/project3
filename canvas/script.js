let canvas = document.getElementById('canvas')
let context = canvas.getContext("2d")
let boundings = canvas.getBoundingClientRect();
let startX = 0;
let startY = 0;
let mouseX = 0;
let mouseY = 0;
context.strokeStyle = 'black'; // initial brush color
context.lineWidth = 1; // initial brush width
context.lineCap = "round";
let isDrawing = false;
let colors = document.getElementsByClassName('colors')[0];
let brushes = document.getElementsByClassName('lineWidth')[0];
let eraser = document.getElementsByClassName('eraser')[0];
let stroke = document.getElementById('stroke');
let fill = document.getElementById('fill')
brushes.addEventListener('click', (event) =>
    context.lineWidth = event.target.value || 1);

colors.addEventListener('click', (event) =>
    context.strokeStyle = event.target.value || 'black');

eraser.addEventListener('click', (event) =>
    context.strokeStyle = event.target.value);

stroke.addEventListener('click', (event) => letStroke(event))
fill.addEventListener('click', (event) => letFill(event))
// fillEmpty.addEventListener('click', (event) =>
//     context.fillStyle = event.target.value);
function letStroke() {
    context.stroke()
}
function letFill() {

    context.fillStyle = 'blue'
}

let pencil = document.getElementById('pencil')
pencil.addEventListener('click', (e) => drawPencil(e))

function drawPencil() {
    canvas.addEventListener('mousedown', (event) => handleMouseDown(event));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event))
    function handleMouseDown(event) { // краще виносити вкладені функціїї на зовні, або використовувати класовий підхід, в якому всі функції будуть методами
        event.preventDefault();
        setMouseCoordinates(event)
        isDrawing = true;
        context.beginPath();
        context.moveTo(mouseX, mouseY)
    }
    function handleMouseMove(e) {
        if (isDrawing) {
            e.preventDefault();
            context.lineTo(mouseX, mouseY);
        }
    }
    function handleMouseUp(event) {
        event.preventDefault();
        isDrawing = false;
    }

}


// Mouse Up Event
canvas.addEventListener('mouseup', function (event) {
    setMouseCoordinates(event);
    event.preventDefault();
    isDrawing = false;
});

canvas.addEventListener('mousedown', function (event) {
    setMouseCoordinates(event);
    isDrawing = true;

    // Start Drawing
    context.beginPath();
    context.moveTo(mouseX, mouseY);
});

// Mouse Move Event
canvas.addEventListener('mousemove', function (event) {
    setMouseCoordinates(event);

    if (isDrawing) {
        context.lineTo(mouseX, mouseY);
        context.stroke();
    }
});

// Mouse Up Event
canvas.addEventListener('mouseup', function (event) {
    setMouseCoordinates(event);
    isDrawing = false;
});

// Handle Mouse Coordinates
function setMouseCoordinates(event) {
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
}

let clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

let saveButton = document.getElementById('save');

saveButton.addEventListener('click', function () {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
});

//малювання прямої лінії
function drawLine() {

    canvas.addEventListener('mousedown', (event) => handleMouseDown(event));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event))
    function handleMouseDown(event) {
        event.preventDefault();
        setMouseCoordinates(event)
        isDrawing = true;
        startX = mouseX;
        startY = mouseY;
    }
    function handleMouseMove(event) {
        if (isDrawing) {

            event.preventDefault();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.lineTo(mouseX, mouseY);
            context.stroke()
            context.beginPath();
            context.moveTo(startX, startY);
        }
    }
    function handleMouseUp(event) {
        event.preventDefault();
        isDrawing = false;
    }

}

let line = document.getElementById('line')
line.addEventListener("click", (e) => drawLine(e))

//малювання прямокутника

function drawRect() {
    canvas.addEventListener('mousedown', (event) => handleMouseDown(event));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event))
    function handleMouseDown(event) {
        event.preventDefault();
        setMouseCoordinates(event)
        isDrawing = true;
        startX = mouseX;
        startY = mouseY;
        context.beginPath();
        context.moveTo(startX, startY);
    }
    function handleMouseMove(event) {
        if (!isDrawing) { return; }
        event.preventDefault();
        let width = mouseX - startX;
        let height = mouseY - startY;
        context.clearRect(0, 0, canvas.width, canvas.height);


        context.strokeRect(startX, startY, width, height);
    }
    function handleMouseUp(event) {
        event.preventDefault();
        isDrawing = false;
    }

}
let rect = document.getElementById('rect')
rect.addEventListener("click", (e) => drawRect(e))

function drawArc(event) {

    canvas.addEventListener('mousedown', (event) => handleMouseDown(event));
    canvas.addEventListener('mousemove', (event) => handleMouseMove(event));
    canvas.addEventListener('mouseup', (event) => handleMouseUp(event))
    function handleMouseDown(event) {
        event.preventDefault();
        setMouseCoordinates(event)
        isDrawing = true;
        startX = mouseX;
        startY = mouseY;
    }
    function handleMouseMove(e) {
        if (!isDrawing) { return; }
        event.preventDefault();
        let radius = mouseX - startX;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        context.stroke()

    }
    function handleMouseUp(event) {
        event.preventDefault();

        isDrawing = false;
    }

}
let arc = document.getElementById('arc')
arc.addEventListener('click', (e) => drawArc(e))

function drawTreangle(event) {
    // event.preventDefault();
    context.beginPath();
    context.moveTo(50, 50)
    context.lineTo(50, 200)
    context.lineTo(200, 200)
    context.closePath();
    context.stroke();

}
let treangle = document.getElementById('treangle');
treangle.addEventListener('click', (e) => drawTreangle(e))

function drawStar() {
    context.beginPath();
    context.moveTo(50, 50);
    context.lineTo(120, 150);
    context.lineTo(0, 180);
    context.lineTo(120, 210);
    context.lineTo(50, 310);
    context.lineTo(160, 250);
    context.lineTo(190, 370);
    context.lineTo(220, 250);
    context.lineTo(330, 310);
    context.lineTo(260, 210);
    context.lineTo(380, 180);
    context.closePath();
    context.stroke();
}
let star = document.getElementById('star');
star.addEventListener('click', (e) => drawStar(e))
var canvas = document.getElementById("myCanvas");
var content = canvas.getContext("2d");
var ball = 7;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 47;
var brickHeight = 10;
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 20;
var score = 0;
var bricks = [];

for (var a = 0; a < brickColumnCount; a++) {
    bricks[a] = [];
    for (var b = 0; b < brickRowCount; b++) {
        bricks[a][b] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var d = 0; d < brickRowCount; d++) {
            var e = bricks[c][d];
            if (e.status == 1) {
                if (x > e.x && x < e.x + brickWidth && y > e.y && y < e.y + brickHeight) {
                    dy = -dy;
                    e.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("WINNER");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawBall() {
    content.beginPath();
    content.arc(x, y, ball, 0, Math.PI * 2);
    content.fillStyle = "#B22222";
    content.fill();
    content.closePath();
}

function drawPaddle() {
    content.beginPath();
    content.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    content.fillStyle = "#0095DD";
    content.fill();
    content.closePath();
}

function drawBricks() {
    var brickCount = 0;
    for (var f = 0; f < brickColumnCount; f++) {
        for (var g = 0; g < brickRowCount; g++) {
            if (bricks[f][g].status == 1) {
                var brickX = (g * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (f * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[f][g].x = brickX;
                bricks[f][g].y = brickY;
                content.beginPath();
                content.rect(brickX, brickY, brickWidth, brickHeight);
                if (brickCount % 2 == 0) {
                    content.fillStyle = "#1E90FF";
                    brickCount++;
                } else {
                    content.fillStyle = "#00BFFF";
                    brickCount++;
                }
                content.fill();
                content.closePath();
            }
        }
    }
}

function scoreCounter() {
    content.font = "12px Verdana";
    content.fillStyle = "#b22222";
    content.fillText("Score: " + score, 8, 20);
}

function draw() {
    content.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    scoreCounter();
    collisionDetection();

    if (x + dx > canvas.width - ball || x + dx < ball) {
        dx = -dx;
    }
    if (y + dy < ball) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ball) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("LOSER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);
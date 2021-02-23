let arr = [
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];
let r;
let symbolTurn = "X";

function drawO(x, y, alph = 225) {
  stroke(0, 0, 0, alph);
  noFill();
  strokeWeight(4);
  circle(x, y, 50);
}
function drawX(x, y, alph = 225) {
  stroke(0, 0, 0, alph);
  noFill();
  strokeWeight(4);
  line(x - r / 2, y - r / 2, x + r / 2, y + r / 2);
  line(x + r / 2, y - r / 2, x - r / 2, y + r / 2);
}
function drawArr() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      switch (arr[j][i]) {
        case 1:
          drawX(((2 * i + 1) * width) / 6, ((2 * j + 1) * height) / 6);
          break;
        case 2:
          drawO(((2 * i + 1) * width) / 6, ((2 * j + 1) * height) / 6);
          break;

        default:
          break;
      }
    }
  }
}

function cellEmpty(i, j) {
  if (arr[j][i] != 1 && arr[j][i] != 2) return true;
  return false;
}
function hoverSymbol() {
  var i = floor((mouseX * 3) / width);
  var j = floor((mouseY * 3) / height);
  if (mouseInCanvas() && cellEmpty(i, j))
    switch (symbolTurn) {
      case "X":
        drawX(((2 * i + 1) * width) / 6, ((2 * j + 1) * height) / 6, 80);
        break;
      case "O":
        drawO(((2 * i + 1) * width) / 6, ((2 * j + 1) * height) / 6, 80);
        break;
    }
}
function isDraw() {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (cellEmpty(i, j)) return false;

  return true;
}
function someoneWon() {
  for (let i = 0; i < 3; i++) {
    if (arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2])
      return [true, arr[i][0]];
    if (arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i])
      return [true, arr[0][i]];
  }
  if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2])
    return [true, arr[0][0]];
  if (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0])
    return [true, arr[0][2]];

  return [false, arr[0][0]];
}
function mouseInCanvas() {
  return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
}
//p5 Functions
function mouseReleased(event) {
  var i = floor((mouseX * 3) / width);
  var j = floor((mouseY * 3) / height);
  if (event.button === 0 && mouseInCanvas() && cellEmpty(i, j)) {
    arr[floor((mouseY * 3) / height)][floor((mouseX * 3) / width)] =
      symbolTurn === "X" ? 1 : 2;

    if (someoneWon()[0]) {
      alert("Player " + (someoneWon()[1] === 1 ? "X" : "O") + " won !");

      remove();
      return;
    }
    if (isDraw()) {
      alert("Its a Draw !");

      remove();
      return;
    }
    symbolTurn = symbolTurn === "X" ? "O" : "X";
  }
}
function setup() {
  createCanvas(400, 400);
  r = sqrt(2) * 25;
}
function draw() {
  background(180);
  drawArr();
  hoverSymbol();
  //grid
  for (let i = 1; i < 3; i++) {
    stroke(255);
    strokeWeight(2);
    line(0, (i * height) / 3, width, (i * height) / 3);
    line((i * width) / 3, 0, (i * width) / 3, height);
  }
}

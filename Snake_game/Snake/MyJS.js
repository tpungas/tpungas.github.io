var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;
var snake = [];
var direction = 'y+'; // y+ — вверх (уменьшение Y)
var gameIsRunning = false;
var snake_timer;
var score = 0;

function init() {
  prepareGameField();
  var wrap = document.getElementsByClassName('wrap')[0];
  wrap.style.width = (FIELD_SIZE_Y * 20) + 'px';
  document.getElementById('snake-start').addEventListener('click', startGame);
  document.getElementById('snake-renew').addEventListener('click', refreshGame);
  addEventListener('keydown', changeDirection);
}

function prepareGameField() {
  var game_table = document.createElement('table');
  game_table.className = 'game-table';

  for (var i = 0; i < FIELD_SIZE_X; i++) {
    var row = document.createElement('tr');
    row.className = 'game-table-row row-' + i;
    for (var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = document.createElement('td');
      cell.className = 'cell-' + i + '-' + j; // формат cell-Y-X
      row.appendChild(cell);
    }
    game_table.appendChild(row);
  }

  var field = document.getElementById('snake-field');
  field.innerHTML = '';
  field.appendChild(game_table);
}

function startGame() {
  if (gameIsRunning) return;
  gameIsRunning = true;
  score = 0;

  // очищаем старые состояния, если есть
  var prevSnake = document.querySelectorAll('.snake-unit');
  prevSnake.forEach(function(c){ c.classList.remove('snake-unit'); });
  var prevFood = document.querySelectorAll('.food-unit');
  prevFood.forEach(function(c){ c.classList.remove('food-unit'); });

  snake = [];
  respawn();
  createFood();
  snake_timer = setInterval(move, SNAKE_SPEED);
}

function respawn() {
  var startY = Math.floor(FIELD_SIZE_X / 2);
  var startX = Math.floor(FIELD_SIZE_Y / 2);

  var head = document.getElementsByClassName('cell-' + startY + '-' + startX)[0];
  var tailY = startY + 1;
  if (tailY >= FIELD_SIZE_X) tailY = startY - 1;
  var tail = document.getElementsByClassName('cell-' + tailY + '-' + startX)[0];

  tail.classList.add('snake-unit');
  head.classList.add('snake-unit');

  snake.push(tail); // первый элемент — хвост
  snake.push(head); // последний — голова
}

function move() {
  if (!gameIsRunning) return;

  var head = snake[snake.length - 1];
  var classes = head.className.split(' ');
  var coordClass = null;
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].indexOf('cell-') === 0) { coordClass = classes[i]; break; }
  }
  if (!coordClass) { finishTheGame(); return; }

  var parts = coordClass.split('-'); // ["cell", "Y", "X"]
  var coordY = parseInt(parts[1], 10);
  var coordX = parseInt(parts[2], 10);

  var newY = coordY, newX = coordX;
  if (direction === 'x-') newX = coordX - 1;
  else if (direction === 'x+') newX = coordX + 1;
  else if (direction === 'y+') newY = coordY - 1;
  else if (direction === 'y-') newY = coordY + 1;

  if (newX < 0 || newX >= FIELD_SIZE_Y || newY < 0 || newY >= FIELD_SIZE_X) {
    finishTheGame();
    return;
  }

  var newUnit = document.getElementsByClassName('cell-' + newY + '-' + newX)[0];
  if (!newUnit || isSnakeUnit(newUnit)) {
    finishTheGame();
    return;
  }

  newUnit.classList.add('snake-unit');
  snake.push(newUnit);

  if (!haveFood(newUnit)) {
    var removed = snake.shift();
    removed.classList.remove('snake-unit');
  }
}

function isSnakeUnit(unit) {
  return snake.indexOf(unit) !== -1;
}

function haveFood(unit) {
  if (unit.classList.contains('food-unit')) {
    unit.classList.remove('food-unit');
    createFood();
    score++;
    return true;
  }
  return false;
}

function createFood() {
  var foodCreated = false;
  while (!foodCreated) {
    var foodY = Math.floor(Math.random() * FIELD_SIZE_X);
    var foodX = Math.floor(Math.random() * FIELD_SIZE_Y);
    var cell = document.getElementsByClassName('cell-' + foodY + '-' + foodX)[0];
    if (!cell.classList.contains('snake-unit') && !cell.classList.contains('food-unit')) {
      cell.classList.add('food-unit');
      foodCreated = true;
    }
  }
}

function changeDirection(e) {
  switch (e.keyCode) {
    case 37: if (direction !== 'x+') direction = 'x-'; break; // left
    case 38: if (direction !== 'y-') direction = 'y+'; break; // up
    case 39: if (direction !== 'x-') direction = 'x+'; break; // right
    case 40: if (direction !== 'y+') direction = 'y-'; break; // down
  }
}

function finishTheGame() {
  gameIsRunning = false;
  clearInterval(snake_timer);
  alert('Вы проиграли! Ваш результат: ' + score.toString());
}

function refreshGame() {
  location.reload();
}

window.onload = init;

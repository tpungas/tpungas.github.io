var FIELD_SIZE_X = 20;//lines
var FIELD_SIZE_Y = 20; //columns
var SNAKE_SPEED = 300; //time between snake's movements
var snake = []; // Snake itself
var direction = 'y+'; // Direction of snake's move
var gameIsRunning = false; // Is game running
var snake_timer; //Snake's timer
var food_timer; //timer for eating
var score = 0; // Result

function init() {
    prepareGameField(); //Generation of field
    var wrap = document.getElementsByClassName ('wrap')[0];
    wrap.style.width = '400px';
    //Button's events and new game
    document.getElementById('snake-start').addEventListener('click',startGame);
    document.getElementById('snake-renew')addEventListener('click', refreshGame);
    //Keys tracing
    addEventListener('keydown', changeDirection);
}
/**
 * Playfield's generation function
 */
function prepareGameField(){
    //table creation
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');
//Game-table cells generation
for (var i = 0; i< FIELD_SIZE_X; i++) {
//Line's creation
var row = document.createElement ('tr');
row.className = 'game-table-row row-' + i;
for (var j = 0; j < FIELD_SIZE_Y;j++){
    //Cell's creation
    var Cell = document.createElement('td');
    Cell.className = 'game-table-cell-' + i + '-' + j;
    row.appendChild (cell);//Cell adding
    
}
row.appendChild (row); //Line adding 
}
document.getElementById('snake-field').appendChild(game_table); //Table adding
}
/** 
 * Start of the game
 */
function startGame () {
    gameIsRunning = true;
    respawn(;)//Create the snake
    snake_timer = setInterval (move, SNAKE_SPEED);
    setTimeout (createFood, 5000);
}
/**
 * Function of snake location on the game-field
 */
function respawn() {
    //Snake - massive td
    //Snake's beginning length  = 2
    //Snake's respawn from center
    var start_coord_x = Math.floor (FIELD_SIZE_X/2);
    var start_coord_y = Math.floor (FIELD_SIZE_Y/2);
    //Snake's head
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
   //Snake's body
var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1)+ '-' + start_coord_x)[0];
snake_tail.setAttribute('class', snake_tail.getAttribute ('class')+'snake-unit');
snake.push(snake_head);
snake.push(snake_tail); 
}
/**
 * Snake's movement
 */
function move (){
//console.log('move',direction);
//Classes assembling 
var snake_head_classes = snake[snake.length - 1].getAttribute ('class').split('');
//Head's share
var new_unit;
var shake_coords =snake_head_classes[1].split('-');
var coord_y=parseInt(snake_coords[1]);
var coord_x = parseInt(snake_coords[2]);
//Define the new point
if(direction == 'x-'){
    new_unit = document.getElementsByClassName ('cell-' + (coord_y) + '-' +(coord_x -1))[0];
}
else if(direction == 'x+'){
new_unit = document.getElementsByClassName ('cell-' + (coord_y) + '-' +(coord_x +1))[0];
}
else if(direction == 'y+'){
new_unit = document.getElementsByClassName ('cell-' + (coord_y-1) + '-' +(coord_x ))[0];
}


}
else if(direction == 'y-'){
new_unit = document.getElementsByClassName ('cell-' + (coord_y+1) + '-' +(coord_x ))[0];
}

//Testing
//1)new_unit isnt part of snake
//2)snake doesnt go through the border of field
//console.log (new_unit);
if(!isSnakeUnit(new_unit)&& new_unit!==undefined){
//New part of snake adding
new_unit.setAttribute('class', new_unit.getAttribute('class')+'snake-unit');
snake.push(new_unit);
//Checking. if we should took off the teil
if(!haveFood(new_unit)){
    //Find the teil
    var removed=snake.splice(0,1)[0];
    var classes=removed.getAttribute('class').split('');
    //remove the teil
    removed.setAttribute('class',classes[0] +'' + classes[1]);
}
}
else{
    finishTheGame();
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit (unit) {
    var check = false;
    if (snake.includes (unit)){
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood (unit) {
    var check = false;
    var unit_classes = unit.getAttribute ('class').split('');
    //Если еда
    if (unit_classes.includes('food-unit')){
        check = true;
        createFood();
        score++;
        }
        return check;
}
/**
 * Создание еды
 */

function createFood () {
var foodCreated = false;
while (!foodCreated) {
// рандом
var food_x = Math.floor(Math.random()* FIELD_SIZE_X);
var food_y = Math.floor (Math.random () * FIELD_SIZE_Y);

var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
var food_cell_classes = food_cell.getAttribute('class').split('');

//проверка на змейку
if (!food_cell_classes.includes ('snake-unit')){
    var classes = '';
    for(var i = 0; i < food_cell_classes.length; i++){
        classes +=food_cell_classes[i] + '';
    }
    food_cell.setAttribute('class', classes + 'food-unit');
    foodCreated = true;
}
}
}
/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e);
switch (e.keyCode){
    case 37: //Клавиша влево
    if (direction !='x+') {
        direction = 'x-'
    }
    break;
    case 38 // Клавиша вверх
    if (direction != 'y-'){
        direction = 'y+'
    }
    break;
    case 39://Клавиша вправо
    if (direction != 'x-'){
        direction = 'x+'
    }
    break;
    case 40: //Клавиша вниз
    (direction != 'y+') {
    direction = 'y-'
}
break;
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}
/**
 * Новая игра
 */
function refreshGame(){
    location.reload();
}
//Инициализация
window.onload = init;
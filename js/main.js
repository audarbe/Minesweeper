/*----- constants -----*/
const difficultyLookup = {
  outbreak: {
    xAxis: 10,
    yAxis: 10,
    coronas: 10,
    masks: 10,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: '#9ACD32', //yellowgreen
  },
  epidemic: {
    xAxis: 15,
    yAxis: 13,
    coronas: 40,
    masks: 40,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: '#FF8C00', //darkorange
  },
  pandemic: {
    xAxis: 30,
    yAxis: 16,
    coronas: 99,
    masks: 99,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: '#FF4500', //orangered
  },
};

const squareEl = {
  occupied: {
    color: 'red',
    image: 'img/corona_icon.png', // use background instead
  },
  uncovered: {
    color: 'lightgray',
    image: '',
  },
  available: {
    color: 'green',
    image: '',
  },
  flagged: {
    color: 'yellow',
    image: '',
  },
};

const emoji = {
  inPlay: 'img/ejoji_inPlay.png',
  click: 'img/emoji_active.png',
  lose: 'img/ejoji_lose.png',
  win: 'img/emoji_win.png',
};

const audioEl = {
  flagged: '',
  uncover: '',
  start: '',
  lose: '',
  win: '',
};

const proximityTest = [
  [0, -1], // top  
  [1, -1], // top-right
  [1, 0], // right
  [1, 1], //bottom-right
  [0, 1], //bottom
  [-1, 1], //bottom-left
  [-1, 0], // left
  [-1, -1] //top-left
]

/*----- app's state (variables) -----*/
let difficulty;
let currentScore;
let board;
let occupiedSquares;
let currentEl;
let score;

/*----- cached element references -----*/


/*----- event listeners -----*/
$('#difficulty-selector').change(init);
$('#reset').on('click', init);
$('#corona-field').on('mousedown', '.square', clickHandle);
$(window).on('keydown', gameCheat);

/*----- functions -----*/

function init() {
  console.log('init');
  score = 0;
  difficulty = $('#difficulty-selector').val();
  createBoard();
  board = $('.square');
  render();
};

function createBoard() { //refactor here
  //clear board
  occupiedSquares = [];
  $('.corona-field > div').remove();
  //set up grid
  for (let y = 0; y < difficultyLookup[difficulty].yAxis; y++) {
    let newRow = $(`<div class='gameboard-row' id='row${y}'></div>`)
    $('#corona-field').append(newRow);
    for (let x = 0; x < difficultyLookup[difficulty].xAxis; x++) {
      let newSquare = $(`<div class='square' id='c${x}r${y}' col-id='${x}' row-id='${y}'></div>`)
      $(`#row${y}`).append(newSquare);
    };
  };
  plantCoronas();
};

function plantCoronas() {
  while (occupiedSquares.length < difficultyLookup[difficulty].coronas) {
    let xRan = Math.floor((Math.random() * (difficultyLookup[difficulty].xAxis - 0) + 0));
    let yRan = Math.floor((Math.random() * (difficultyLookup[difficulty].yAxis - 0) + 0));
    let $occupiedSquare = $(`#c${xRan}r${yRan}`);
    if (!($occupiedSquare.hasClass('occupied'))) {
      $occupiedSquare.addClass('occupied');
      occupiedSquares.push($occupiedSquare);
    };      
  }
};

function clickHandle(event) {
  currentEl = $(event.target);
  $('#corona-field').on('contextmenu', '.square', function () { return false }); //consider this a DOM event? or rewrite in JS
  if (event.which === 1 ? checkSquares() : toggleMask());
}


function checkSquares() {
  // console.log('left click on currentEl', currentEl) //for currentEl testing
  if ($(currentEl).hasClass('occupied')) {
    console.log('occupied');
  } else {
    uncoverSquare(event);
  } 
  

/* GET THIS TO WORK LATER (USE JAVASCRIPT!!!)
 let isCellOccupied = occupiedSquares.some(function(el) {
    console.log($(el) === currentEl)
    // return el === currentEl;
  });
 if (isCellOccupied ? console.log('cell occupied') : console.log('cell unoccupied'));
*/
}

function uncoverSquare() {
$(currentEl).css('background-color', 'yellow').addClass('uncovered');


proximityTest.forEach(function(coord) {
  let currentColId = parseInt($(currentEl).attr('col-id'));
  let currentRowId = parseInt($(currentEl).attr('row-id'));
  let proxTest = $(`.square[col-id='${currentColId + coord[0]}'][row-id='${currentRowId + coord[1]}']`)
  if ($(proxTest).hasClass('occupied')) {
    console.log('proximity warning')
  } else {
    proxTest.css('background-color', 'yellow')
    score += 1;
  }
});








}



function toggleMask() {
  console.log('right click on currentEl', currentEl)
}

function gameCheat(event) {
  if (event.which === 192) $('.occupied').toggleClass('cheat');
}

function render() {
  $('body').css('background-color', difficultyLookup[difficulty].color);
  $('#remaining-coronas').text(difficultyLookup[difficulty].coronas);
  $('#remaining-masks').text(difficultyLookup[difficulty].masks);
}

init();
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

const proximity = [
  [0, -1], // top  
  [1, -1], // top-right
  [1, 0], // right
  [1, 1], //bottom-right
  [0, 1], //bottom
  [-1, 1], //bottom-left
  [-1, 0], // left
  [-1, -1], //top-left
  [0, 0] // current cell
]

/*----- app's state (variables) -----*/
let difficulty;
let currentScore;
let board;
let occupiedSquares;
let currentEl;
let score;
let timer;

/*----- cached element references -----*/
let unoccupied = $('.square > p:contains("0")');

/*----- event listeners -----*/
$('#difficulty-selector').change(init);
$('#reset').on('click', init);
$('#corona-field').on('mousedown', '.square', clickHandle);
$(window).on('keydown', gameCheat);

/*----- functions -----*/

function init() {
  console.log('init');
  score = 0;
  stopTimer();
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
      let newSquare = $(`<div class='square covered' id='c${x}r${y}' col-id='${x}' row-id='${y}'><p class='prox-test'>0</p></div>`)
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
      $occupiedSquare.addClass('occupied').addClass('cheat').removeClass('covered');
      occupiedSquares.push($occupiedSquare);
    };      
  }
  addNumbers()
};

function addNumbers() {
  proximity.forEach(function(coord) {
    occupiedSquares.forEach(function(occupiedSquare) {
      let colId = parseInt($(occupiedSquare).attr('col-id'));
      let rowId = parseInt($(occupiedSquare).attr('row-id'));
      prox = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
      let currentVal = parseInt($(prox).text()); 
        if (!($(prox).hasClass('occupied'))) {
          $(prox).text(`${currentVal += 1}`).addClass('proxCell');
        };
    });
  });
};

function clickHandle(event) {
  currentEl = $(event.target);
  $('#corona-field').on('contextmenu', '.square', function () { return false }); //consider this a DOM event? or rewrite in JS
  if (event.which === 1 ? checkSquares() : toggleMask());
}


function checkSquares() {
  if ($(currentEl).hasClass('occupied')) {
    console.log('occupied');
    stopTimer();
  } else {
    uncoverSquare();
    startTimer();
  } 
}
//linear solve
function uncoverSquare() {
  let colId = parseInt($(currentEl).attr('col-id'));
  let rowId = parseInt($(currentEl).attr('row-id'));

//right-up
  for (let t = rowId; t > 0; t--) {
    if ($(`.square[col-id='${colId}'][row-id='${t}']`).hasClass('proxCell')) break;
    for (let r = colId; r < difficultyLookup[difficulty].xAxis; r++) {
      if ($(`.square[col-id='${r}'][row-id='${t}']`).hasClass('proxCell')) break;
      checkProximity(r, t);
    }
  }
//right-down
  for (let r = colId; r < difficultyLookup[difficulty].xAxis; r++) {
    if ($(`.square[col-id='${r}'][row-id='${rowId}']`).hasClass('proxCell')) break;
    for (let b = rowId; b < difficultyLookup[difficulty].yAxis; b++) {
      if ($(`.square[col-id='${r}'][row-id='${b}']`).hasClass('proxCell')) break;
      checkProximity(r, b);
    }
  }
//left-down
  for (let l = colId; l > 0; l--) {
    if ($(`.square[col-id='${l}'][row-id='${rowId}']`).hasClass('proxCell')) break;
    for (let b = rowId; b < difficultyLookup[difficulty].yAxis; b++) {
      if ($(`.square[col-id='${l}'][row-id='${b}']`).hasClass('proxCell')) break;
      checkProximity(l, b);
    }
  }   
//left-top
  for (let l = colId; l > 0; l--) {
    if ($(`.square[col-id='${l}'][row-id='${rowId}']`).hasClass('proxCell')) break;
    for (let t = rowId; t > 0; t--) {
      if ($(`.square[col-id='${l}'][row-id='${t}']`).hasClass('proxCell')) break;
      checkProximity(l, t);
    }
  }
};

function checkProximity(colId, rowId) {
  proximity.forEach(function(coord) {
    checkProx = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
    if ($(checkProx).hasClass('covered') || ($(checkProx).hasClass('proxCell'))) {
      $(checkProx).addClass('uncovered').removeClass('covered');
        score += 1;
      } else if ($(checkProx).hasClass('occupied')) {
        console.log('occupied alert')
      };
  });
};



// && (!$(checkProx).hasClass('proxCell'))) 



// function uncoverSquare() {
//   let colId = parseInt($(currentEl).attr('col-id'));
//   let rowId = parseInt($(currentEl).attr('row-id'));
//   proximity.forEach(function(coord) {
//     currentEl = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
//         if ($(currentEl).hasClass('covered')) {
//           $(currentEl).addClass('uncovered').removeClass('covered');
//           score += 1;
//           console.log('score', score)
//         } else if ($(currentEl).hasClass('occupied')) {
//           console.log('occupied alert')
//         } else {
//         };
//   });
// };

function startTimer() {
  var seconds = document.getElementById("timer").textContent;
  timer = setInterval(function() {
    seconds++;
    document.getElementById("timer").textContent = seconds;
  }, 1000);
}

function stopTimer() { //get this stop timer to work
  clearInterval(timer);
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
  $('.square > p:contains("0")').hide();
}


init();
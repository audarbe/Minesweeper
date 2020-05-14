/*----- constants -----*/
const difficultyLookup = {
  outbreak: {
    xAxis: 10,
    yAxis: 10,
    coronas: 10,
    size: '55px',
    get winAmount() { return this.xAxis * this.yAxis - this.coronas },
    bg: 'img/bg_outbreak.jpg',
  },
  epidemic: {
    xAxis: 15,
    yAxis: 13,
    coronas: 40,
    size: '45px',
    get winAmount() { return this.xAxis * this.yAxis - this.coronas },
    bg: 'img/bg_epidemic.jpg',
  },
  pandemic: {
    xAxis: 30,
    yAxis: 16,
    coronas: 99,
    size: '35px',
    get winAmount() { return this.xAxis * this.yAxis - this.coronas },
    bg: 'img/bg_pandemic.jpg',
  },
};

const title = {
  idle: "img/title_idle.png",
  inPlay: 'img/title_inPlay.png',
  lose: 'img/title_lose.png',
  win: 'img/title_win.png',
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
]

/*----- app's state (variables) -----*/
let difficulty;
let board;
let occupiedSquares;
let currentEl;
let score;
let elapsedTime;

/*----- cached element references -----*/
let unoccupied = $('.square > p:contains("0")');

/*----- event listeners -----*/
$('#difficulty-selector').change(init);
$('#reset').on('click', init);
$('#corona-field').on('mousedown', '.square', clickHandle);
$('#corona-field').on('contextmenu', '.square', function () { return false });
$(window).on('keydown', gameCheat);

/*----- functions -----*/

function init() {
  score = 0;
  stopTimer();
  difficulty = $('#difficulty-selector').val();
  createBoard();
  render();
};

function createBoard() {
  occupiedSquares = [];
  $('.corona-field > div').remove();
  for (let y = 0; y < difficultyLookup[difficulty].yAxis; y++) {
    let newRow = $(`<div class='gameboard-row' id='row${y}'></div>`)
    $('#corona-field').append(newRow);
    for (let x = 0; x < difficultyLookup[difficulty].xAxis; x++) {
      let newSquare = $(`<div class='square covered' style="width:${difficultyLookup[difficulty].size}; height:${difficultyLookup[difficulty].size}" id='c${x}r${y}' col-id='${x}' row-id='${y}'><p class='prox-text'>0</p></div>`)
      $(`#row${y}`).append(newSquare);
    };
  };
  board = $('.square');
  plantCoronas();
};

function plantCoronas() {
  while (occupiedSquares.length < difficultyLookup[difficulty].coronas) {
    let xRan = Math.floor((Math.random() * (difficultyLookup[difficulty].xAxis - 0) + 0));
    let yRan = Math.floor((Math.random() * (difficultyLookup[difficulty].yAxis - 0) + 0));
    let $occupiedSquare = $(`#c${xRan}r${yRan}`);
    if (!($occupiedSquare.hasClass('occupied'))) {
      $occupiedSquare.addClass('occupied').removeClass('covered');
      occupiedSquares.push($occupiedSquare);
    };      
  }
  addNumbers();
};

function addNumbers() {
  proximity.forEach(function(coord) {
    occupiedSquares.forEach(function(occupiedSquare) {
      let colId = parseInt($(occupiedSquare).attr('col-id'));
      let rowId = parseInt($(occupiedSquare).attr('row-id'));
      prox = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
      let currentVal = parseInt($(prox).text()); 
        if (!($(prox).hasClass('occupied'))) {
          $(prox).html(`${currentVal += 1}`).addClass('proxCell');
        };
    });
  });
};

function clickHandle(event) {
  currentEl = $(event.target);
  if (score === difficultyLookup[difficulty].winAmount || score === -1) return;
  switch (event.which) {
    case 3:
      toggleMask();
      break;
    case 2:
      toggleQuestionMark();
      break;
    default:
      if ($(currentEl).hasClass('occupied')) {
        score = -1;
        render();
      } else {
          if (score === 0) {
            uncoverSquare();
            startTimer();
          } else {
            uncoverSquare();
          }
      } 
      break;
    }
}

function uncoverSquare() {
  if (($(currentEl).hasClass('covered')) && !($(currentEl).hasClass('proxCell'))) {
    $(currentEl).addClass('uncovered').removeClass('covered').removeClass('flagged').removeClass('question-mark');
    flood(currentEl);
  } else if (($(currentEl).hasClass('covered')) && ($(currentEl).hasClass('proxCell'))) {
    $(currentEl).addClass('uncovered').removeClass('covered').removeClass('flagged').removeClass('question-mark');
  };
  score = $('.uncovered').length;
  render();
};

function flood(origin) {
  let colId = parseInt($(origin).attr('col-id'));
  let rowId = parseInt($(origin).attr('row-id'));
  checkProx = $(`.square[col-id='${colId}'][row-id='${rowId}']`)
  proximity.forEach(function(coord) {
    checkProx = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
    if ($(checkProx).hasClass('covered')) {
      $(checkProx).addClass('uncovered').removeClass('covered').removeClass('flagged').removeClass('question-mark');
      checkProx = $(`.square[col-id='${colId + coord[0]}'][row-id='${rowId + coord[1]}']`)
      while (
        (parseInt($(checkProx).attr("col-id")) >= 0 && parseInt($(checkProx).attr("col-id")) <= difficultyLookup[difficulty].xAxis) &&
        (parseInt($(checkProx).attr("row-id")) >= 0 && parseInt($(checkProx).attr("row-id")) <= difficultyLookup[difficulty].yAxis) &&
        !($(checkProx).hasClass('occupied')) && !($(checkProx).hasClass('proxCell'))
      ) { 
        flood(checkProx)
      };
    };
  });
};

function startTimer() {
  elapsedTime = 0;
  timer = setInterval(function() {
    elapsedTime++;
    $('#timer').text(elapsedTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  $('#timer').text('0');
}

function toggleQuestionMark() {
  if (!($(currentEl).hasClass('uncovered')) && (!($(currentEl).hasClass('flagged')))) {
    $(currentEl).toggleClass('question-mark');
  }
}

function toggleMask() {
  if (!($(currentEl).hasClass('uncovered')) && (!($(currentEl).hasClass('question-mark')))) {
    $(currentEl).toggleClass('flagged');
  }
};

function gameCheat(event) {
  if (event.which === 192 || score != -1 || score < difficultyLookup[difficulty].winAmount) {
    $('.occupied').toggleClass('expose');
  }   
}

function render() {
  switch (score) {
    case difficultyLookup[difficulty].winAmount:
      $('#title').attr('src', title['win'])
      stopTimer();
      break;
    case -1:
      $('.occupied').addClass('expose');
      $('.flagged').removeClass('flagged');
      $('.question-mark').removeClass('question-mark');
      $('#title').attr('src', title['lose'])
      stopTimer();
      break;
    case 0:
      $('#title').attr('src', title['idle'])
      break;
    default:
      $('#title').attr('src', title['inPlay'])
      break;
  }

  $('body').css('background', `url(${difficultyLookup[difficulty].bg}) no-repeat bottom / cover`);
  $('#remaining-coronas').text(difficultyLookup[difficulty].coronas);
  $('.square > p:contains("0")').hide();
}

init();
/*----- constants -----*/
const difficultyLookup = {
  outbreak: {
    xAxis: 10,
    yAxis: 10,
    coronas: 10,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#9ACD32", //yellowgreen
  },
  epidemic: {
    xAxis: 15,
    yAxis: 13,
    coronas: 40,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#FF8C00", //darkorange
  },
  pandemic: {
    xAxis: 30,
    yAxis: 16,
    coronas: 99,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#FF4500", //orangered
  },
};

const squareEl = {
  occupied: {
    color: "red",
    image: "", // use background instead
  },
  uncover: {
    color: "lightgray",
    image: "",
  },
  available: {
    color: "green",
    image: "",
  },
  flagged: {
    color: "yellow",
    image: "",
  },
};

const emoji = {
  inPlay: "img/ejoji_inPlay.png",
  click: "img/emoji_active.png",
  lose: "img/ejoji_lose.png",
  win: "img/emoji_win.png",
};

const audioEl = {
  flagged: "",
  uncover: "",
  start: "",
  lose: "",
  win: "",
};

/*----- app's state (variables) -----*/
let difficulty = "epidemic";
let currentScore;
let board = [];

/*----- cached element references -----*/



/*----- event listeners -----*/
$('#difficulty-selector').change(changeDifficulty);
$('#reset').on('click', init);

/*----- functions -----*/

function init() {
  console.log('init');
  createBoard();
  render();
};

function createBoard() { //refactor here
  $('.corona-field > div').remove();
  for (let y = 0; y < difficultyLookup[difficulty].yAxis; y++) {
    let newRow = $(`<div class="gameboard-row" id="row${y}"></div>`)
    $('#corona-field').append(newRow);
    for (let x = 0; x < difficultyLookup[difficulty].xAxis; x++) {
      let squareEl = $(`<div class="square" id="c${x}r${y}"></div>`)
      $(`#row${y}`).append(squareEl);
    };
  };
};

function changeDifficulty() {
  difficulty = $('#difficulty-selector').val();
  init();
}

function render() {
  $('body').css('background-color', difficultyLookup[difficulty].color);
  $('#remaining-coronas').text(difficultyLookup[difficulty].coronas);
}

init();

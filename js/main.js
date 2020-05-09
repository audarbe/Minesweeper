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
const diffcultySelector = document.querySelector("#difficulty-selector");
const emojiBox = document.querySelector("#emoji")
const flagToggle = document.querySelector("#flag");


/*----- event listeners -----*/
document.querySelector("#difficulty-selector")
  .addEventListener("change", changeDifficulty);

document.querySelector("#reset")
  .addEventListener("click", init);

/*----- functions -----*/

function init() {

  createBoard();
  render();
}

function createBoard() { //refactor here
  $('.corona-field > div').remove(); //clear board
  for (let x = 0; x < difficultyLookup[difficulty].xAxis; x++) {
    const newRow = document.createElement('div');
    newRow.classList.add('row')
    document.querySelector('#corona-field').appendChild(newRow).setAttribute('id', `row${x}`);
    for (let y = 0; y < difficultyLookup[difficulty].yAxis; y++) {
      const newSquare = document.createElement('div');
      newSquare.classList.add('square')
      document.querySelector(`#row${x}`).appendChild(newSquare).setAttribute('id', `c${x}r${y}`)
    }
  }
}

function changeDifficulty() {
  difficulty = diffcultySelector.value;
  init();
}

function render() {
  document.querySelector("body").style.backgroundColor =
    difficultyLookup[difficulty].color;
  document.querySelector("#remaining-coronas").innerText =
    difficultyLookup[difficulty].coronas;
}

init();

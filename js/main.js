/*----- constants -----*/
const difficultyLookup = {
  outbreak: {
    axisX: 10,
    axisY: 10,
    coronas: 10,
    winAmount: this.axisX * this.axisY - this.coronas,
    color: "#9ACD32", //yellowgreen
  },
  epidemic: {
    axisX: 15,
    axisY: 13,
    coronas: 40,
    winAmount: this.axisX * this.axisY - this.coronas,
    color: "#FF8C00", //darkorange
  },
  pandemic: {
    axisX: 30,
    axisY: 16,
    coronas: 99,
    winAmount: this.axisX * this.axisY - this.coronas,
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
const remainingCoronas = document.querySelector("#remaining-coronas");
const emojiBox = document.querySelector("#emoji");
const timer = document.querySelector("#timer");
const flagToggle = document.querySelector("#flag");
const resetButton = document.querySelector("#reset");
const squareEls = Array.from(document.querySelectorAll("#coronaField > div"));

/*----- event listeners -----*/
diffcultySelector.addEventListener("change", changeDifficulty);
resetButton.addEventListener("click", init);

/*----- functions -----*/

function init() {
  console.log("init");
  render();
}

function createBoard() {}

function changeDifficulty() {
  difficulty = diffcultySelector.value;
  render();
}

function render() {
  document.querySelector("body").style.backgroundColor =
    difficultyLookup[difficulty].color;
  document.querySelector("#remaining-coronas").innerText =
    difficultyLookup[difficulty].coronas;
}

init();

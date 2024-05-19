//For converting Json file to object & set default null object value.
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

//For set default auto play status.
let autoPlaying = false;

//For store interval id.
let intervalID;

//For auto play.
const autoPlay = () => {
  if (!autoPlaying) {
    intervalID = setInterval(() => {
      const userSelect = computerMove();
      playGame(userSelect);
    }, 1000);
    autoPlaying = true;
  } else {
    clearInterval(intervalID);
    autoPlaying = false;
  }
};

//For button click result.
const rockButton = document.getElementById("rock-btn");
rockButton.addEventListener("click", () => playGame("rock"));
const paperButton = document.getElementById("paper-btn");
paperButton.addEventListener("click", () => playGame("paper"));
const scissorsButton = document.getElementById("scissors-btn");
scissorsButton.addEventListener("click", () => playGame("scissors"));

//For update score & result.
const playGame = (userSelect) => {
  let pcSelect = computerMove();
  if (userSelect === pcSelect) {
    score.ties += 1;
    document.getElementById("title").innerHTML = "Tie!";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "rock" && pcSelect === "paper") {
    score.losses += 1;
    document.getElementById("title").innerHTML = "You Lose";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "rock" && pcSelect === "scissors") {
    score.wins += 1;
    document.getElementById("title").innerHTML = "You Win!";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "paper" && pcSelect === "scissors") {
    score.losses += 1;
    document.getElementById("title").innerHTML = "You Lose!";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "paper" && pcSelect === "rock") {
    score.wins += 1;
    document.getElementById("title").innerHTML = "You Win!";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "scissors" && pcSelect === "rock") {
    score.losses += 1;
    document.getElementById("title").innerHTML = "You Lose!";
    scoreCard(userSelect, pcSelect);
  } else if (userSelect === "scissors" && pcSelect === "paper") {
    score.wins += 1;
    document.getElementById("title").innerHTML = "You Win!";
  }

  //For store score & result to local storage.
  localStorage.setItem("score", JSON.stringify(score));
};

//For computer select result.
const computerMove = () => {
  const randomNumber = Math.random();
  let pcSelect = "";
  if (randomNumber < 1 / 3 && randomNumber > 0) {
    pcSelect = "rock";
  } else if (randomNumber < 2 / 3 && randomNumber > 1 / 3) {
    pcSelect = "paper";
  } else if (randomNumber < 1 && randomNumber > 2 / 3) {
    pcSelect = "scissors";
  }
  return pcSelect;
};

//For display score result.
const scoreCard = (userSelect, pcSelect) => {
  document.getElementById("score-board").innerHTML = `wins: ${score.wins}, 
      ties: ${score.ties},
      losses: ${score.losses}`;

  //For display user selection & pc selection.
  document.getElementById(
    "selected"
  ).innerHTML = `You <img class="game-img" src="images/${userSelect}.png" alt="paper-image">
          Computer <img class="game-img" src="images/${pcSelect}.png" alt="paper-image">`;
};

//For reset score.
const clearScreen = () => {
  score.wins = 0;
  score.ties = 0;
  score.losses = 0;

  //For delete data form local storage.
  localStorage.removeItem("score");
  document.getElementById(
    "title"
  ).innerHTML = `wins: ${score.wins}, ties: ${score.ties}, losses: ${score.losses}`;
  document.getElementById("score-board").innerHTML = "";
  document.getElementById("selected").innerHTML = "";
};

//For show score card
const cardView = () =>
  (document.getElementById(
    "title"
  ).innerHTML = `wins: ${score.wins}, ties: ${score.ties}, losses: ${score.losses}`);

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

const handleChange = (value) => {
  const pcSelect = Math.random();
  let userSelect = value;
  let clickResult = "";
  if (pcSelect < 1 / 3 && pcSelect > 0) {
    clickResult = "Rock";
  } else if (pcSelect < 2 / 3 && pcSelect > 1 / 3) {
    clickResult = "Paper";
  } else if (pcSelect < 1 && pcSelect > 2 / 3) {
    clickResult = "Scissors";
  }

  const display = () => {
    document.getElementById(
      "pick"
    ).innerHTML = `You <img class="game-img" src="images/${userSelect}.png" alt="paper-image">
      Computer <img class="game-img" src="images/${clickResult}.png" alt="paper-image">`;

    document.getElementById("score-card").innerHTML = `wins: ${score.wins} 
      ties: ${score.ties} 
      losses: ${score.losses}`;
  };

  if (userSelect === clickResult) {
    score.ties += 1;
    document.getElementById("display").innerHTML = "Tie!";
    display();
  } else if (userSelect === "Rock" && clickResult === "Paper") {
    score.losses += 1;
    document.getElementById("display").innerHTML = "You Lose";
    display();
  } else if (userSelect === "Rock" && clickResult === "Scissors") {
    score.wins += 1;
    document.getElementById("display").innerHTML = "You Win!";
    display();
  } else if (userSelect === "Paper" && clickResult === "Scissors") {
    score.losses += 1;
    document.getElementById("display").innerHTML = "You Lose!";
    display();
  } else if (userSelect === "Paper" && clickResult === "Rock") {
    score.wins += 1;
    document.getElementById("display").innerHTML = "You Win!";
    display();
  } else if (userSelect === "Scissors" && clickResult === "Rock") {
    score.losses += 1;
    document.getElementById("display").innerHTML = "You Lose!";
    display();
  } else if (userSelect === "Scissors" && clickResult === "Paper") {
    score.wins += 1;
    document.getElementById("display").innerHTML = "You Win!";
    display();
  }
  localStorage.setItem("score", JSON.stringify(score));
};

const clearScreen = () => {
  score.wins = 0;
  score.ties = 0;
  score.losses = 0;

  localStorage.removeItem("score");
  document.getElementById(
    "display"
  ).innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`;
  document.getElementById("score-card").innerHTML = "";
  document.getElementById("pick").innerHTML = "";
};

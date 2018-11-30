$(".fa-lock").on("click", toggleLock);
$(".fa-lock-open").on("click", toggleLock);
$(".refresh-colors-btn").on("click", generateRandomColors);

const lockLog = {
  color1: "unlocked",
  color2: "unlocked",
  color3: "unlocked",
  color4: "unlocked",
  color5: "unlocked"
};

function generateRandomColors() {
  const colors = [];

  while (colors.length < 5) {
    colors.push(generateRandomHexCode());
  }
  for (let i = 1; i <= 5; i++) {
    if (lockLog[`color${i}`] === "unlocked") {
      $(`.color-${i}`).css("background-color", colors[i - 1]);
    }
  }
}

function generateRandomHexCode() {
  let hexCode = "#";

  while (hexCode.length < 7) {
    hexCode += generateRandomHexValue();
  }
  return hexCode;
}

function generateRandomHexValue() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  const randomIndex = Math.floor(Math.random() * 16);
  return values[randomIndex];
}

function toggleLock(e) {
  $(e.target).toggleClass("fa-lock-open");
  $(e.target).toggleClass("fa-lock");

  const colorIndex = $(e.target)
    .parent()
    .attr("class")
    .slice(-1);

  $(e.target).hasClass("fa-lock")
    ? (lockLog[`color${colorIndex}`] = "locked")
    : (lockLog[`color${colorIndex}`] = "unlocked");
}

generateRandomColors();

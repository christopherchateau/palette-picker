const toggleLock = e => {
  $(e.target).toggleClass("fa-lock-open");
  $(e.target).toggleClass("fa-lock");
};

const generateRandomValue = () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  const randomIndex = Math.floor(Math.random() * 16);
  return values[randomIndex];
};

const generateRandomHexCode = () => {
  let hexCode = ''

  while (hexCode.length < 6) {
    hexCode += generateRandomValue();
  }
  console.log(hexCode);
};

$(".fas").on("click", toggleLock);
generateRandomHexCode();

$(".fa-lock").on("click", toggleLock);
$(".fa-lock-open").on("click", toggleLock);
$(".refresh-colors-btn").on("click", generateRandomColors);
$(".save-palette-btn").on("click", savePalette);
$(".project-input").on("keyup", toggleProjectBtn);
$(".palette-input").on("keyup", togglePaletteBtn);

const lockLog = {
  color1: "unlocked",
  color2: "unlocked",
  color3: "unlocked",
  color4: "unlocked",
  color5: "unlocked"
};
const currentProjects = [];

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

async function loadStoredProjects() {
  const response = await fetch("api/v1/projects");
  const projects = await response.json();
  projects.forEach(project => {
    currentProjects.push(project);
    appendProjects(project);
    loadStoredColors(project.id);
  });
}

async function loadStoredColors(projectId) {
  const response = await fetch(`api/v1/projects/${projectId}/colors`);
  const colors = await response.json();
  colors.forEach(palette => appendColors(palette, projectId));
}

async function storeProject(projectName) {
  const response = await fetch("api/v1/projects/", {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ name: projectName }),
    headers: { "Content-Type": "application/json" }
  });
  // const project = await response.json();
  // console.log(project)
}

function savePalette() {


}

function togglePaletteBtn() {
  $(".palette-input").val() === ''
    ? $(".save-palette-btn").prop("disabled", true)
    : $(".save-palette-btn").prop("disabled", false);
}

function toggleProjectBtn() {
  $(".project-input").val() === ''
    ? $(".create-project-btn").prop("disabled", true)
    : $(".create-project-btn").prop("disabled", false);
}

function appendProjects(project) {
  $(".projects").append(`

    <section class="project">
      <h3 class="${project.id} project-name">${project.name}</h3>
    </section>
  `);
}

function appendColors(palette, projectId) {
  $(`.${projectId}`).append(`
  
    <div class="palette">
      <div class="palette-name-colors">
        <h5 class="palette-name">${palette.name}</h5>
        <section class="palette-colors">
          <div 
            class="palette-color-1" 
            style="background-color:${palette.color_1}">
          </div>
          <div 
            class="palette-color-2" 
            style="background-color:${palette.color_2}">
          </div>
          <div 
            class="palette-color-3" 
            style="background-color:${palette.color_3}">
          </div>
          <div 
            class="palette-color-4" 
            style="background-color:${palette.color_4}">
          </div>
          <div 
            class="palette-color-5"
            style="background-color:${palette.color_5}">
          </div>
        </section>
      </div>
      <i class="fas fa-trash"></i>
    </div>
  `);
}

generateRandomColors();
loadStoredProjects();
storeProject("test");

const createProject = (knex, project) => {
  return knex("projects")
    .insert(
      {
        id: project.id,
        name: project.name
      },
      "id"
    )
    .then(projectIds => {
      let colorPromises = project.colors.map(color => {
        return createColor(knex, {
          ...color,
          project_id: projectIds[0]
        });
      });
      return Promise.all(colorPromises);
    });
};

const createColor = (knex, color) => {
  return knex("colors").insert(color);
};

exports.seed = (knex, Promise) => {
  return knex("colors")
    .del()
    .then(() => knex("projects").del())
    .then(() => {
      const projPromises = palleteSeeds.map(project => {
        return createProject(knex, project);
      });

      return Promise.all(projPromises);
    })
    .then(() => console.log("Successfully seeded db"))
    .catch(error => console.log(`Error seeding data: ${error}`));
};

const palleteSeeds = [
  {
    id: 2,
    name: "project 2",
    colors: [
      {
        name: "sweet colors",
        color_1: "#228B22",
        color_2: "#98FB98",
        color_3: "#bb3a0a",
        color_4: "#444444",
        color_5: "#000004"
      }
    ]
  },
  {
    id: 1,
    name: "project 1",
    colors: [
      {
        name: "autumnal af",
        color_1: "#CD5C5C",
        color_2: "#DC143C",
        color_3: "#FFA07A",
        color_4: "#8B0000",
        color_5: "#FF8C00"
      },
      {
        name: "fav colors",
        color_1: "#000080",
        color_2: "#000011",
        color_3: "#00ff12",
        color_4: "#aa8833",
        color_5: "#22ffc6"
      }
    ]
  }
];
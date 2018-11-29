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
    id: 1,
    name: "project 1",
    colors: [
      {
        name: "sweet colors",
        color_1: "000000",
        color_2: "000001",
        color_3: "000002",
        color_4: "000003",
        color_5: "000004"
      }
    ]
  },
  {
    id: 2,
    name: "project 2",
    colors: [
      {
        name: "autumnal af",
        color_1: "000005",
        color_2: "000006",
        color_3: "000007",
        color_4: "000008",
        color_5: "000009"
      },
      {
        name: "fav colors",
        color_1: "000010",
        color_2: "000011",
        color_3: "000012",
        color_4: "000013",
        color_5: "000014"
      }
    ]
  }
];

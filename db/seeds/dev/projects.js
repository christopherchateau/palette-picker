exports.seed = function(knex, Promise) {
  return knex("projects")
    .del()
    .then(() => {
      return Promise.all([
        knex("projects")
          .insert({ id: 2, name: "project 1" }, 'id')
          .then(project => {
            return knex("colors").insert([
              {
                id: 1,
                project_id: 2,
                name: "autumnal af",
                color_1: "000000",
                color_2: "000001",
                color_3: "000002",
                color_4: "000003",
                color_5: "000004"
              }
            ]);
          })
          .then(() => console.log("seeding complete"))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

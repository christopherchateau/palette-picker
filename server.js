const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const database = require("knex")(config);

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 300);

app.get("/api/v1/projects", (request, response) => {
  database("projects")
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.post("/api/v1/projects", (request, response) => {
  const project = request.body;

  if (!project[name]) {
    response.status(422).json({ error: "Error: Must include a project name" });
  }

  database("projects")
    .insert(project, "id")
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] });
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
});

app.listen(app.get("port"), () => {
  console.log(`Palette Picker is running on ${app.get("port")}.`);
});

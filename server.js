const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const database = require("knex")(config);

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 3000);

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

  database("projects")
    .insert(project, "id")
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] });
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/v1/projects/:project_id/colors/", (request, response) => {
  const { project_id } = request.params;

  database("colors")
    .where("project_id", project_id)
    .select()
    .then(colors => {
      response.status(200).json(colors);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.post("/api/v1/projects/:project_id/colors/", (request, response) => {
  const colors = request.body;
  console.log(colors)
  database("colors")
    .insert(colors, "id")
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] });
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.listen(app.get("port"), () => {
  console.log(`Palette Picker is running on ${app.get("port")}.`);
});

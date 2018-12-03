const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const database = require("knex")(config);

app.use(bodyParser.json());
app.use(express.static("public"));
//directs express to public directory
app.set("port", process.env.PORT || 3000);
//sets the port to the environment, falls back to 3000 if environment is undefined

app.get("/api/v1/projects", (request, response) => {
  //get request endpoint
  database("projects")
    //find projects table
    .select()
    //select projects table
    .then(projects => {
      response.status(200).json(projects);
      //responds with projects obj
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
      //responds with error accordingly
    });
});

app.post("/api/v1/projects", (request, response) => {
  //post request endpoint
  const project = request.body;

  database("projects")
    //find projects table
    .insert(project, "id")
    //insert project in projects table with a unique id
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] });
      //responds with id obj
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
      //responds with error accordingly
    });
});

app.get("/api/v1/projects/:project_id/colors/", (request, response) => {
  //get request endpoint
  const { project_id } = request.params;
  //destructure the project id from the parameters of the request object
  database("colors")
    //find colors table
    .where("project_id", project_id)
    //find the color palette with the foreign id matching project_id
    .select()
    //select colors table
    .then(colors => {
      response.status(200).json(colors);
      //responds with colors obj
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
      //responds with error accordingly
    });
});

app.post("/api/v1/projects/:project_id/colors/", (request, response) => {
  //post request endpoint
  const colors = request.body;
  //assign the body of the reqest obj to a variable
  database("colors")
    //find colors table
    .insert(colors, "id")
    //insert palette in colors table with a unique id
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] });
      //responds with id obj
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
      //responds with error accordingly
    });
});

app.delete("/api/v1/colors/:palette_id", (request, response) => {
  //delete request endpoint
  const { palette_id } = request.params;
  //destructure the palette id from the parameters of the request object
  database("colors")
    //find colors table
    .where("id", palette_id)
    //find the colors with the foreign id matching project_id
    .del()
    //delete specified color palette
    .then(projectIds => {
      response.status(202).json({ id: projectIds[0] });
      //responds with colors obj
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
      //responds with error accordingly
    });
});

app.listen(app.get("port"), () => {
  //listen to the port assigned on line 10
  console.log(`Palette Picker is running on ${app.get("port")}.`);
});

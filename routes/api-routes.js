// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const db = require("../models");
const Answers = require("../api/Answers")

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting the answer the user has to guess
  app.get("/api/answers", function(req, res) {
    // Used to create the HTML to display to the users blanks for each letter they have to guess.
    const firstAnswer = new Answers("The Matrix");
    // Stores the html in the constant result
    const result = firstAnswer.createAnswerHtml();
    // Send the html to index.js, which will change index.html to display the html that is sent.
    return res.json(result)
  });

  // POST route for ...
  app.post("/api/answers", function(req, res) {
    const request = req.body;
    console.log(request)
    return res.json("test")
  });

};

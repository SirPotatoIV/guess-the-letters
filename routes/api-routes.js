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

  // Creates a new row in the database, which will contain all the info for a single round.
  app.get("/api/round", async function(req, res) {
    // The full thing the player has to guess. This will eventually come from an api
    const fullString = "The Matrix";
    // Every letter the user has to guess. Current idea is this will be used to check against. Still need to figure out how to create this string.
    const letterString = "aehimrtx";
    
    // tells the database to create this row in the table Rounds.
    try { 
      const response = await db.Rounds.create({
        answer: fullString, 
        allLetters: letterString
      })
      
      console.log("response from db", response)
      return res.json(response)
    }
    catch(err) { 
      console.log("creating round error: ", err)
    }

  });

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
    const {letterGuessed} = req.body;
   
    console.log(letterGuessed)
    return res.json("test")
  });

};

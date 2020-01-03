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
    function getNewAnswer(){


    }
    getNewAnswer()
    
    function createNewRow(){
      // Used later to make sure the character being checked is part of the alaphbet and not a special symbol.
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];    
      // The full thing the player has to guess. This will eventually come from an api
      const answer = "The Matrix";
      // Every letter the user has to guess. Current idea is this will be used to check against. Still need to figure out how to create this string.
      let lettersToGuess = "";
      // https://www.w3resource.com/javascript-exercises/javascript-function-exercise-16.php
      for(let i=0; i < answer.length; i++){
        const currentLetter = answer.charAt(i).toLowerCase();
        console.log(currentLetter)
        const letterCheck = letters.indexOf(currentLetter);
        const uniqLetterCheck = lettersToGuess.indexOf(currentLetter);
        if(uniqLetterCheck === -1 && letterCheck > 0){
          lettersToGuess = lettersToGuess + currentLetter;
        }
      }
      
      // tells the database to create this row in the table Rounds.
      try { 
        const response = await db.Rounds.create({
          answer: answer, 
          allLetters: lettersToGuess
        })
        
        // console.log("response from db", response)
        return res.json(response)
      }
      catch(err) { 
        console.log("creating round error: ", err)
      }
    }
    createNewRow()
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

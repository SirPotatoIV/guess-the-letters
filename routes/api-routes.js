// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const db = require("../models");
const Answers = require("../api/Answers")
const getAnswer = require("../api/getAnswer")

// Routes
// =============================================================
module.exports = function(app) {
  let answer = "";
  // Creates a new row in the database, which will contain all the info for a single round.
  app.get("/api/round", async function(req, res) {
    // Get an answer for the user to guess
    try{
      answer = await getAnswer();
    }
    catch(err){
      console.log("Error getting answer from omdb: ", err)
    }

    // Used later to make sure the character being checked is part of the alaphbet and not a special symbol.
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];    
    // Every letter the user has to guess. Current idea is this will be used to check against. Still need to figure out how to create this string.
    let lettersToGuess = "";
    // https://www.w3resource.com/javascript-exercises/javascript-function-exercise-16.php
    // console.log(answer.length)
    // Loops through answer and stores unique letters in lettersToGuess
    for(let i=0; i < answer.length; i++){
      // stores the current letter in the loop and makes it lowercase
      const currentLetter = answer.charAt(i).toLowerCase();
      // Checks to see if the current letter is actually a letter and not a special character
      const letterCheck = letters.indexOf(currentLetter);
      // Checks if the current letter isn't already in the string lettersToGuess
      const uniqLetterCheck = lettersToGuess.indexOf(currentLetter);
      // If the letter isn't in the string lettersToGuess and it is actually a letter, we store it in lettersToGuess
      if(uniqLetterCheck === -1 && letterCheck > 0){
        lettersToGuess = lettersToGuess + currentLetter;
      }
    }
    // tells the database to create this row in the table Rounds.
    let roundId = "";
    try { 
      const response = await db.Rounds.create({
        answer: answer, 
        allLetters: lettersToGuess
      })
      roundId = response.dataValues.id;
      // return res.json(response)
    }
    catch(err) { 
      console.log("creating round error: ", err)
    }
    // Used to create the HTML to display to the users blanks for each letter they have to guess.
    const currentRoundAnswer = new Answers(answer);
    // Stores the html in the constant result
    const roundHtml = currentRoundAnswer.createAnswerHtml();
    const roundStartData = {roundHtml, roundId}
    // Send the html to index.js, which will change index.html to display the html that is sent.
    return res.json(roundStartData)
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
  app.put("/api/answers", async function(req, res) {
    const {letterGuessed, roundId} = req.body;
    const currentRoundData = await db.Rounds.findOne({where: {id: roundId}})
    let {guessedLetters} = currentRoundData.toJSON();
    // If guessedLetters is something other than null, guessedLetters equals the already guessed letters, plus the new one.
    // ELSE, if guessedLetters is null, guessedLetters equals the letter that was guessed.
    guessedLetters = guessedLetters ? guessedLetters + letterGuessed: letterGuessed;
    db.Rounds.update(
      {guessedLetters: guessedLetters}, 
      {where:{id: roundId}}
      )
    console.log(letterGuessed, roundId, guessedLetters)

    return res.json(letterGuessed)
  });

};

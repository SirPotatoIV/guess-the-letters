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
      if(uniqLetterCheck === -1 && letterCheck >= 0){
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

  // Occurs every time the player guesses a letter. Front-end sends the guessed letter and the round id, which is the corresponding row in the database.
  app.put("/api/answers", async function(req, res) {
    // deconstructs what the front-end sent
    const {letterGuessed, roundId} = req.body;
    // gets all the data for the current round from the database
    const currentRoundData = await db.Rounds.findOne({where: {id: roundId}})
    // decostructs all the data from the round
    let {guessedLetters, allLetters, guessCount, answer, outcome} = currentRoundData.toJSON();
    // Checks if the guessed letter matches any of the letters in the answer, which are in the variable allLetters
    const checkGuess = allLetters.indexOf(letterGuessed);
    // All the letters in the alphabet, used for generating the html for the answer. Eventually need to store this in its own file because it is used in several places.
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];    
    // Stores the html that will be updated if the player guessed the word correctly
    let answerHtml = "";
    let guessCorrect = false;
    if(checkGuess >= 0){
      // If guessedLetters is something other than null, guessedLetters equals the already guessed letters, plus the new one.
      // ELSE, if guessedLetters is null, guessedLetters equals the letter that was guessed.
      guessedLetters = guessedLetters ? guessedLetters + letterGuessed: letterGuessed;
      // if checkGuess is equal to or greater than 0, that means the letter guessed is in the answer, therefore the guess is correct
      guessCorrect = true;
      for(let i=0; i < answer.length; i++){
        const character = answer[i].toLowerCase();
        const isLetter = letters.indexOf(character)
        const isGuessed = guessedLetters.indexOf(character);
        // if the current character is a letter and is a guessed letter
        if(isLetter >= 0 && isGuessed >= 0){
          answerHtml = answerHtml + `<div class="characterHolder knownLetter">${character}</div>`;  
        }
        // if the current character is a letter, but not guessed yet
        if(isLetter >= 0 && isGuessed < 0){
          answerHtml = answerHtml + `<div class="characterHolder unknownLetter">-</div>`;
        }
        // if the current character is not a letter
        if(isLetter < 0){
          answerHtml = answerHtml + `<div class="nonLetter characterHolder">${answer[i]}</div>`;
        }
      }
    }else {
      // This only occurs if guessCheck results in a -1, meaning the guessed letter is not one of the letters in the answer
      guessCorrect = false;
      // Only incrementing guess count if the guess is incorrect.
      guessCount = guessCount + 1;
    }
    // Decide if game should continue. If guess count reaches 8, the outcome will be set to failed. guess count only increases when the player guesses a letter that is not in the answer
    if(guessCount === 8){
      outcome = "failed";
    }
    // Currently have guessCorrect in the condition, because if there are no correctly guessed letters yet, then guessedLetters is null, which means it has no length and an error occurs.
    if(guessCorrect && allLetters.length === guessedLetters.length){
      outcome = "win";
    }
    // updates the current round data in the database
    await db.Rounds.update(
      {
        guessedLetters: guessedLetters,
        guessCount: guessCount
      }, 
      {where:{id: roundId}}
      )
      
      const updatedCurrentRound ={
        guessCount,
        answerHtml,
        guessCorrect,
        outcome,
      }
    return res.json(updatedCurrentRound)
  });
  
};

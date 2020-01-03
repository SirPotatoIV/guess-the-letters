const fs = require('fs');
const Letters = require('./Letters')

class Answers {
    
    constructor(answer) {
        // stores whatever the user must guess, the answer to the puzzle. Will most likely be a tv show or movie title.
        this.answer = answer;
    }
    
    createAnswerObject(){
        const answerArray = this.answer.split('');
        // console.log(answerArray)
        const answerCharacters = [];
        answerArray.map(function(character, index){
            console.log(character)
            if(character == /[A-Za-z]/){
                answerCharacters.push(new Letters(character, false));
            }else{
                answerCharacters.push(new Letters(character, true));
            }
        })
        console.log(answerCharacters[0])
        // loop through the string answerStr
        // -- For each character create a new object for that letter
        // -- Set the property Character to the current character.
        // -- If it is a letter, set is guessed to false. If non-letter, set to true
        // -- Store new object in array answer Characters
        // Write answerCharacters to a file using fs
    }

    createAnswerHtml(){
        // Stores the html that is created in the loop below
        let answerHtml = "";
        // stores the answer the user must guess. Will be a movie or tv show title.
        const answer = this.answer;
        // using for testing purposes to see what the database or omdb set to this js file.
        console.log(this.answer)
        // turns the answer into individual divs and creates the html to display on index.html
        for(let i=0; i < answer.length; i++){
            // used just to simplify the code so I didn't have to keep writing answer[i]
            const character = answer[i];
            // want to make letters black divs eventually and spaces or special characters visible since the user won't be guessing those
            if(character === " "){
                answerHtml = answerHtml + `<div class="nonLetter characterHolder">${character}</div>`;
            }else{
                answerHtml = answerHtml + `<div class="${character} characterHolder not-guessed">${character}</div>`;
            }
        }
        // returns the answerHtml, which is a bunch of blank divs or special characters in a div that sum up to the movie or show title the user must guess.
        return answerHtml
    }  
}

const newAnswer = new Answers('The Life of Pi');
newAnswer.createAnswerObject()

module.exports = Answers
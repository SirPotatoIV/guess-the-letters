const fs = require('fs');
const Letters = require('./Letters')

class Answers {
    
    constructor(answer) {
        // stores whatever the user must guess, the answer to the puzzle. Will most likely be a tv show or movie title.
        this.answer = answer;
    }

    createAnswerHtml(){
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];    
        // Stores the html that is created in the loop below
        let answerHtml = "";
        // stores the answer the user must guess. Will be a movie or tv show title.
        const answer = this.answer;
        // using for testing purposes to see what the database or omdb set to this js file.
        console.log(this.answer)
        // turns the answer into individual divs and creates the html to display on index.html
        for(let i=0; i < answer.length; i++){
            const character = answer[i].toLowerCase();
            const isLetter = letters.indexOf(character)
            // want to make letters black divs eventually and spaces or special characters visible since the user won't be guessing those
            if(isLetter < 0){
                answerHtml = answerHtml + `<div class="nonLetter characterHolder">${answer[i]}</div>`;
            }else{
                answerHtml = answerHtml + `<div class="characterHolder not-guessed">-</div>`;
            }
        }
        // returns the answerHtml, which is a bunch of blank divs or special characters in a div that sum up to the movie or show title the user must guess.
        return answerHtml
    }  
}

module.exports = Answers
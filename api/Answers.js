class Answers {
    constructor(answer) {
        this.answer = answer;
    }
    createAnswerHtml(){
        let answerHtml = "";
        const answer = this.answer;
        // console.log("create blanks worked!")
        for(let i=0; i < answer.length; i++){
            const character = answer[i];
            if(character === " " || `'`){
                answerHtml = answerHtml + `<div class="nonLetter">${answer[i]}</div>`;
            }else{
                answerHtml = answerHtml + `<div class="${answer[i]}">${answer[i]}</div>`;
            }
        }
        return answerHtml
        // console.log(answerHtml);
    }

    displayAnswerHtml(){
        const answerDisplayEl = document.getElementById("answerDisplay");
        console.log(answerDisplayEl);
    }

}

// const firstAnswer = new Answers("The Matrix");
// console.log(firstAnswer.answer)
// firstAnswer.displayAnswerHtml()

module.exports = Answers
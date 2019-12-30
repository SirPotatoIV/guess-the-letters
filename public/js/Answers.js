class Answers {
    constructor(answer) {
        this.answer = answer;
    }
    createBlanks(){
        console.log("create blanks worked!")
    }

}

const firstAnswer = new Answers("The Matrix");
// console.log(firstAnswer.answer)
firstAnswer.createBlanks()

module.exports = Answers
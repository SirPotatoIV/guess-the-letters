class Letters {
    constructor(letter) {
        this.letter = letter;
        this.isGuessed = false;
    }
}

const a = new Letters("a");
console.log(a.letter)

module.exports = Letters
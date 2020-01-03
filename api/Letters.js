class Characters {
    constructor(character, isGuessed) {
        this.character = character;
        this.isGuessed = isGuessed;
    }
}

const a = new Characters("a");
console.log(a.letter)

module.exports = Characters
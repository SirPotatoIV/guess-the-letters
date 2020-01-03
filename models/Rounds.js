const Sequelize = require('sequelize')
const Model = Sequelize.Model;

module.exports = function(sequelize, DataTypes) {
  class Rounds extends Model {}
  Rounds.init({
    // attributes
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    allLetters: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    guessedLetters: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    guessCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
      // allowNull defaults to true
    },
    outcome: {
      type: DataTypes.STRING,
      defaultValue: "pending"
      // allowNull defaults to true
    }
  }, {
    sequelize,
    modelName: 'Rounds'
    // options
  });
  Rounds.sync();
  return Rounds;
}
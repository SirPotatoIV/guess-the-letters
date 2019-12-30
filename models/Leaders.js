const Sequelize = require('sequelize')
const Model = Sequelize.Model;

module.exports = function(sequelize, DataTypes) {
  class Leaders extends Model {}
  Leaders.init({
    // attributes
    initials: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    sequelize,
    modelName: 'leaders'
    // options
  });
  Leaders.sync();
  return Leaders;
}
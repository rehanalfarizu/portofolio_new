const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING, // e.g., Beginner, Intermediate, Advanced
      allowNull: false
    }
  });

  return Skill;
};
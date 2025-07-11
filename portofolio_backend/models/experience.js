const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Experience = sequelize.define('Experience', {
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true // null means currently working
    },
    isCurrentJob: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Experience;
};
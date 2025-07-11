const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    demoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    technologies: {
      type: DataTypes.TEXT, // JSON string of technologies used
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active' // active, inactive, completed
    }
  });

  return Project;
};
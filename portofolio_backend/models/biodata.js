const { DataTypes } = require('sequelize');

// Ubah menjadi function yang menerima sequelize instance
module.exports = (sequelize) => {
  const Biodata = sequelize.define('Biodata', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Biodata;
};
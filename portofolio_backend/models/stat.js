const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stat = sequelize.define('Stat', {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true // Validasi format IP address
      }
    },
    userAgent: {
      type: DataTypes.TEXT, // TEXT untuk menampung user agent yang panjang
      allowNull: true
    },
    visitDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    device: {
      type: DataTypes.STRING,
      allowNull: true // mobile, desktop, tablet
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: true // chrome, firefox, safari, etc
    },
    os: {
      type: DataTypes.STRING,
      allowNull: true // windows, mac, linux, android, ios
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: true // URL referrer
    },
    pageVisited: {
      type: DataTypes.STRING,
      allowNull: true // halaman yang dikunjungi
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true // untuk tracking session
    },
    isUnique: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // unique visitor atau returning visitor
    }
  });

  return Stat;
};
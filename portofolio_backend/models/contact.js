module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        len: { args: [2, 255], msg: 'Name must be between 2 and 255 characters' }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Invalid email format' }
      }
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Subject is required' },
        len: { args: [5, 255], msg: 'Subject must be between 5 and 255 characters' }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Message is required' },
        len: { args: [5, 2000], msg: 'Message must be between 5 and 2000 characters' } // Diperkecil dari 10 ke 5
      }
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_replied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'contacts',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['created_at']
      },
      {
        fields: ['is_read']
      }
    ]
  });

  return Contact;
};
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'PARTNER', 'USER'),
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Booking, { foreignKey: 'user_id' });
  };

  return User;
};

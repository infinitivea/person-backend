module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Fitness', 'Auditorium', 'Meeting Room'),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: 'bookings',
      timestamps: false,
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Booking;
};

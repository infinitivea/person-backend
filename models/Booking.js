module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      reserve_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approve'),
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'bookings',
      timestamps: true,
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
  };

  return Booking;
};

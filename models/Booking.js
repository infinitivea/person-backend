module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reserve_date: {
        type: DataTypes.DATEONLY,
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
      status: {
        type: DataTypes.ENUM('Pending', 'Approve'),
        defaultValue: 'Pending',
      },
    },
    {
      tableName: 'bookings',
      timestamps: false,
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Partner, { foreignKey: 'partner_id' });
  };

  return Booking;
};

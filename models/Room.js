module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM('fitness', 'auditorium', 'meeting'),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('availability', 'reserved'),
        defaultValue: 'availability',
      },
    },
    {
      tableName: 'rooms',
      timestamps: false,
    }
  );

  Room.associate = (models) => {
    Room.hasMany(models.Booking, { foreignKey: 'room_id' });
  };

  return Room;
};

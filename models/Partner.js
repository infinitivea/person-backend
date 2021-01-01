module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    'Partner',
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
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_type: {
        type: DataTypes.ENUM('Fitness', 'Auditorium', 'Meeting Room'),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      closeDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      openTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      closeTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('Availability', 'Reserved'),
        defaultValue: 'Availability',
      },
    },
    {
      tableName: 'partners',
      timestamps: false,
    }
  );

  return Partner;
};

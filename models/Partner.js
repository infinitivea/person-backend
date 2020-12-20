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
      phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'partners',
      timestamps: false,
    }
  );

  return Partner;
};

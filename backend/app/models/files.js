module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define(
    "files",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      file: { type: DataTypes.TEXT, allowNull: false },
    },
    { freezeTableName: true }
  );

  Files.associate = (models) => {
    Files.belongsTo(models.entities);
  };

  return Files;
};

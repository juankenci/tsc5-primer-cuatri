module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('countries', {
    active: { type: DataTypes.BOOLEAN },
    
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    
    id:               { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true },
    name:             { type: DataTypes.STRING,   allowNull: false },
    abbreviatedName:  { type: DataTypes.STRING,   allowNull: false }
    
  }, { timestamps: false, freezeTableName: true });

  Country.associate = models => {
    Country.belongsTo(models.continents, {foreignKey: 'continentId'});
  };

  
  return Country;
};

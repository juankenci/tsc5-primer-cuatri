module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('provinces', {
    active: { type: DataTypes.BOOLEAN },
    
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    
    id:               { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true },
    name:             { type: DataTypes.STRING,   allowNull: false },
    abbreviatedName:  { type: DataTypes.STRING,   allowNull: false }
    
  }, { timestamps: false, freezeTableName: true });

  Province.associate = models => {
    Province.belongsTo(models.countries, {foreignKey: 'countryId'});
  };

  
  return Province;
};

module.exports = (sequelize, DataTypes) => {
  const Locality = sequelize.define('localities', {
    active: { type: DataTypes.BOOLEAN },
    
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    
    id:               { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true },
    name:             { type: DataTypes.STRING,   allowNull: false },
    abbreviatedName:  { type: DataTypes.STRING,   allowNull: false }

}, { timestamps: false, freezeTableName: true });

  Locality.associate = models => {
    Locality.belongsTo(models.districts, {foreignKey: 'districtId'});
  };

  
  return Locality;
};

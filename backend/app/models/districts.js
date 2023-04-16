module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('districts', {
    active: { type: DataTypes.BOOLEAN },
    
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    
    id:               { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true },
    name:             { type: DataTypes.STRING,   allowNull: false },
    abbreviatedName:  { type: DataTypes.STRING,   allowNull: false }

  }, { timestamps: false, freezeTableName: true });

  District.associate = models => {
    District.belongsTo(models.provinces, {foreignKey: 'provinceId'});
  };

  
  return District;
};

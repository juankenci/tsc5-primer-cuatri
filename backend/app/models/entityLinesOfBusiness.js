module.exports = (sequelize, DataTypes) => {
    const EntityLinesOfBusiness = sequelize.define('entityLinesOfBusiness', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        optionalText: { type: DataTypes.STRING, allowNull: true }

    }, { freezeTableName: true });

    EntityLinesOfBusiness.associate = models => {
        EntityLinesOfBusiness.belongsTo(models.entities, { foreignKey: 'entityId' });
        EntityLinesOfBusiness.belongsTo(models.linesOfBusiness, { foreignKey: 'lineOfBusinessId' });

        EntityLinesOfBusiness.belongsToMany(models.sublinesOfBusiness, { through: models.entitySubLinesOfBusiness });
    };


    return EntityLinesOfBusiness;
};
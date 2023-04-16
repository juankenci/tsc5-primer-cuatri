module.exports = (sequelize, DataTypes) => {
    const EntityLinesSublinesOfBusiness = sequelize.define('entityLinesSublinesOfBusiness', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
    }, { freezeTableName: true ,
        indexes: [
            {
                unique: true,
                fields: ['entityId', 'linesOfBusinessId', 'sublinesOfBusinessId']
            }
        ]
    });

    EntityLinesSublinesOfBusiness.associate = models => {
        EntityLinesSublinesOfBusiness.belongsTo(models.entities, { foreignKey: 'entityId' });
        EntityLinesSublinesOfBusiness.belongsTo(models.linesOfBusiness, { foreignKey: 'linesOfBusinessId' });
        EntityLinesSublinesOfBusiness.belongsTo(models.sublinesOfBusiness, { foreignKey: 'sublinesOfBusinessId' });
    };


    return EntityLinesSublinesOfBusiness;
};
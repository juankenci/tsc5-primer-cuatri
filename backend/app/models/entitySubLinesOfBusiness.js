module.exports = (sequelize, DataTypes) => {
    const EntitySubLinesOfBusiness = sequelize.define('entitySubLinesOfBusiness', {

        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        optionalText: { type: DataTypes.STRING, allowNull: true }

    }, { freezeTableName: true });

    EntitySubLinesOfBusiness.associate = models => {
        EntitySubLinesOfBusiness.belongsTo(models.entityLinesOfBusiness, { foreignKey: 'entityLinesOfBusinessId' });
    };


    return EntitySubLinesOfBusiness;
};
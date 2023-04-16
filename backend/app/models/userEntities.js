module.exports = (sequelize, DataTypes) => {
    const UserEntities = sequelize.define('userEntities', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    }, { freezeTableName: true });

    UserEntities.associate = models => {
        UserEntities.belongsTo(models.users, { foreignKey: 'userId' });
        UserEntities.belongsTo(models.entities, { foreignKey: 'entityId' });
    };


    return UserEntities;
};
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'roles', {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            active: { type: DataTypes.BOOLEAN },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: true },
        }, { freezeTableName: true });

    return Role;
};
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        user: { type: DataTypes.STRING, allowNull: false },
        pass: { type: DataTypes.STRING, allowNull: false },
        createdAt: { type: DataTypes.DATE },
        updatedAt: { type: DataTypes.DATE }
    });

    User.associate = models => {
        User.belongsTo(models.roles, { foreignKey: "roleId" })

        User.belongsToMany(models.entities, { through: models.userEntities });
    };

    return User;
};
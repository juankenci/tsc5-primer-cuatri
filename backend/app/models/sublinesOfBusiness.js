module.exports = (sequelize, DataTypes) => {
    const SublineOfBusiness = sequelize.define('sublinesOfBusiness', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    }, { timestamps: false, freezeTableName: true });

    SublineOfBusiness.associate = models => {
        SublineOfBusiness.belongsTo(models.linesOfBusiness, { as: 'lineOfBusiness', foreignKey: 'lineOfBusinessId' });
    }

    return SublineOfBusiness;
};
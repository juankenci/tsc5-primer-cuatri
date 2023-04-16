module.exports = (sequelize, DataTypes) => {
    const LineOfBusiness = sequelize.define('linesOfBusiness', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    }, { timestamps: false, freezeTableName: true });

    LineOfBusiness.associate = models => {
        LineOfBusiness.belongsToMany(models.branches, { through: 'branchesLinesOfBusiness' });
    }

    return LineOfBusiness;
};
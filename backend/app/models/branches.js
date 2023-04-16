module.exports = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branches', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    }, { timestamps: false, freezeTableName: true });

    Branch.associate = models => {
        Branch.belongsToMany(models.categories, { through: 'branchesCategoriesSubcategories' });
        Branch.belongsToMany(models.subcategories, { through: 'branchesCategoriesSubcategories' });
        Branch.belongsToMany(models.linesOfBusiness, { through: 'branchesLinesOfBusiness' });

    }
    return Branch;
};
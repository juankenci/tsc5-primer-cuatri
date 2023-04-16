module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'categories', {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false }
        }, { timestamps: false, freezeTableName: true }
    );

    Category.associate = models => {
        Category.belongsToMany(models.branches, { through: 'branchesCategoriesSubcategories' });
        Category.belongsToMany(models.subcategories, { through: 'branchesCategoriesSubcategories' });
    }

    return Category;
};
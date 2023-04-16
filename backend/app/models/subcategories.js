module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define(
        'subcategories', {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false }
        }, { timestamps: false, freezeTableName: true }
    );

    Subcategory.associate = models => {
        Subcategory.belongsToMany(models.branches, { through: 'branchesCategoriesSubcategories' });
        Subcategory.belongsToMany(models.categories, { through: 'branchesCategoriesSubcategories' });
    }

    return Subcategory;
};
module.exports = (sequelize, DataTypes) => {
    const BranchCategorySubcategory = sequelize.define('branchesCategoriesSubcategories', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    }, { freezeTableName: true });

    return BranchCategorySubcategory;
};
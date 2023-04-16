module.exports = (sequelize, DataTypes) => {
    const BranchLineOfBusiness = sequelize.define('branchesLinesOfBusiness', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    }, { freezeTableName: true });

    return BranchLineOfBusiness;
};
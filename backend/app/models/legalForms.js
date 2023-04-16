module.exports = (sequelize, DataTypes) => {
    const LegalForms = sequelize.define(
        'legalForms', {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false }
        }, { timestamps: false, freezeTableName: true }
    );

    return LegalForms;
};
module.exports = (sequelize, DataTypes) => {
    const Continent = sequelize.define('continents', {
        active: { type: DataTypes.BOOLEAN },

        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
        

        id:     { type: DataTypes.INTEGER,  autoIncrement: true, primaryKey: true },
        name:   { type: DataTypes.STRING,   allowNull: false }
    }, { timestamps: false, freezeTableName: true });


    return Continent;
};
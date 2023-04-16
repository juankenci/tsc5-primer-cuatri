module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('entities', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        recoveryDate: { type: DataTypes.DATE, allowNull: true },
        goodsAndServices: { type: DataTypes.STRING, allowNull: false },
        startDate: { type: DataTypes.DATE, allowNull: true },
        street: { type: DataTypes.STRING, allowNull: false },
        streetNumber: { type: DataTypes.STRING, allowNull: false },
        betweenStreets: { type: DataTypes.STRING, allowNull: false },
        neighborhood: { type: DataTypes.STRING, allowNull: false },
        latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
        longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
        workersNumber: { type: DataTypes.INTEGER, allowNull: true},
        womenNumber: { type: DataTypes.INTEGER, allowNull: true},
        menNumber: { type: DataTypes.INTEGER, allowNull: true},
        paidWorkersNumber: { type: DataTypes.INTEGER, allowNull: true},
        volunteerWorkersNumber: { type: DataTypes.INTEGER, allowNull: true},
        assistsNumber: { type: DataTypes.INTEGER, allowNull: true},
        physicalSpaceSituation: { type: DataTypes.STRING, allowNull: true },
        propertySituation: { type: DataTypes.STRING, allowNull: true },
        baseOrganization: { type: DataTypes.STRING, allowNull: true },
        subsidy: { type: DataTypes.STRING, allowNull: true },
        website: { type: DataTypes.STRING, allowNull: true },
        relatedLinks: { type: DataTypes.STRING, allowNull: true },
        additionalInformation: { type: DataTypes.STRING, allowNull: true },
        referer: { type: DataTypes.STRING, allowNull: true },
        cellphone: { type: DataTypes.STRING, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        otherWorkersNumber: { type: DataTypes.INTEGER, allowNull: true },
        joints: { type: DataTypes.INTEGER, allowNull: true },
    })

    Entity.associate = models => {
        Entity.belongsTo(models.continents, { foreignKey: 'continentId' });
        Entity.belongsTo(models.countries, { foreignKey: 'countryId' });
        Entity.belongsTo(models.provinces, { foreignKey: 'provinceId' });
        Entity.belongsTo(models.districts, { foreignKey: 'districtId' });
        Entity.belongsTo(models.localities, { foreignKey: 'localityId' });

        Entity.belongsTo(models.branches, { foreignKey: 'branchId' });
        Entity.belongsTo(models.categories, { foreignKey: 'categoryId' });
        Entity.belongsTo(models.subcategories, { foreignKey: 'subcategoryId' });
        Entity.belongsTo(models.legalForms, { foreignKey: 'legalFormId' });

        Entity.belongsToMany(models.linesOfBusiness, { through: models.entityLinesSublinesOfBusiness });
        Entity.belongsToMany(models.sublinesOfBusiness, { through: models.entityLinesSublinesOfBusiness });
        Entity.hasMany(models.entityLinesSublinesOfBusiness, {as: 'linesSublinesOfBusiness'});
        Entity.hasMany(models.files)
        //contactos tiene que ser una nueva tabla de los contactos de una entity
        // campos DATOS CONTACTOS de la planilla de google

        //tabla con información adicional de las entidades
        // campo AMPLIACION DE INFORMACIÓN de la planilla de google

        // planilla de drive de referencia
        //https://docs.google.com/spreadsheets/d/1Q2RyBrfwocQcTUZYS0yMvOGy4IxoCOfmMxLTHumMtqE/edit#gid=391725620

    };



    return Entity;
};
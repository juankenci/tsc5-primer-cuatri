const categories = require('../seeds/categories');
const subcategories = require('../seeds/subcategories');
const businessAreas = require('../seeds/businessAreas');
const unities = require('../seeds/unities');
const subunities = require('../seeds/subunities');

// const Category = require('../../app/models').categories;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            user: { type: Sequelize.STRING, allowNull: false },
            pass: { type: Sequelize.STRING, allowNull: false },
            admin: { type: Sequelize.BOOLEAN, allowNull: false },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE }
        });
        await queryInterface.createTable('categories', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            descripcion: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('subcategories', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            descripcion: { type: Sequelize.STRING, allowNull: false },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'categories',
                    key: 'id'
                }
            }
        });
        await queryInterface.createTable('unities', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            descripcion: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('subunities', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            descripcion: { type: Sequelize.STRING, allowNull: false },
            unityId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'unities',
                    key: 'id'
                }
            }
        });
        await queryInterface.createTable('businessAreas', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            descripcion: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('entities', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            nombre: { type: Sequelize.STRING, allowNull: false },
            nombre_antigua_firma: { type: Sequelize.STRING, allowNull: false },
            fecha_recuperacion: { type: Sequelize.DATE, allowNull: true },
            bienes_servicios: { type: Sequelize.STRING, allowNull: false },
            forma_juridica: { type: Sequelize.STRING, allowNull: false },
            fecha_inicio: { type: Sequelize.DATE, allowNull: true },
            calle: { type: Sequelize.STRING, allowNull: false },
            numero: { type: Sequelize.STRING, allowNull: false },
            entre_calle1: { type: Sequelize.STRING, allowNull: false },
            entre_calle2: { type: Sequelize.STRING, allowNull: false },
            barrio: { type: Sequelize.STRING, allowNull: false },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                }
            },
            subcategoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'subcategories',
                    key: 'id'
                }
            },
            unityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'unities',
                    key: 'id'
                }
            },
            subunityId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'subunities',
                    key: 'id'
                }
            },
            businessAreaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'businessAreas',
                    key: 'id'
                }
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
            deletedAt: { type: Sequelize.DATE }
        });

        
        await queryInterface.bulkInsert('categories', categories);
        await queryInterface.bulkInsert('subcategories', subcategories);
        await queryInterface.bulkInsert('businessAreas', businessAreas);
        await queryInterface.bulkInsert('unities', unities);
        await queryInterface.bulkInsert('subunities', subunities);
    },

    down: async queryInterface => {
        
        await queryInterface.dropTable('entities');
        await queryInterface.dropTable('businessArea');
        await queryInterface.dropTable('subcategories');
        await queryInterface.dropTable('categories');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('unities');
        await queryInterface.dropTable('subunities');
    }
};
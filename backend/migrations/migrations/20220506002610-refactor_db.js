const branches = require('../seeds/branches');
const categories = require('../seeds/categories_20220506002610');
const subcategories = require('../seeds/subcategories_20220506002610');
const branchesCategoriesSubcategories = require('../seeds/branchesCategoriesSubCategories');
const legalForms = require('../seeds/legalForms');
const linesOfBusiness = require('../seeds/linesOfBusiness');
const sublinesOfBusiness = require('../seeds/sublinesOfBusiness');
const branchesLinesOfBusiness = require('../seeds/branchesLinesOfBusiness');
const roles = require('../seeds/roles');


//seeds de tablas anteriores para el down
const unities = require('../seeds/unities');
const subunities = require('../seeds/subunities');
const categoriesDown = require('../seeds/categories');
const subcategoriesDown = require('../seeds/subcategories');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {
            //Borra los registros precargados que se relacionan con los datos a modificar de las tablas
            await queryInterface.bulkDelete('entities', null, { transaction: t })

            // Borra las columas de las tablas existentes que hgacen referencias a tablas que no se usan mas
            await queryInterface.removeColumn('entities', 'forma_juridica', { transaction: t });
            await queryInterface.removeColumn('entities', 'categoryId', { transaction: t });
            await queryInterface.removeColumn('entities', 'subcategoryId', { transaction: t });
            await queryInterface.removeColumn('entities', 'unityId', { transaction: t });
            await queryInterface.removeColumn('entities', 'subunityId', { transaction: t });
            await queryInterface.removeColumn('entities', 'businessAreaId', { transaction: t });

            //Modifica las columnas de las tablas existentes
            await queryInterface.removeColumn('categories', 'descripcion', { transaction: t });
            await queryInterface.addColumn('categories', 'name', { type: Sequelize.STRING, allowNull: true }, { transaction: t });

            await queryInterface.removeColumn('subcategories', 'descripcion', { transaction: t });
            await queryInterface.removeColumn('subcategories', 'categoryId', { transaction: t });
            await queryInterface.addColumn('subcategories', 'name', { type: Sequelize.STRING, allowNull: true }, { transaction: t });

            //Borra las tablas que no se utilizan mas
            await queryInterface.dropTable('businessAreas', { transaction: t });
            await queryInterface.dropTable('subunities', { transaction: t });
            await queryInterface.dropTable('unities', { transaction: t });

            //Cracion de nuevas tablas
            await queryInterface.createTable('branches', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                name: { type: Sequelize.STRING, allowNull: false }
            }, { transaction: t });

            await queryInterface.bulkInsert('branches', branches, { transaction: t });

            await queryInterface.createTable('legalForms', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                name: { type: Sequelize.STRING, allowNull: false }
            }, { transaction: t });

            await queryInterface.bulkInsert('legalForms', legalForms, { transaction: t });

            await queryInterface.createTable('linesOfBusiness', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                name: { type: Sequelize.STRING, allowNull: false }
            }, { transaction: t });

            await queryInterface.bulkInsert('linesOfBusiness', linesOfBusiness, { transaction: t });

            await queryInterface.createTable('sublinesOfBusiness', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                name: { type: Sequelize.STRING, allowNull: false },
                lineOfBusinessId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'linesOfBusiness', key: 'id' } }
            }, { transaction: t });

            await queryInterface.bulkInsert('sublinesOfBusiness', sublinesOfBusiness, { transaction: t });

            await queryInterface.createTable('roles', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                name: { type: Sequelize.STRING, allowNull: false },
                active: { type: Sequelize.BOOLEAN, allowNull: false },
                createdAt: { type: Sequelize.DATE },
                updatedAt: { type: Sequelize.DATE }
            }, { transaction: t });

            await queryInterface.bulkInsert('roles', roles, { transaction: t });

            //Borra los registros precargados en la tabla para luego correr el nuevo seed
            await queryInterface.bulkDelete('subcategories', null, { transaction: t })
            await queryInterface.bulkDelete('categories', null, { transaction: t })

            //Carga los seeds nuevos de tablas existentes
            await queryInterface.bulkInsert('categories', categories, { transaction: t });
            await queryInterface.bulkInsert('subcategories', subcategories, { transaction: t });

            await queryInterface.createTable('branchesCategoriesSubcategories', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                branchId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'branches',
                        key: 'id'
                    }
                },
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
                    allowNull: true,
                    references: {
                        model: 'subcategories',
                        key: 'id'
                    }
                },
                createdAt: { type: Sequelize.DATE, allowNull: false },
                updatedAt: { type: Sequelize.DATE, allowNull: false },
                deletedAt: { type: Sequelize.DATE }
            }, { transaction: t });

            await queryInterface.bulkInsert('branchesCategoriesSubcategories', branchesCategoriesSubcategories, { transaction: t });

            await queryInterface.createTable('branchesLinesOfBusiness', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                branchId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'branches',
                        key: 'id'
                    }
                },
                linesOfBusinessId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'linesOfBusiness',
                        key: 'id'
                    }
                },
                createdAt: { type: Sequelize.DATE, allowNull: false },
                updatedAt: { type: Sequelize.DATE, allowNull: false },
                deletedAt: { type: Sequelize.DATE }
            }, { transaction: t });

            await queryInterface.bulkInsert('branchesLinesOfBusiness', branchesLinesOfBusiness, { transaction: t });
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {

            await queryInterface.addColumn('entities', 'businessAreaId', { type: Sequelize.STRING }, { transaction: t });
            await queryInterface.addColumn('entities', 'forma_juridica', { type: Sequelize.STRING }, { transaction: t });
            await queryInterface.addColumn('entities', 'categoryId', { type: Sequelize.STRING }, { transaction: t });
            await queryInterface.addColumn('entities', 'subcategoryId', { type: Sequelize.STRING }, { transaction: t });
            await queryInterface.addColumn('entities', 'unityId', { type: Sequelize.STRING }, { transaction: t });
            await queryInterface.addColumn('entities', 'subunityId', { type: Sequelize.STRING }, { transaction: t });

            //cambios de las tablas existentes
            await queryInterface.addColumn('categories', 'descripcion', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
            queryInterface.removeColumn('categories', 'name', { transaction: t });

            await queryInterface.addColumn('subcategories', 'descripcion', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
            await queryInterface.addColumn('subcategories', 'categoryId', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
            queryInterface.removeColumn('subcategories', 'name', { transaction: t });

            //Crea las tablas borradas que no se utilizan mas
            await queryInterface.createTable('businessAreas', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                descripcion: { type: Sequelize.STRING, allowNull: true }
            }, { transaction: t });

            await queryInterface.createTable('unities', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                descripcion: { type: Sequelize.STRING, allowNull: false }
            }, { transaction: t });

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
            }, { transaction: t });

            //Borra las tablas nuevas creadas+
            await queryInterface.dropTable('branchesCategoriesSubcategories', { transaction: t });
            await queryInterface.dropTable('branchesLinesOfBusiness', { transaction: t });

            await queryInterface.dropTable('branches', { transaction: t });
            await queryInterface.dropTable('legalForms', { transaction: t });
            await queryInterface.dropTable('sublinesOfBusiness', { transaction: t });
            await queryInterface.dropTable('linesOfBusiness', { transaction: t });
            await queryInterface.dropTable('roles', { transaction: t });

            //Borra los registros precargados en la tabla para luego correr el seed que estaba antes
            await queryInterface.bulkDelete('subcategories', null, { transaction: t });
            await queryInterface.bulkDelete('categories', null, { transaction: t });

            //Carga los seeds viejos de tablas existentes
            await queryInterface.bulkInsert('categories', categoriesDown, { transaction: t });
            await queryInterface.bulkInsert('subcategories', subcategoriesDown, { transaction: t });
            await queryInterface.bulkInsert('unities', unities, { transaction: t });
            await queryInterface.bulkInsert('subunities', subunities, { transaction: t });


        });


    }
};
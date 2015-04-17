/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('iteration', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdby: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        createddate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        editdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        }
    });
};

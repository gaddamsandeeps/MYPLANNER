/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('team', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leadid: {
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
        },
        createdby: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        }
    });
};

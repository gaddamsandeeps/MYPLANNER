/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('project', {
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
        startdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        teamid: {
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
        createdby: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        editedby: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        category: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: '2'
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        }
    });
};

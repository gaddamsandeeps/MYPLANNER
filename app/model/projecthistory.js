/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('projecthistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,
        },
        editdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdby: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        editedby: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        category: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });
};

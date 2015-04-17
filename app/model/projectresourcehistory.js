/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('projectresourcehistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectresourceid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        userid: {
            type: DataTypes.INTEGER(11),
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
        billable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        sowno: {
            type: DataTypes.STRING,
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
        createddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        editdate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    });
};

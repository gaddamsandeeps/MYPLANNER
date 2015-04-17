/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('projectresource', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        billable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sowno: {
            type: DataTypes.STRING,
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
        createddate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        editdate: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    });
};

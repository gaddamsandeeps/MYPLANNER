/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('loghistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        logid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        iteration: {
            type: DataTypes.INTEGER(20),
            allowNull: true,
        },
        story: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        task: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        storystatus: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        plannedstartdate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        plannedenddate: {
            type: DataTypes.DATE,
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
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        loggeduser: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
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
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        }
    });
};

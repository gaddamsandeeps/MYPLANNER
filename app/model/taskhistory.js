/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('taskhistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        taskid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        storyid: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hours: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
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
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });
};

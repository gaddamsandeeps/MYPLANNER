/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('storyhistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        storyid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        iteration: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.INTEGER(11),
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

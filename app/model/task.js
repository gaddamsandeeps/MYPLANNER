/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('task', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        storyid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
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
            type: DataTypes.INTEGER(11),
            allowNull: false,
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

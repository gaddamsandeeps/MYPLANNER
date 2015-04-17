/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('myprojects', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        projectid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        teamid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
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

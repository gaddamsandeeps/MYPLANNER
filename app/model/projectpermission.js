/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('projectpermission', {
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '1'
        }
    });
};

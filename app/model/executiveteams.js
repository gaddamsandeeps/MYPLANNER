/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('executiveteams', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        teamid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        createdby: {
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

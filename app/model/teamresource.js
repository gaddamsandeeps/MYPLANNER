/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('teamresource', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        teamid: {
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
        }
    });
};

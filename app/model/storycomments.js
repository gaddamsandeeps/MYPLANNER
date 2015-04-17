/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('storycomments', {
        id: {
            type: DataTypes.INTEGER(11),
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
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        createddate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });
};

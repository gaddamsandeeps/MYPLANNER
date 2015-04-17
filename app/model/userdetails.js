/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('userdetails', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        roleid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accesslevel: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '1'
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
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

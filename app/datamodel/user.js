/**
 * user object
 */
var User = function(id, name, password, fullName, sex, contactNo, teamName) {
    this.id;
    this.name;
    this.password;
    this.fullName;
    this.sex;
    this.contactNo;
    this.teamName;
};

User.prototype.getUser = function() {
    return this;
}
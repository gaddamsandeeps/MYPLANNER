/**
 * user object
 */
var User = function(id, name, password, fullName, contactNo, teamName) {
    this.id;
    this.name;
    this.password;
    this.fullName;
    this.contactNo;
    this.teamName;
};

User.prototype.getUser = function() {
    return this;
}

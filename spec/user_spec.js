var userService = require("../app/services/user-service");

describe("common", function() {
	it('should run with those environment variables', function() {
		expect(process.env.ENVTYPE).toBe('dev');
	});
});

describe("user-authenticated", function() {
 it("validate admin user", function(done) {
  userService.getUser(1, function(user) {   
   expect(user.username).toEqual('admin@nisum.com'); 
   done();
  });  
 });
});
/**
* 用户实例
*/
function User(){};

User.prototype.setNme = function(_name){
	this.name = _name;
}
User.prototype.say = function(){
	console.log("hello " + this.name);
}

var user = new User();
user.setNme("stepday");
user.say();

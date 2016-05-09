var Keyboard = function()
{
	var self = this;
	 window.addEventListener('keydown', 
	 							function(evt)
	 							{
	 								self.onKeyDown(evt);
	 							},
	 							false
	 							);

	 window.addEventListener('keyup', 
	 							function(evt)
	 							{
	 								self.onKeyUp(evt);
	 							},
	 							false
	 							);

	 this.keyListeners = new Array();
	 this.keys 		   = new Array();


	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	this.KEY_ENTER = 13;


	this.KEY_A = 65;		//movement commands
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;

	this.KEY_A = 65;		//LETTER COMMANDS
	this.KEY_B = 66;
	this.KEY_C = 67;
	this.KEY_D = 68;
	this.KEY_E = 69;
	this.KEY_F = 70;
	this.KEY_G = 71;
	this.KEY_H = 72;
	this.KEY_I = 73;
	this.KEY_J = 74;
	this.KEY_K = 75;
	this.KEY_L = 76;
	this.KEY_M = 77;
	this.KEY_N = 78;
	this.KEY_O = 79;
	this.KEY_P = 80;
	this.KEY_Q = 81;
	this.KEY_R = 82;
	this.KEY_S = 83;
	this.KEY_T = 84;
	this.KEY_U = 85;
	this.KEY_V = 86;
	this.KEY_W = 87;
	this.KEY_X = 88;
	this.KEY_Y = 89;
	this.KEY_Z = 90;

	this.KEY_SHIFT = 16;
	this.KEY_CTRL = 17;
	this.KEY_BKSPC = 8;
};

Keyboard.prototype.onKeyDown = function(evt){
	this.keys[evt.keyCode] = true;
};

Keyboard.prototype.onKeyUp = function(evt){
	this.keys[evt.keyCode] = false;

};

Keyboard.prototype.isKeyDown = function(keyCode){
	return this.keys[keyCode];
};


var RPM=function() {
  var newRPM={};

//STACK
//TODO: use a pre existing stack object
  newRPM.stack=[];
  newRPM.Push = function(value) {
    this.stack.push(value);
  };
  newRPM.Pop = function() {
    return this.stack.pop();
  };
  newRPM.Peek = function( distance ) {
    return this.stack[this.stack.length-1 - distance];
  };
  newRPM.Swap = function() {
    var a=this.Pop();
    var b=this.Pop();
    this.Push(a);
    this.Push(b);
  };

//RAM
  newRPM.ram={};
  newRPM.Get = function( key ){
    return this.ram[key];
  };
  newRPM.Set = function( key, value ){
    this.ram[key]=value;
  };

//SCRIPT
  newRPM.script='';
  newRPM.splitScript=[];
  newRPM.current=0;

//OPERATORS
  newRPM.operators = {
    //Basic stuff
    '+' : function() { // also can concat
      if(typeof this.Peek(0) === 'string'){
        this.Swap();
        this.Push(this.Pop()+' '+this.Pop());
      } else {
        this.Push(this.Pop()+this.Pop());
      }
    },
    '-' : function() {
      this.Swap();
      this.Push(this.Pop()-this.Pop());
    },
    '/' : function() {
      this.Swap();
      this.Push(this.Pop()*this.Pop());
    },
    '*' : function() {
      this.Swap();
      this.Push(this.Pop()*this.Pop());
    },

    //Stack
    'swap' : function() {
      this.Swap();
    },

    //Ram
    'get' : function() {
      this.Push(this.Get(this.Pop()));
    },
    'set' : function() {
      this.Set(this.Pop(),this.Pop());
    },

    //Flow
    'goto' : function() {
      this.current=this.Pop()-1;
    },
    'call' : function() {
      this.Push(current);
      this.current=this.Pop()-1;
    },
//test
    'log' : function() {
      console.log(this.Pop());
    }
  };

//PUBLIC METHODS
  newRPM.Step=function(iterations){
    for( var i=0; i<iterations; i++ ){
      var value=this.splitScript[this.current];
      if(this.operators[value]!==undefined){
        this.operators[value].call(this);
      } else {
        if(!isNaN(value)){
          value= +value;
        }
        this.Push(value);
      }
      this.current++;
      this.current%=this.splitScript.length;
    }
  };
  newRPM.Compile=function(newScript) {
    this.script=newScript;
    this.splitScript=newScript.split(' ');
  };
  return newRPM;
};

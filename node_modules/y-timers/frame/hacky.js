var Resolver = require('y-resolver'),
    
    now = require('../now.js'),
    resolver;

function resolve(){
  var rsv = resolver;
  
  resolver = null;
  rsv.accept(now());
}

module.exports = function(){
  
  if(!resolver){
    resolver = new Resolver();
    setTimeout(resolve,16);
  }
  
  return resolver.yielded;
};



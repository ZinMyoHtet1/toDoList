var Resolver = require('y-resolver'),

    raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame,
    resolver;

function resolve(ts){
  var rsv = resolver;
  
  resolver = null;
  rsv.accept(ts);
}

module.exports = function(){
  
  if(!resolver){
    resolver = new Resolver();
    raf(resolve);
  }
  
  return resolver.yielded;
};


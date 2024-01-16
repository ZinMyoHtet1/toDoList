var Resolver = require('y-resolver');

function resolve(resolver,v){
  resolver.accept(v);
}

module.exports = function(t,v){
  var resolver = new Resolver();

  setTimeout(resolve,Math.max(t - 1,0),resolver,v);
  return resolver.yielded;
};

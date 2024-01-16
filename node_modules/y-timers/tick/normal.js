var Resolver;

function resolve(resolver,v){
  resolver.accept(v);
}

module.exports = function(v){
  var resolver = new Resolver();

  setImmediate(resolve,resolver,v);
  return resolver.yielded;
};

Resolver = require('y-resolver');

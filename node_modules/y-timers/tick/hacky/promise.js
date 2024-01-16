var Resolver;

module.exports = function(v){
  var resolver = new Resolver();
  Promise.resolve().then(() => resolver.accept(v));
  return resolver.yielded;
};

Resolver = require('y-resolver');

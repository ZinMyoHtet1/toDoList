var ticker = new Image(),
    state = true,
    rsvs = [],
    values = [],
    Resolver;

ticker.onerror = function(){
  var rs = rsvs.slice(),
      rsv;

  rsvs = [];
  while(rsv = rs.shift()) rsv.accept(values.shift());
};

module.exports = function(v){
  var resolver = new Resolver();

  rsvs.push(resolver);
  values.push(v);

  if(state) ticker.src = 'data:,0';
  else ticker.src = 'data:,1';

  state = !state;

  return resolver.yielded;
};

Resolver = require('y-resolver');

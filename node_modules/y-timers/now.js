var t0;

if(global.process){
  
  t0 = process.hrtime();
  t0 = t0[0] * 1e3 + t0[1] * 1e-6;
  
  module.exports = function(){
    var t = process.hrtime();
    
    t = t[0] * 1e3 + t[1] * 1e-6;
    return t - t0;
  };
  
}else if(global.performance){
  
  t0 = performance.now();
  
  module.exports = function(){
    return performance.now() - t0;
  };
  
}else{
  
  t0 = Date.now();
  
  module.exports = function(){
    return Date.now() - t0;
  };
  
}

# Timers

## Sample usage

```javascript
var walk = require('y-walk'),
    
    wait = require('y-timers/wait'),
    tick = require('y-timers/tick'),
    frame = require('y-timers/frame');

walk(function*(){
  
  yield wait(100);
  console.log('100 msecs have passed');
  
  yield tick();
  console.log('A tick has passed');
  
  yield frame();
  console.log('A frame is about to be painted');
  
});
```

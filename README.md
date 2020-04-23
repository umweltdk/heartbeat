# Heartbeat
Simple heartbeat module for typescript

## Usage
```
import { Heartbeat } from  '@umweltdk/heartbeat';

const  h = new  Heartbeat(1000, () => {
	//callback
});

h.start();
...
h.stop();
```
---
`intervalDefinition` can be both of type number or string.
If number is used, the build-in function `setInterval` will be used.
In case of type string [cron](https://www.npmjs.com/package/cron) will be used, and the string must therefore be a valid cron string.

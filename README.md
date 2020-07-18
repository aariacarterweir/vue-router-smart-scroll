# vue-router-smart-scroll
A vue-router plugin that enables configurable recall of scroll positions when visiting routes.

### Environments
This plugin supports Vue version 2 and is written in ES6. You will need a transpiler to run this plugin on older browsers.

### Installation
```
yarn add vue-router-smart-scroll
npm install vue-router-smart-scroll
```

### Usage
"Install" this plugin to an existing router instance like so:

```js
import Router from 'vue-router';
import RouterSmartScroll from 'vue-router-smart-scroll';

const router = new Router({
    mode: 'history', // using history mode is helpful for automatic savedPosition support on browser back/forward
    routes: [], // whatever your routes are!
});

// Install & Configure Router Smart Scroll
RouterSmartScroll.install(router, {
    // options in here
});
```

### Options
```js
RouterSmartScroll.install(router, {
    // Exclude or Include all routes except ones whose parameters match an object
    // only one of the include or exclude options should be used at one time
    // use like so: exclude: { top: true } (and put params: { top: true } in your router-link :to)
    exclude: false,
    include: false,
    
    // The default position to scroll to if one cannot be recalled or if the route has been excluded.
    // It's usually best to leave this to 0, 0
    defaultPosition: { x: 0, y: 0 },
});
```

### Matching route parameters
Using the `exclude` or `include` options to match route paratemers is super easy!
```js
$route = { name: 'home', params: { lastPosition: true, someOtherParam: false } }

RouterSmartScroll.install(router, {
    include: { lastPosition: true } // performs _.isMatch on $route.params
});
```

# ng-ioc
#### IoC for AngularJS (1.x) modules.

This module uses `require.context` to automatically configure an AngularJS module based on file extensions in the provided directory.

## Example setup:

```js
var app = angular.module('my-app', []);
require('ng-ioc')(app, __dirname);

angular.element(() => angular.bootstrap(document, ['app']));

// BOOM! Everything's ready to go.
```

The above configuration simply searches the current path for AngularJS injectables.
In order to actually add parts to the module, denote the file with a `.[type].js` extension.

## Example (my-app.service.js):

```js
module.exports = function($window)
{
    $window.alert('Example service');
}
```

## Typical file layout:
- `component`
  - `example`
    - `example.component.js`
    - `example.html`
- `config`
  - `example.config.js`
- `service`
  - `example.service.js`
- `main.js`

Injectables are named by the `name` of the value (usually a function) exported by the file, or else the camelized file name (excluding the extension).

I hope you find this useful, and please feel free to contribute!
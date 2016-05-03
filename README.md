# threedi-client
small client that connects with socket to threedi-server

# intro
This small app is built with [Riot.js](http://riotjs.com), a small react-like
lib.

To get started look at: [src/app.js](https://github.com/fritzvd/threedi-client/blob/master/src/app.js).

It initiates `redux` and `riot` with some parameters. All components are broken
down in their own folder in [src/components](https://github.com/fritzvd/threedi-client/tree/master/src/components).
Each component has a `css`, `html` and `js` file that together make up the component.

Stuff that doesn't really apply directly to the UI is in the [src/lib](https://github.com/fritzvd/threedi-client/tree/master/src/lib) folder.

# getting started
To install and run the dev-server run this.
```
npm install
npm run dev
```

To just run the tests:
```
npm test
```

Or to build it for production:
```
npm run build
```

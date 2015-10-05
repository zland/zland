# gulp

Gulp files for building zland.
<!-- start generated readme -->

## Files  

### [ZlandFile.js](ZlandFile.js)  
helper for building files from config parameters

### [build-zland-files.js](build-zland-files.js)  
build zland files. As of now all of the resulting files are located in the www folder
- CanvasView.jsx
- initfiles.js
- Routes.jsx
- spotfactories/Generators.js and spotfactories/ComponentFactories.js
- canvasstores/Stores.js and canvasstores/getStoreValues.js (TODO: evaluate if this is still necessary)

### [build.js](build.js)  
- `gulp build` - for building the project
- `gulp build:debug` - for building the project in debug mode, gps and heading sensor faked
- `gulp zland-assets` - copies assets from corresponding modules in node_modules folder to www-directory
- `gulp merge-zland-configs` - merge all .zland-configs into the config of this project

### [exec.js](exec.js)  
exec bash commands with node js

### [server.js](server.js)  
- `gulp serve` - serve in files in the browser with production settings
- `gulp serve:debug` - serve in files in the browser with debug settings
- `gulp set-config-to-debug` - sets debug flag in config/config.json true
- `gulp set-config-to-production` - sets debug flag in config/config.json false
- `gulp webpack` - launch webpack in watch mode
- `gulp webpack:debug` - launch webpack in watch mode with debug settings
- `gulp build-webpack` - webpack build files
- `gulp build-webpack:debug` - webpack build files in debug mode

### [unit-tests.js](unit-tests.js)  


<!-- end generated readme -->
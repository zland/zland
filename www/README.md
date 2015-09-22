# www

Files for running projects isolated from main project.
<!-- start generated readme -->

## Directories  

### [assets](assets)  
Each asset must be placed wihin www/assets/{project-name}/{up-to-you}. The structure is important because its used in the build process to merge all assets together.

### [build](build)  


### [canvasstores](canvasstores)  


### [spotfactories](spotfactories)  


## Files  

### [CanvasView.jsx](CanvasView.jsx.md)  
CanvasView file template. Appends child elements dynamically in build process.

### [Routes.jsx](Routes.jsx.md)  
Routes constructed here use .zland config add this to your .zland json config to create a route for your project

Example:
```json
 "routes": [
    {
      "path": "intro",
      "handler": "components/IntroductionWindow"
    }
 ]
```

### [bootstrap.jsx](bootstrap.jsx.md)  
This file initializes zland and launches the app on cordova deviceready event
(or immediately if its build for browser)

### [initfiles.js](initfiles.js.md)  
Empty file template

<!-- end generated readme -->
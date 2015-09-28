# zland
[<img alt="Get it on Google Play"    src="res/android/play_store_badge.png"  height="40px"/>](https://play.google.com/store/apps/details?id=io.zland.app) [<img alt="Download on the App Store"    src="res/ios/app_store_badge.png" height="40px"/>](https://itunes.apple.com/app/id1037711090)


This repository is for building zland.  
It puts everything together and runs the package either mobile or in the browser.

## Installation

clone the repo  
`git clone https://github.com/zland/zland.git`

install all dependencies first  
`npm install`

install gulp:  
`npm install -g gulp`

install cordova:  
`npm install -g cordova`

## Configuration

There is a json config located in config/sample.config.json  
Copy this file to config.json and add your google maps key.  

## Usage

Launch in the browser  
`gulp serve:debug`  

Launch android  
`cordova platform add android`  
`gulp build && cordova run android`  

Launch ios  
`cordova platform add ios`  
`gulp build`

### [Contribute](Contribute.md)

<!-- start generated readme -->

## Directories  

### [config](config)  


### [gulp](gulp)  
Gulp files for building zland.

### [hooks](hooks)  
#

### [platforms](platforms)  


### [plugins](plugins)  


### [res](res)  
Resources folder, mobile os specific images like splash screen and icons are places here.

### [www](www)  
Files for running projects isolated from main project.

## Files  

### [gulpfile.js](gulpfile.js.md)  


### [make-webpack-config.js](make-webpack-config.js.md)  


### [webpack-debug-settings.js](webpack-debug-settings.js.md)  


### [webpack-production-settings.js](webpack-production-settings.js.md)  


<!-- end generated readme -->

# zland
[<img alt="Get it on Google Play"    src="res/android/play_store_badge.png"  height="40px"/>](https://play.google.com/store/apps/details?id=io.zland.app) [<img alt="Download on the App Store"    src="res/ios/app_store_badge.png" height="40px"/>](https://itunes.apple.com/app/id1037711090)


This repository is for building zland.  
It puts everything together and runs the package either mobile or in the browser.

## Contribute

You can contribute in different ways:

* Play the game and tell me your opinion and ideas
* Report bugs
* Create images
* Provide CSS styles
* Submit your own code

### submit CSS styles and images

Clone the repository you like to contribute to and follow the installation instructions from the related README.md repository.  
Each project should launch separately in the browser and show you the available styles and images.  
Images are stored in the asset folder located in `www/assets/<project_name>/img` (for zland-player it would be `www/assets/zland-player/img/test.png`).  

#### reference from sass file

```css
.torso {
    background-image: url('~assets/zland-player/images/test.png');
}
```

#### reference from HTML/JSX file

```html
<img src="assets/zland-player/images/test.png"/>
```

### submit code

#### styleguide

There is no styleguide yet. I suggest you pick a random file and try to match the style.  
Only fixed rule is two spaces for a tab.

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

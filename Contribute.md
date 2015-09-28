# Contribute

You can contribute in different ways:

* Play the game and tell me your opinion and ideas
* Report bugs
* Create images
* Provide CSS styles
* Submit your own code

## submit CSS styles and images

Clone the repository you like to contribute to and follow the installation instructions from the related README.md repository.  
Each project should launch separately in the browser and show you the available styles and images.  
Images are stored in the asset folder located in `www/assets/<project_name>/img` (for zland-player it would be `www/assets/zland-player/img/test.png`).  

### reference from sass file

```css
.torso {
    background-image: url('~assets/zland-player/images/test.png');
}
```

### reference from HTML/JSX file

```html
<img src="assets/zland-player/images/test.png"/>
```

## Submit code

### styleguide

There is no styleguide yet. I suggest you pick a random file and try to match the style.  
Only fixed rule is two spaces for a tab.

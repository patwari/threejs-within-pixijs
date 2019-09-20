# Threejs within PIXI

This is a demo of rendering threejs elements inside PIXI.

## Approach
1. Create an offscreen ```canvas``` element and instantiate threejs app in the canvas.
1. Create a PIXI sprite using threejs canvas. Everything happening within the threejs canvas will be rendered as a single sprite, with a feel of 3D.
1. During loop cycle, reset PIXI renderer, and let threejs do its magic. 
1. Update the threejs sprite's texture and finally render the PIXI.

## Dev-Notes
1. Currently we have two threejs apps running, one is updated via pixi, while the other gets updated by threejs ticker.
1. disable antialising for better performance. 
1. The hitarea of the slot is little disturbed in the threejs app. The correct place is approx 1cm in front of the button. Try clicking nearby that place. :-P

## How to Run
Simply host the project and open in browser.
```bash
http-server
```

## Author
Monoloco

## Changelog
1. Run three instances of threejs within pixi.
2. Add control to show/hide the threejs apps.
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

## How to Run
Simply host the project and open in browser.
```bash
http-server
```

## Author
Monoloco

## Changelog
1. Run two instances of threejs within pixi.
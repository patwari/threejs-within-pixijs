/** default visibility of threejs apps. */
var guiSettings = {
    layer_cube: false,
    layer_all_cubes: false,
    layer_ring: true
};

const pixelRatio = window.devicePixelRatio // 2 in case of retinas

// Grab our canvases
const canvas = document.querySelector('#app')
const offscreenCanvas = document.createElement('canvas');
const offscreenCanvas2 = document.createElement('canvas');
const offscreenCanvas3 = document.createElement('canvas');

// init pixi.js
const pixiApp = initPixiApp(canvas);

// init three.js offscreen
const threeApp = initThreeApp(offscreenCanvas);
const threeApp2 = initThreeApp2(offscreenCanvas2);
const threeApp3 = initThreeApp3(offscreenCanvas3);

/** background - PIXI */
const bgTexture = PIXI.Texture.from("https://picsum.photos/" + innerWidth + "/" + innerHeight);
const bgImage = new PIXI.Sprite(bgTexture);
bgImage.tint = 0xffccff;
pixiApp.stage.addChild(bgImage);

// const basicText = new PIXI.Text('Basic text in pixi');
// basicText.x = 500;
// basicText.y = 250;
// pixiApp.stage.addChild(basicText);

/** ======================================================= */

// Render three.js as a pixi layer
const threeTexture = PIXI.Texture.from(threeApp.renderer.domElement);
const threeSprite = new PIXI.Sprite(threeTexture);
// divide by pixelratio to make it the correct size
threeSprite.scale.x /= pixelRatio;
threeSprite.scale.y /= pixelRatio;
pixiApp.stage.addChild(threeSprite);

/** ======================================================= */

// render threeApp2 as a pixi layer.
const threeTexture2 = PIXI.Texture.from(threeApp2.renderer.domElement);
const threeSprite2 = new PIXI.Sprite(threeTexture2);
// divide by pixelratio to make it the correct size
threeSprite2.scale.x /= pixelRatio;
threeSprite2.scale.y /= pixelRatio;
pixiApp.stage.addChild(threeSprite2);

/** ======================================================= */

// render threeApp3 as a pixi layer.
const threeTexture3 = PIXI.Texture.from(threeApp3.renderer.domElement);
const threeSprite3 = new PIXI.Sprite(threeTexture3);
// divide by pixelratio to make it the correct size
threeSprite3.scale.x /= pixelRatio;
threeSprite3.scale.y /= pixelRatio;
threeSprite3.position.set(250, 250);
pixiApp.stage.addChild(threeSprite3);

/** ======================================================= */

/** foreground PIXI */
const basicText2 = new PIXI.Text('PARABELLUM', {
    dropShadow: true,
    dropShadowAlpha: 0.6,
    dropShadowAngle: 0.6,
    dropShadowBlur: 2,
    dropShadowColor: "#400040",
    dropShadowDistance: 9,
    fill: "white",
    fontFamily: "Georgia",
    fontSize: 60,
    fontStyle: "italic",
    fontWeight: "bolder",
    letterSpacing: 7,
    miterLimit: 3,
    stroke: "blue",
    strokeThickness: 10,
    align: "center"
});

basicText2.position.set(500, 120);
basicText2.anchor.set(0.5, 0);
pixiApp.stage.addChild(basicText2);

/** foreground image */
const playButton = createButton();
playButton.anchor.set(0.5, 1.2);
pixiApp.stage.addChild(playButton);

/** dat.gui */
var gui = new dat.GUI();
var visibleFolder = gui.addFolder("Threejs apps visiblility", true);

visibleFolder.add(guiSettings, 'layer_cube').onChange(guiChangeHandler);
visibleFolder.add(guiSettings, 'layer_all_cubes').onChange(guiChangeHandler);
visibleFolder.add(guiSettings, 'layer_ring').onChange(guiChangeHandler);

/**
 * show/hide threejs apps based on the selection.
 */
function guiChangeHandler() {
    threeSprite.visible = guiSettings.layer_cube;
    threeSprite2.visible = guiSettings.layer_all_cubes;
    threeSprite3.visible = guiSettings.layer_ring;
}

/** force manually change it once. */
guiChangeHandler();

/** the main update cycle. Prefer PIXI.Ticker */
// function update(time) {
//     const t = time * 0.001

//     // THREE JS
//     threeApp.renderer.state.reset();
//     // threeApp2.renderer.state.reset();

//     // make the cubes rotate
//     threeApp.scene.traverse(child => {
//         if (child.isMesh) {
//             child.rotation.x = t * 0.1
//             child.rotation.y = t * 0.3
//         }
//     })

//     threeApp.draw();
//     // threeApp2.draw();

//     threeApp.renderer.state.reset()
//     // threeApp2.renderer.state.reset()


//     // PIXI
//     pixiApp.renderer.reset();

//     // tell pixi that threejs has changed
//     threeSprite.texture.update();
//     threeSprite2.texture.update();
//     threeSprite3.texture.update();

//     pixiApp.render()

//     // pixiApp.renderer.reset()
//     requestAnimationFrame(update)
// }

/** begin the update loop. */
// requestAnimationFrame(update)


/** ====================================================================================== */
window.addEventListener('resize', resize);
function resize() {
    basicText1 && (basicText1.x = innerWidth / 2);
    basicText2.x = innerWidth / 2;
    playButton.position.set(innerWidth / 2, innerHeight);
};
resize();

/** ====================================================================================== */

function initPixiApp(canvas) {
    return new PIXI.Application({
        view: canvas,
        resizeTo: window,
        antialias: false,
        transparent: true,
        autoDensity: true,
        resolution: window.devicePixelRatio, // 2 in case of retinas
    })
}
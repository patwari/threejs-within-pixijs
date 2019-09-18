/** default visibility of threejs apps. */
let guiSettings = {
    layer01: true,
    layer02: false,
    layer03: true
};

const pixelRatio = window.devicePixelRatio // 2 in case of retinas

// Grab our canvases
const canvas = document.querySelector('#app')
const offscreenCanvas = document.createElement('canvas');
const offscreenCanvas2 = document.createElement('canvas');
const offscreenCanvas3 = document.createElement('canvas');


// init pixi.js
const pixiApp = initPixiApp(canvas)

// init three.js offscreen
const threeApp = initThreeApp(offscreenCanvas);
const threeApp2 = initThreeApp2(offscreenCanvas2);
const threeApp3 = initThreeApp3(offscreenCanvas3);

/** background - PIXI */
const texture = PIXI.Texture.from('https://picsum.photos/200/300');
const bunny = new PIXI.Sprite(texture);
bunny.x = 100;
bunny.y = 200;
pixiApp.stage.addChild(bunny);

const basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 500;
basicText.y = 250;
pixiApp.stage.addChild(basicText);

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
const basicText2 = new PIXI.Text('Basic text in pixi');
basicText2.x = 500;
basicText2.y = 300;
pixiApp.stage.addChild(basicText2);

/** foreground image */
const bunny2 = new PIXI.Sprite(PIXI.Texture.from('https://picsum.photos/200/310'));
bunny2.x = 400;
bunny2.y = 400;
pixiApp.stage.addChild(bunny2);

/** dat.gui */
var gui = new dat.GUI();
var visibleFolder = gui.addFolder("Threejs apps visiblility", true);

visibleFolder.add(guiSettings, 'layer01').onChange(guiChangeHandler);
visibleFolder.add(guiSettings, 'layer02').onChange(guiChangeHandler);
visibleFolder.add(guiSettings, 'layer03').onChange(guiChangeHandler);

/**
 * show/hide threejs apps based on the selection.
 */
function guiChangeHandler() {
    threeSprite.visible = guiSettings.layer01;
    threeSprite2.visible = guiSettings.layer02;
    threeSprite3.visible = guiSettings.layer03;
}

/** force manually change it once. */
guiChangeHandler();

/** the main update cycle. Prefer PIXI.Ticker */
function update(time) {
    const t = time * 0.001

    // THREE JS
    threeApp.renderer.state.reset();
    // threeApp2.renderer.state.reset();

    // make the cubes rotate
    threeApp.scene.traverse(child => {
        if (child.isMesh) {
            child.rotation.x = t * 0.1
            child.rotation.y = t * 0.3
        }
    })

    threeApp.draw();
    // threeApp2.draw();

    threeApp.renderer.state.reset()
    // threeApp2.renderer.state.reset()


    // PIXI
    pixiApp.renderer.reset();

    // tell pixi that threejs has changed
    threeSprite.texture.update();
    threeSprite2.texture.update();
    threeSprite3.texture.update();

    pixiApp.render()

    // pixiApp.renderer.reset()
    requestAnimationFrame(update)
}

/** begin the update loop. */
requestAnimationFrame(update)


/** ====================================================================================== */

function initPixiApp(canvas) {
    return new PIXI.Application({
        view: canvas,
        resizeTo: window,
        antialias: true,
        transparent: true,
        autoDensity: true,
        resolution: window.devicePixelRatio, // 2 in case of retinas
    })
}
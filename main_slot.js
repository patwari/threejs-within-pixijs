guiSettings.layer_slot = true;

visibleFolder.add(guiSettings, 'layer_slot').onChange(guiChangeHandler2);
// var oldGuiChangeHandler = guiChangeHandler;

function guiChangeHandler2() {
    threeSprite4.visible = guiSettings.layer_slot;
}

const offscreenCanvas4 = document.createElement('canvas');
const threeApp4 = virtualSlotMachine(offscreenCanvas4);

/** ======================================================= */

// render threeApp4 as a pixi layer.
const threeTexture4 = PIXI.Texture.from(threeApp4.renderer.domElement);
const threeSprite4 = new PIXI.Sprite(threeTexture4);
// divide by pixelratio to make it the correct size
// threeSprite4.scale.x /= pixelRatio;
// threeSprite4.scale.y /= pixelRatio;
// threeSprite4.position.set(0, 0);
pixiApp.stage.addChildAt(threeSprite4, 3);

/** ======================================================= */

// threeApp4.draw();

function update(time) {
    const t = time * 0.001

    // THREE JS
    threeApp.renderer.state.reset();
    // threeApp2.renderer.state.reset();

    // make the cubes rotate
    guiSettings.layer_cube && threeApp.scene.traverse(child => {
        if (child.isMesh) {
            child.rotation.x = t * 0.1
            child.rotation.y = t * 0.3
        }
    });

    guiSettings.layer_cube && threeApp.draw();
    // guiSettings.layer_ring && threeApp3.draw();
    guiSettings.layer_slot && threeApp4.draw();
    // threeApp2.draw();

    threeApp.renderer.state.reset()
    // threeApp2.renderer.state.reset()


    // PIXI
    pixiApp.renderer.reset();

    // tell pixi that threejs has changed
    guiSettings.layer_cube && threeSprite.texture.update();
    guiSettings.layer_all_cubes && threeSprite2.texture.update();
    guiSettings.layer_ring && threeSprite3.texture.update();
    guiSettings.layer_slot && threeSprite4.texture.update();

    pixiApp.render()

    // pixiApp.renderer.reset()
    requestAnimationFrame(update)
}

requestAnimationFrame(update);

// add event
playButton.on('pointerup', threeApp4.playBtnUp);
playButton.on('pointerdown', threeApp4.playBtnDown);
const pixelRatio = window.devicePixelRatio // 2 in case of retinas

// Grab our canvases
const canvas = document.querySelector('#app')
const offscreenCanvas = document.createElement('canvas')

// init pixi.js
const pixiApp = initPixiApp(canvas)

// init three.js offscreen
const threeApp = initThreeApp(offscreenCanvas)

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
const threeTexture = PIXI.Texture.from(threeApp.renderer.domElement)
const threeSprite = new PIXI.Sprite(threeTexture)
// divide by pixelratio to make it the correct size
threeSprite.scale.x /= pixelRatio
threeSprite.scale.y /= pixelRatio
pixiApp.stage.addChild(threeSprite)

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

function update(time) {
    const t = time * 0.001

    // THREE JS
    threeApp.renderer.state.reset()

    // make the cubes rotate
    threeApp.scene.traverse(child => {
        if (child.isMesh) {
            child.rotation.x = t * 0.1
            child.rotation.y = t * 0.3
        }
    })

    threeApp.draw()

    threeApp.renderer.state.reset()


    // PIXI
    pixiApp.renderer.reset()

    // tell pixi that threejs has changed
    threeSprite.texture.update()

    pixiApp.render()

    pixiApp.renderer.reset()
    requestAnimationFrame(update)
}
requestAnimationFrame(update)








function initThreeApp(canvas) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    })

    const fov = 45
    const near = 0.01
    const far = 100
    const camera = new THREE.PerspectiveCamera(fov, 1, near, far)

    const scene = new THREE.Scene()

    function resize() {
        const width = window.innerWidth
        const height = window.innerHeight

        renderer.setSize(width, height)
        renderer.setPixelRatio(pixelRatio)

        if (camera.isPerspectiveCamera) {
            camera.aspect = width / height
        }
        camera.updateProjectionMatrix()
    }

    function draw() {
        renderer.render(scene, camera)
    }

    // initial resize and draw
    resize()
    draw()

    // add resize listener
    window.addEventListener('resize', resize)

    // add a light
    const color = 0xFFFFFF
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)


    // add some cubes
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.set(0, 0, 3)

    return {
        renderer,
        camera,
        scene,
        resize,
        draw,
    }
}

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
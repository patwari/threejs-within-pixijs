function initThreeApp(canvas) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
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
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.set(0, 0, 3);

    /**
     * Return threejs elements for controls.
     */
    return {
        renderer,
        camera,
        scene,
        resize,
        draw,
    }
}

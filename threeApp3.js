/**
 * This threejs app creates a ring and rotates using threejs ticker.
 * 
 * @param {*} canvas 
 */

function initThreeApp3(canvas) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
    });

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const scene = new THREE.Scene();

    /** ============================== < MAIN CODE > ====================================== */

    function createMesh(geom) {
        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    }

    var torus = createMesh(new THREE.TorusGeometry(21, 3, 8, 12, Math.PI * 2));
    torus.rotation.y = 0.1;

    // add the sphere to the scene
    scene.add(torus);

    /** ============================== </ MAIN CODE > ====================================== */
    // camera.position.set(0, 0, 3);


    function resize() {
        return;
    }

    window.addEventListener('resize', resize)

    var step = 0;
    function draw() {
        requestAnimationFrame(draw);

        if (!guiSettings.layer_ring) {
            return;
        }

        torus.rotation.y = step += 0.01;

        // render using requestAnimationFrame
        renderer.render(scene, camera);
    }

    resize();
    draw();

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

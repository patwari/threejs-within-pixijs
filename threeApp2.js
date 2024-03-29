/**
 * This threejs app creates a lot of cubes floating around in the space.
 * The cubes highlight on mouse over.
 * 
 * @param {*} canvas 
 */

function initThreeApp2(canvas) {
    // var container;
    var camera, scene, raycaster, renderer;
    var mouse = new THREE.Vector2(), INTERSECTED;
    var radius = 100, theta = 0;
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        scene = new THREE.Scene();
        // set scene.background, if you want a solid background.
        // scene.background = new THREE.Color(0xff0000);
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);
        var geometry = new THREE.BoxBufferGeometry(20, 20, 20);
        for (var i = 0; i < 2000; i++) {
            var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            scene.add(object);
        }
        raycaster = new THREE.Raycaster();
        // re-use the same canvas
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        if (!guiSettings.layer_all_cubes) {
            return;
        }

        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        camera.updateMatrixWorld();
        // find intersections
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xff0000);
            }
        } else {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
        }
        renderer.render(scene, camera);
    }

    function draw() {
        renderer.render(scene, camera)
    }

    /**
     * manually resize and update Threejs 3d texture.
     */
    onWindowResize();
    draw();

    /**
     * expose functions.
     */
    return {
        renderer,
        camera,
        scene,
        resize: onWindowResize,
        draw
    }
}

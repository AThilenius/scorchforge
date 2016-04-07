// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.three_visualizer', [])
  .directive('atThreeVisualizer', ['$timeout', '$rootScope', function($timeout,
    $rootScope) {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/three_visualizer/three_visualizer.htm',
      link: function($scope, $element, $attr) {
        // TODO(athilenius): Handle Resize Events
        var width = $element[0].clientWidth;
        var height = $element[0].clientHeight;
        var aspect = width / height;
        var scene = new THREE.Scene();
        var objects = [];
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var ctrlDown = false;
        // Camera
        var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.z = 500;
        var renderer = new THREE.WebGLRenderer();
        //var renderer = new THREE.RaytracingRenderer({
        //workers: 3,
        //workerPath: '/app/directives/three_visualizer/RaytracingWorker.js',
        //blockSize: 64
        //});
        renderer.setSize(width, height);
        var orbitControls = new THREE.OrbitControls(camera);
        orbitControls.addEventListener('change', render);
        orbitControls.enableRotate = false;
        orbitControls.enablePan = false;
        window.orbit = orbitControls;
        $element[0].appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0x555555));
        // Scene Stuff
        var axisHelper = new THREE.AxisHelper(50);
        axisHelper.position.set(-80, 10, -80);
        scene.add(axisHelper);
        // Grid
        var gridHelper = new THREE.GridHelper(80, 10);
        scene.add(gridHelper);
        // Plane (for raycasting only)
        var planeGeometry = new THREE.PlaneBufferGeometry(160, 160);
        planeGeometry.rotateX(-Math.PI / 2);
        var plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({
          visible: false
        }));
        scene.add(plane);
        objects.push(plane);
        // Light
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 20);
        light.target.position.set(0, 0, 0);
        scene.add(light);

        // depth
        var depthShader = THREE.ShaderLib.depthRGBA;
        var depthUniforms = THREE.UniformsUtils.clone(depthShader.uniforms);
        depthMaterial = new THREE.ShaderMaterial({
          fragmentShader: depthShader.fragmentShader,
          vertexShader: depthShader.vertexShader,
          uniforms: depthUniforms
        });
        depthMaterial.blending = THREE.NoBlending;

        // postprocessing
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));
        depthTarget = new THREE.WebGLRenderTarget(width, height, {
          minFilter: THREE.NearestFilter,
          magFilter: THREE.NearestFilter,
          format: THREE.RGBAFormat
        });

        var effect = new THREE.ShaderPass(THREE.SSAOShader);
        effect.uniforms.tDepth.value = depthTarget;
        effect.uniforms.size.value.set(width, height);
        effect.uniforms.cameraNear.value = camera.near;
        effect.uniforms.cameraFar.value = camera.far;
        effect.renderToScreen = true;
        composer.addPass(effect);

        // Cube
        var rollOverGeo = new THREE.BoxGeometry(10, 10, 10);
        var rollOverMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          opacity: 0.5,
          transparent: true
        });
        rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        scene.add(rollOverMesh);

        var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
        var cubeMaterial = new THREE.MeshPhongMaterial({
          color: 0x00ff00
        });

        document.addEventListener('keydown', (event) => {
          switch (event.keyCode) {
            case 91:
              ctrlDown = true;
              orbitControls.enableRotate = true;
              orbitControls.enablePan = true;
              scene.remove(rollOverMesh);
              break;
          }
        }, false);

        document.addEventListener('keyup', (event) => {
          switch (event.keyCode) {
            case 91:
              ctrlDown = false;
              orbitControls.enableRotate = false;
              orbitControls.enablePan = false;
              scene.add(rollOverMesh);
              break;
          }
        }, false);

        document.addEventListener('mousemove', (event) => {
          if (ctrlDown) {
            return;
          }
          event.preventDefault();
          var x = event.clientX - $element[0].offsetLeft;
          var y = event.clientY - $element[0].offsetTop;
          mouse.x = (x / width) * 2 - 1;
          mouse.y = -((y / height) * 2 - 1);
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(objects);
          if (intersects.length > 0) {
            var intersect = intersects[0];
            rollOverMesh.position
              .copy(intersect.point)
              .add(intersect.face.normal);
            rollOverMesh.position
              .divideScalar(10)
              .floor()
              .multiplyScalar(10)
              .addScalar(5);
          }
          render();
        }, false);

        document.addEventListener('mousedown', (event) => {
          if (ctrlDown) {
            return;
          }
          event.preventDefault();
          var x = event.clientX - $element[0].offsetLeft;
          var y = event.clientY - $element[0].offsetTop;
          mouse.x = (x / width) * 2 - 1;
          mouse.y = -((y / height) * 2 - 1);
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(objects);
          if (intersects.length > 0) {
            var intersect = intersects[0];
            if (event.button == 2) {
              // Right Mouse
              scene.remove(intersect.object);
              objects.splice(objects.indexOf(intersect.object), 1);
            } else {
              var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
              voxel.position
                .copy(intersect.point)
                .add(intersect.face.normal);
              voxel.position
                .divideScalar(10)
                .floor()
                .multiplyScalar(10)
                .addScalar(5);
              scene.add(voxel);
              objects.push(voxel);
            }
            render();
          }
        }, false);

        function render() {
          scene.overrideMaterial = depthMaterial;
          renderer.render(scene, camera, depthTarget);

          scene.overrideMaterial = null;
          composer.render();

          // For Raytracing
          //renderer.render(scene, camera);
        }
        render();

        function animate() {
          requestAnimationFrame(animate);
          orbitControls.update();
        }
        animate();
      }
    };
  }]);

//var control = new THREE.TransformControls(camera, renderer.domElement);
//control.attach(cube);
//control.addEventListener('change', render);
//scene.add(control);

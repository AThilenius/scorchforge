// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.three_visualizer', [])
  .directive('atThreeVisualizer', ['$timeout', '$rootScope', function($timeout,
    $rootScope) {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/three_visualizer/three_visualizer.htm',
      link: function($scope, $element, $attr) {
        $scope.activeTool = 'translate';
        $scope.space = 'local';
        window.elem = $element;
        // TODO(athilenius): Handle Resize Events
        var renderElem = $element.find('#webgl-canvas')[0];
        var width = renderElem.clientWidth;
        var height = renderElem.clientHeight;
        var aspect = width / height;
        var scene = new THREE.Scene();
        window.scene = scene;
        var objects = [];
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var ctrlDown = false;
        // Camera
        var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.z = 500;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        var orbitControls = new THREE.OrbitControls(camera);
        orbitControls.addEventListener('change', render);
        orbitControls.enableRotate = false;
        orbitControls.enablePan = false;
        window.orbit = orbitControls;
        renderElem.appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0x555555));
        // Grid
        var gridHelper = new THREE.GridHelper(80, 10);
        scene.add(gridHelper);
        // Light
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 20);
        light.target.position.set(0, 0, 0);
        scene.add(light);
        // Plane (for raycasting only)
        //var planeGeometry = new THREE.PlaneBufferGeometry(160, 160);
        //planeGeometry.rotateX(-Math.PI / 2);
        //var plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({
        //visible: false
        //}));
        //scene.add(plane);
        //objects.push(plane);

        // Cube
        //var rollOverGeo = new THREE.BoxGeometry(10, 10, 10);
        //var rollOverMaterial = new THREE.MeshBasicMaterial({
        //color: 0xff0000,
        //opacity: 0.5,
        //transparent: true
        //});
        //rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
        //scene.add(rollOverMesh);
        //window.cube = rollOverMesh;
        //var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
        //var cubeMaterial = new THREE.MeshPhongMaterial({
        //color: 0x00ff00
        //});

        // Transform controls for the Model Tree
        var transformControl = new THREE.TransformControls(camera,
          renderer.domElement);
        transformControl.addEventListener('change', () => {
          // Going to need to do someting here... I think?
          renderer.render(scene, camera);
        });
        transformControl.setTranslationSnap(5);
        window.transformControl = transformControl;
        scene.add(transformControl);
        $scope.$watch('activeTool', (val) => {
          if (val === 'translate' || val === 'rotate' || val === 'scale') {
            transformControl.visible = true;
            transformControl.setMode(val);
          } else {
            transformControl.visible = false;
          }
        });
        $scope.$watch('space', (val) => {
          transformControl.setSpace(val);
        });
        var rootObject = new THREE.Object3D();
        scene.add(rootObject);
        // Axis Helper
        var axisHelper = new THREE.AxisHelper(50);
        scene.add(axisHelper);
        // Model Tree
        var modelTree = new ModelTree(rootObject, transformControl, axisHelper,
          camera, renderer, scene);
        window.modelTree = modelTree;
        document.addEventListener('keydown', (event) => {
          switch (event.keyCode) {
            case 17:
            case 91:
              ctrlDown = true;
              orbitControls.enableRotate = true;
              orbitControls.enablePan = true;
              break;
          }
        }, false);

        document.addEventListener('keyup', (event) => {
          switch (event.keyCode) {
            case 17:
            case 91:
              ctrlDown = false;
              orbitControls.enableRotate = false;
              orbitControls.enablePan = false;
              break;
          }
        }, false);

        $scope.mouseEnter = function(event) {
          orbitControls.enabled = true;
        };

        $scope.mouseLeave = function(event) {
          orbitControls.enabled = false;
        };

        $scope.mouseMove = function(event) {
          if (ctrlDown || !orbitControls.enabled) {
            return;
          }
          var x = event.clientX - renderElem.offsetLeft;
          var y = event.clientY - renderElem.offsetTop;
          mouse.x = (x / width) * 2 - 1;
          mouse.y = -((y / height) * 2 - 1);
          orbitControls.enabled = true;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(objects);
          if (intersects.length > 0) {
            var intersect = intersects[0];
            //rollOverMesh.position
            //.copy(intersect.point)
            //.add(intersect.face.normal);
            //rollOverMesh.position
            //.divideScalar(10)
            //.floor()
            //.multiplyScalar(10)
            //.addScalar(5);
          }
          render();
          orbitControls.update();
          transformControl.update();
        };

        $scope.mouseDown = function(event) {
          if (event.button === 1) {
            ctrlDown = true;
          }
          if (ctrlDown || !orbitControls.enabled || event.clientX) {
            return;
          }
          var x = event.clientX - renderElem.offsetLeft;
          var y = event.clientY - renderElem.offsetTop;
          mouse.x = (x / width) * 2 - 1;
          mouse.y = -((y / height) * 2 - 1);
          if (mouse.x < 0 && mouse.x > 1 && mouse.y < 0 && mouse.y > 1) {
            orbitControls.enabled = false;
            return;
          }
          orbitControls.enabled = true;
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
            orbitControls.update();
            transformControl.update();
          }
        };

        $scope.mouseUp = function(event) {
          if (orbitControls.enabled && event.button === 1) {
            ctrlDown = false;
          }
        };

        function render() {
          renderer.render(scene, camera);
          //scene.overrideMaterial = depthMaterial;
          //renderer.render(scene, camera, depthTarget);

          //scene.overrideMaterial = null;
          //composer.render();

          // For Raytracing
          //renderer.render(scene, camera);
        }
        render();

        //function animate() {
        //requestAnimationFrame(animate);
        //orbitControls.update();
        //}
        //animate();
        $scope.activeContent = {
          type: 'threeVisualizer',
          modelTree: modelTree
        };
      }
    };
  }]);

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
        // Camera
        var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.setSize(width, height);
        camera.position.set(0, 2, 5);
        camera.rotation.set(-0.25, 0, 0);
        window.camera = camera;
        window.scene = scene;
        $element[0].appendChild(renderer.domElement);

        // Render Some Stuff
        scene.add(new THREE.AmbientLight(0x555555));
        // Cube
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshPhongMaterial({
          color: 0x00aa00,
          shininess: 0,
          shading: THREE.SmoothShading
        });
        var cube = new THREE.Mesh(geometry, material);
        window.cube = cube;
        scene.add(cube);
        var control = new THREE.TransformControls(camera, renderer.domElement);
        control.attach(cube);
        control.addEventListener('change', render);
        scene.add(control);
        // Plane
        var planeGeometry = new THREE.PlaneGeometry(5, 5);
        var planeMaterial = new THREE.MeshPhongMaterial({
          color: 0xaa0000,
          shininess: 0,
          side: THREE.DoubleSide,
          shading: THREE.SmoothShading
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        window.plane = plane;
        plane.position.y = -1;
        plane.rotation.set(90 * 0.0174533, 0, 0);
        scene.add(plane);
        // Light
        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 2, 2);
        light.target.position.set(0, 0, 0);
        scene.add(light);
        window.light = light;

        function render() {
          //requestAnimationFrame(render);
          cube.rotation.x += 0.1;
          cube.rotation.y += 0.1;
          renderer.render(scene, camera);
        }
        render();
      }
    };
  }]);

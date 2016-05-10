// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Manages a recursive model tree (in the scene graph) for voxel editing,
 * compilation and visualization. Further ModelTree instances are added to
 * children as needed.
 */
var ModelTree = function(rootObject, transformControl, axisHelper, camera,
  renderer, scene, parentNode) {
  this.rootObject = rootObject;
  this.transformControl = transformControl;
  this.axisHelper = axisHelper;
  this.camera = camera;
  this.renderer = renderer;
  this.scene = scene;
  this.parentNode = parentNode;
  // The human readable name of the node. Overriden at add time.
  this.name = 'root';
  // A uuid for this node
  this.id = newShortUuid();
  // The root ModelTree node. Overriden at add time.
  this.rootNode = this;
  // Child ModelTree instances. Note that this.object3D will also have the same
  // children, but pointing to thier THREE Object3D instances.
  this.children = [];
  // Set up the transform chain. Each node has 3 transforms, rootTransform,
  // pyTransform, modelOffset:
  //   - The root transform (set with the TransformControl instance)
  //   - The Python Transform (set from each iteratio of Python code)
  //   - The model offset Transform (set to -1/2*size of VoxelChunk)
  this.rootTransform = new THREE.Object3D();
  this.rootObject.add(this.rootTransform);
  this.pyTransform = new THREE.Object3D();
  this.rootTransform.add(this.pyTransform);
  this.modelOffsetTransform = new THREE.Object3D();
  this.pyTransform.add(this.modelOffsetTransform);
  this.pyTransformCode = {
    position: null,
    rotation: null,
    scale: null
  };
  // PythonCode => Skulpt Module
  this.skulptCache_ = {};
  //this.modelOffsetTransform.position.set(-8, -8, -8);
  // 'Starter Cube' that is clicked to add a VoxelChunk to the node. Add it to
  // the scene but make it now visible by default. No added to root.
  if (parentNode) {
    this.starterCube = new THREE.BoxGeometry(5, 5, 5);
    this.starterCubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      opacity: 0.5,
      transparent: true
    });
    this.starterCubeMesh = new THREE.Mesh(this.starterCube,
      this.starterCubeMaterial);
    this.pyTransform.add(this.starterCubeMesh);
    // TODO(athilenius): Add a collider on the starter cube
    //this.starterCubeMesh.visible = false;
    // Used iff this node stores something renderable.
    this.voxelChunk = new VoxelChunk(16);
    // DEBUG
    this.voxelChunk.set(0, 1, 0, new THREE.Color(0xFF0000));
    this.voxelChunk.set(1, 1, 0, new THREE.Color(0xFF0000));
    this.voxelChunk.set(0, 1, 1, new THREE.Color(0xFF0000));
    this.voxelChunk.set(1, 0, 1, new THREE.Color(0xFF0000));
    // Recomputed whenever a voxel is added/remove to the model. It is added
    // directly to the modelOffsetTransform.
    this.lastVoxelMesh = this.voxelChunk.toThreeMesh();
    this.modelOffsetTransform.add(this.lastVoxelMesh);
    this.lastVoxelMesh.visible = false;
    // Will be recomputed every time lastVoxelMesh is recomputed. It is also added
    // directly to the modelOffsetTransform.
    this.lastWireframeHelper = new THREE.WireframeHelper(this.lastVoxelMesh,
      0x00ff00);
    this.scene.add(this.lastWireframeHelper);
  }
  // Set to not active by default.
  this.isActive = false;
};

/**
 * Activates a specific node in the tree for editing. The second arg,
 * raycastObjects is used to add/remove objects for raycasting.
 */
ModelTree.prototype.activateNode = function(node, raycastObjects) {
  if (this === node) {
    this.isActive = true;
    this.transformControl.attach(this.rootTransform);
    if (this.parentNode) {
      this.axisHelper.position.copy(this.parentNode.rootTransform.position);
    } else {
      this.axisHelper.position.set(0, 0, 0);
    }
    if (this.lastVoxelMesh) {
      this.lastVoxelMesh.visible = true;
      this.lastWireframeHelper.visible = false;
    } else if (this.starterCubeMesh) {
      this.starterCubeMesh.visible = true;
    }
  } else {
    // Make sure we are deactivated
    if (this.isActive) {
      this.isActive = false;
      if (this.lastVoxelMesh) {
        this.lastVoxelMesh.visible = false;
        this.lastWireframeHelper.visible = true;
      } else if (this.starterCubeMesh) {
        this.starterCubeMesh.visible = false;
      }
    }
  }
  // Send it to all children to make sure everyone is 'disabled' that should be
  this.children.forEach((child) => {
    child.activateNode(node);
  });
  if (this === this.rootNode) {
    this.renderer.render(this.scene, this.camera);
  }
};

/**
 * Adds a new node to the ModelTree off the current node and activates it.
 * Returns the newly added node.
 */
ModelTree.prototype.addNode = function(name) {
  var newNode = new ModelTree(this.pyTransform, this.transformControl,
    this.axisHelper, this.camera, this.renderer, this.scene, this);
  newNode.name = name;
  newNode.rootNode = this.rootNode;
  this.children.push(newNode);
  this.rootNode.activateNode(newNode);
  this.renderer.render(this.scene, this.camera);
  return newNode;
};

/**
 * Updates the entire trees state. This is primarily used to recompute the
 * pyTransform from python code each time.
 */
ModelTree.prototype.update = function() {
  _(this.pySnipets).keys().forEach(path => {
    var pythonCode = this.pySnipets[path];
    var runnable = this.skulptCache_[pythonCode];
    if (!runnable) {
      // Convert the python code to a run function
      pythonCode = 'def run():\n    pass\n' +
        _(pythonCode.split('\n')).map(v => v ? '----' + v : v).join('\n');
      // Create a Skulpt module from it
      var module = Sk.importMainWithBody('<stdin>', false, pythonCode);
      runnable = module.tp$getattr('run');
      this.skulptCache_[pythonCode] = runnable;
    }
    var out = Sk.misceval.callsim(module);
    console.log('Out: ', out);
  });
};

ModelTree.prototype.toJSON = function() {
  var obj = {
    name: this.name,
    id: this.id
  };
  if (!this.rootTransform.position.equals(new THREE.Vector3())) {
    obj.rootTransform = obj.rootTransform || {};
    obj.rootTransform.position = this.rootTransform.position.toArray();
  }
  if (!this.rootTransform.rotation.equals(new THREE.Euler())) {
    obj.rootTransform = obj.rootTransform || {};
    obj.rootTransform.rotation = this.rootTransform.rotation.toArray();
  }
  if (!this.rootTransform.scale.equals(new THREE.Vector3(1, 1, 1))) {
    obj.rootTransform = obj.rootTransform || {};
    obj.rootTransform.scale = this.rootTransform.scale.toArray();
  }
  if (this.pyTransformCode.position) {
    obj.pyTransformCode = obj.pyTransformCode || {};
    obj.pyTransformCode.position = this.pyTransformCode.position;
  }
  if (this.pyTransformCode.rotation) {
    obj.pyTransformCode = obj.pyTransformCode || {};
    obj.pyTransformCode.rotation = this.pyTransformCode.rotation;
  }
  if (this.pyTransformCode.scale) {
    obj.pyTransformCode = obj.pyTransformCode || {};
    obj.pyTransformCode.scale = this.pyTransformCode.scale;
  }
  // TODO(athilenius): Add Python code for pyTransform
  if (this.children.length) {
    obj.children = _(this.children).map(v => v.toJSON());
  }
  if (this.lastVoxelMesh) {
    obj.quads = this.voxelChunk.toVertexList();
  }
  return obj;
};

// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Manages a single voxel chunk of size. Size must be a power of 2!
 * Addressing: Blocks are addressed the same as Minecraft, with y being the
 * upward component.
 */
var VoxelChunk = function(size) {
  this.data = new Array(size * size * size);
  this.size = size;
  this.logViewDist = Math.log2(size);
};

/**
 * Gets the color of the block within the chunk given by x, y, z. Returns
 * undefined if the block is empty or out of bounds.
 */
VoxelChunk.prototype.get = function(x, y, z) {
  if (x < 0 || y < 0 || z < 0 ||
    x >= this.size || y >= this.size || z >= this.size) {
    return undefined;
  }
  return this.data[(((z << this.logViewDist) + x) << this.logViewDist) + y];
};

/**
 * Sets the color of the block within the chunk give by x, y, z. Does nothing if
 * the block is out of bounds.
 */
VoxelChunk.prototype.set = function(x, y, z, color) {
  if (x < 0 || y < 0 || z < 0 ||
    x >= this.size || y >= this.size || z >= this.size) {
    return;
  }
  this.data[(((z << this.logViewDist) + x) << this.logViewDist) + y] = color;
};

/**
 * Renders the chunk out to a vertex list (culling invisible blocks, but does
 * not join like-blocks).
 * This code is adapted from my game engine:
 * https://raw.githubusercontent.com/AThilenius/VoxelCraft/master/VoxelCraftWin/UnManaged/VCChunk.cpp
 */
VoxelChunk.prototype.toVertexList = function() {
  var quads = [];
  // Occlusion Color Corrections
  var v1c = 0.0;
  var v2c = 0.0;
  var v3c = 0.0;
  var v4c = 0.0;
  var v5c = 0.0;
  var v6c = 0.0;
  var v7c = 0.0;
  var v8c = 0.0;
  for (var z = 0; z < this.size; z++) {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        var color = this.get(x, y, z);
        if (!color) {
          continue;
        }
        // Verts
        var v1 = new THREE.Vector3(x, y, z + 1);
        var v2 = new THREE.Vector3(x + 1, y, z + 1);
        var v3 = new THREE.Vector3(x + 1, y + 1, z + 1);
        var v4 = new THREE.Vector3(x, y + 1, z + 1);
        var v5 = new THREE.Vector3(x, y, z);
        var v6 = new THREE.Vector3(x + 1, y, z);
        var v7 = new THREE.Vector3(x + 1, y + 1, z);
        var v8 = new THREE.Vector3(x, y + 1, z);
        var black = new THREE.Color(0, 0, 0);
        // =====   Verticie Computations   =====================================
        // Front face
        if (!this.get(x, y, z + 1)) {
          v1c = v2c = v3c = v4c = 0.0;
          v1c = this.get(x - 1, y - 1, z + 1) ? v1c + 0.2 : v1c;
          v1c = this.get(x - 1, y, z + 1) ? v1c + 0.2 : v1c;
          v4c = this.get(x - 1, y, z + 1) ? v4c + 0.2 : v4c;
          v1c = this.get(x, y - 1, z + 1) ? v1c + 0.2 : v1c;
          v3c = this.get(x, y + 1, z + 1) ? v3c + 0.2 : v3c;
          v4c = this.get(x, y + 1, z + 1) ? v4c + 0.2 : v4c;
          v2c = this.get(x + 1, y - 1, z + 1) ? v2c + 0.2 : v2c;
          v2c = this.get(x + 1, y, z + 1) ? v2c + 0.2 : v2c;
          v3c = this.get(x + 1, y, z + 1) ? v3c + 0.2 : v3c;
          v3c = this.get(x + 1, y + 1, z + 1) ? v3c + 0.2 : v3c;
          quads.push({
            position: v1.toArray(),
            color: color.clone().lerp(black, v1c).toArray()
          });
          quads.push({
            position: v2.toArray(),
            color: color.clone().lerp(black, v2c).toArray()
          });
          quads.push({
            position: v3.toArray(),
            color: color.clone().lerp(black, v3c).toArray()
          });
          quads.push({
            position: v4.toArray(),
            color: color.clone().lerp(black, v4c).toArray()
          });
        }
        //Back face
        if (!this.get(x, y, z - 1)) {
          v5c = v6c = v7c = v8c = 0.0;
          v5c = this.get(x - 1, y - 1, z - 1) ? v5c + 0.2 : v5c;
          v5c = this.get(x - 1, y, z - 1) ? v5c + 0.2 : v5c;
          v8c = this.get(x - 1, y, z - 1) ? v8c + 0.2 : v8c;
          v8c = this.get(x - 1, y + 1, z - 1) ? v8c + 0.2 : v8c;
          v5c = this.get(x, y - 1, z - 1) ? v5c + 0.2 : v5c;
          v7c = this.get(x, y + 1, z - 1) ? v7c + 0.2 : v7c;
          v8c = this.get(x, y + 1, z - 1) ? v8c + 0.2 : v8c;
          v6c = this.get(x + 1, y - 1, z - 1) ? v6c + 0.2 : v6c;
          v6c = this.get(x + 1, y, z - 1) ? v6c + 0.2 : v6c;
          v7c = this.get(x + 1, y, z - 1) ? v7c + 0.2 : v7c;
          v7c = this.get(x + 1, y + 1, z - 1) ? v7c + 0.2 : v7c;
          quads.push({
            position: v6.toArray(),
            color: color.clone().lerp(black, v6c).toArray()
          });
          quads.push({
            position: v5.toArray(),
            color: color.clone().lerp(black, v5c).toArray()
          });
          quads.push({
            position: v8.toArray(),
            color: color.clone().lerp(black, v8c).toArray()
          });
          quads.push({
            position: v7.toArray(),
            color: color.clone().lerp(black, v7c).toArray()
          });
        }
        //Right face
        if (!this.get(x + 1, y, z)) {
          v2c = v3c = v6c = v7c = 0.0;
          v6c = this.get(x + 1, y - 1, z - 1) ? v6c + 0.2 : v6c;
          v6c = this.get(x + 1, y, z - 1) ? v6c + 0.2 : v6c;
          v7c = this.get(x + 1, y, z - 1) ? v7c + 0.2 : v7c;
          v7c = this.get(x + 1, y + 1, z - 1) ? v7c + 0.2 : v7c;
          v2c = this.get(x + 1, y - 1, z) ? v2c + 0.2 : v2c;
          v6c = this.get(x + 1, y - 1, z) ? v6c + 0.2 : v6c;
          v3c = this.get(x + 1, y + 1, z) ? v3c + 0.2 : v3c;
          v7c = this.get(x + 1, y + 1, z) ? v7c + 0.2 : v7c;
          v2c = this.get(x + 1, y - 1, z + 1) ? v2c + 0.2 : v2c;
          v2c = this.get(x + 1, y, z + 1) ? v2c + 0.2 : v2c;
          v3c = this.get(x + 1, y, z + 1) ? v3c + 0.2 : v3c;
          v3c = this.get(x + 1, y + 1, z + 1) ? v3c + 0.2 : v3c;
          quads.push({
            position: v2.toArray(),
            color: color.clone().lerp(black, v2c).toArray()
          });
          quads.push({
            position: v6.toArray(),
            color: color.clone().lerp(black, v6c).toArray()
          });
          quads.push({
            position: v7.toArray(),
            color: color.clone().lerp(black, v7c).toArray()
          });
          quads.push({
            position: v3.toArray(),
            color: color.clone().lerp(black, v3c).toArray()
          });
        }
        //Left face
        if (!this.get(x - 1, y, z)) {
          v1c = v4c = v5c = v8c = 0.0;
          v5c = this.get(x - 1, y - 1, z - 1) ? v5c + 0.2 : v5c;
          v5c = this.get(x - 1, y, z - 1) ? v5c + 0.2 : v5c;
          v8c = this.get(x - 1, y, z - 1) ? v8c + 0.2 : v8c;
          v8c = this.get(x - 1, y + 1, z - 1) ? v8c + 0.2 : v8c;
          v1c = this.get(x - 1, y - 1, z) ? v1c + 0.2 : v1c;
          v5c = this.get(x - 1, y - 1, z) ? v5c + 0.2 : v5c;
          v4c = this.get(x - 1, y + 1, z) ? v4c + 0.2 : v4c;
          v8c = this.get(x - 1, y + 1, z) ? v8c + 0.2 : v8c;
          v1c = this.get(x - 1, y - 1, z + 1) ? v1c + 0.2 : v1c;
          v1c = this.get(x - 1, y, z + 1) ? v1c + 0.2 : v1c;
          v4c = this.get(x - 1, y, z + 1) ? v4c + 0.2 : v4c;
          v4c = this.get(x - 1, y + 1, z + 1) ? v4c + 0.2 : v4c;
          quads.push({
            position: v5.toArray(),
            color: color.clone().lerp(black, v5c).toArray()
          });
          quads.push({
            position: v1.toArray(),
            color: color.clone().lerp(black, v1c).toArray()
          });
          quads.push({
            position: v4.toArray(),
            color: color.clone().lerp(black, v4c).toArray()
          });
          quads.push({
            position: v8.toArray(),
            color: color.clone().lerp(black, v8c).toArray()
          });
        }
        //Top face
        if (!this.get(x, y + 1, z)) {
          v3c = v4c = v7c = v8c = 0.0;
          v8c = this.get(x - 1, y + 1, z - 1) ? v8c + 0.2 : v8c;
          v8c = this.get(x - 1, y + 1, z) ? v8c + 0.2 : v8c;
          v4c = this.get(x - 1, y + 1, z) ? v4c + 0.2 : v4c;
          v4c = this.get(x - 1, y + 1, z + 1) ? v4c + 0.2 : v4c;
          v7c = this.get(x, y + 1, z - 1) ? v7c + 0.2 : v7c;
          v8c = this.get(x, y + 1, z - 1) ? v8c + 0.2 : v8c;
          v3c = this.get(x, y + 1, z + 1) ? v3c + 0.2 : v3c;
          v4c = this.get(x, y + 1, z + 1) ? v4c + 0.2 : v4c;
          v7c = this.get(x + 1, y + 1, z - 1) ? v7c + 0.2 : v7c;
          v7c = this.get(x + 1, y + 1, z) ? v7c + 0.2 : v7c;
          v3c = this.get(x + 1, y + 1, z) ? v3c + 0.2 : v3c;
          v3c = this.get(x + 1, y + 1, z + 1) ? v3c + 0.2 : v3c;
          quads.push({
            position: v4.toArray(),
            color: color.clone().lerp(black, v4c).toArray()
          });
          quads.push({
            position: v3.toArray(),
            color: color.clone().lerp(black, v3c).toArray()
          });
          quads.push({
            position: v7.toArray(),
            color: color.clone().lerp(black, v7c).toArray()
          });
          quads.push({
            position: v8.toArray(),
            color: color.clone().lerp(black, v8c).toArray()
          });
        }
        //Bottom face
        if (!this.get(x, y - 1, z)) {
          v1c = v2c = v5c = v6c = 0.0;
          v5c = this.get(x - 1, y - 1, z - 1) ? v5c + 0.2 : v5c;
          v4c = this.get(x - 1, y - 1, z) ? v4c + 0.2 : v4c;
          v1c = this.get(x - 1, y - 1, z) ? v1c + 0.2 : v1c;
          v1c = this.get(x - 1, y - 1, z + 1) ? v1c + 0.2 : v1c;
          v5c = this.get(x, y - 1, z - 1) ? v5c + 0.2 : v5c;
          v6c = this.get(x, y - 1, z - 1) ? v6c + 0.2 : v6c;
          v1c = this.get(x, y - 1, z + 1) ? v1c + 0.2 : v1c;
          v2c = this.get(x, y - 1, z + 1) ? v2c + 0.2 : v2c;
          v6c = this.get(x + 1, y - 1, z - 1) ? v6c + 0.2 : v6c;
          v6c = this.get(x + 1, y - 1, z) ? v6c + 0.2 : v6c;
          v2c = this.get(x + 1, y - 1, z) ? v2c + 0.2 : v2c;
          v2c = this.get(x + 1, y - 1, z + 1) ? v2c + 0.2 : v2c;
          quads.push({
            position: v1.toArray(),
            color: color.clone().lerp(black, v1c).toArray()
          });
          quads.push({
            position: v5.toArray(),
            color: color.clone().lerp(black, v5c).toArray()
          });
          quads.push({
            position: v6.toArray(),
            color: color.clone().lerp(black, v6c).toArray()
          });
          quads.push({
            position: v2.toArray(),
            color: color.clone().lerp(black, v2c).toArray()
          });
        }
      }
    }
  }
  return quads;
};

/**
 * Creates a THREE.js Mesh from the chunk using colored verts.
 */
VoxelChunk.prototype.toThreeMesh = function(scale) {
  scale = scale || 10;
  var geometry = new THREE.Geometry();
  var quads = this.toVertexList();
  var face = null;
  for (var i = 0; i < quads.length; i += 4) {
    var q1 = quads[i];
    var q2 = quads[i + 1];
    var q3 = quads[i + 2];
    var q4 = quads[i + 3];
    // Verts
    geometry.vertices.push(new THREE.Vector3(
      q1.position[0] * scale, q1.position[1] * scale, q1.position[2] *
      scale));
    geometry.vertices.push(new THREE.Vector3(
      q2.position[0] * scale, q2.position[1] * scale, q2.position[2] *
      scale));
    geometry.vertices.push(new THREE.Vector3(
      q3.position[0] * scale, q3.position[1] * scale, q3.position[2] *
      scale));
    geometry.vertices.push(new THREE.Vector3(
      q4.position[0] * scale, q4.position[1] * scale, q4.position[2] *
      scale));
    // Colors
    geometry.colors.push(
      new THREE.Color(q1.color[0], q1.color[1], q1.color[2]));
    geometry.colors.push(
      new THREE.Color(q2.color[0], q2.color[1], q2.color[2]));
    geometry.colors.push(
      new THREE.Color(q3.color[0], q3.color[1], q3.color[2]));
    geometry.colors.push(
      new THREE.Color(q4.color[0], q4.color[1], q4.color[2]));
    // First Face + colors
    face = new THREE.Face3(i, i + 2, i + 3);
    geometry.faces.push(face);
    face.vertexColors[0] = new THREE.Color(q1.color[0], q1.color[1], q1.color[
      2]);
    face.vertexColors[1] = new THREE.Color(q3.color[0], q3.color[1], q3.color[
      2]);
    face.vertexColors[2] = new THREE.Color(q4.color[0], q4.color[1], q4.color[
      2]);
    geometry.faces.push(face);
    // Second Face + colors
    face = new THREE.Face3(i, i + 1, i + 2);
    face.vertexColors[0] = new THREE.Color(q1.color[0], q1.color[1], q1.color[
      2]);
    face.vertexColors[1] = new THREE.Color(q2.color[0], q2.color[1], q2.color[
      2]);
    face.vertexColors[2] = new THREE.Color(q3.color[0], q3.color[1], q3.color[
      2]);
    geometry.faces.push(face);
  }
  geometry.computeFaceNormals();
  var material = new THREE.MeshPhongMaterial({
    // side: THREE.DoubleSide,
    vertexColors: THREE.FaceColors
  });
  return new THREE.Mesh(geometry, material);
};

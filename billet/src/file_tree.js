// Copyright 2015 Alec Thilenius
// All rights reserved.

var _ = require('underscore');
var extend = require('util')._extend;

/**
 * Manages a file tree backed by a list of diffs. Diffs can be added and a new
 * tree layout will be computed.
 */
function FileTree() {
  this.treeLayout = [];
  this.oldDiffs_ = [];
};

/**
 * Converts a path (given as an array or '/' seperated string) and
 * sanitizes it, returning the path as an array.
 */
FileTree.prototype.sanitizePath = function(path) {
  if (typeof path === 'string') {
    path = path.split('/');
  }
  // Filter out empty segments
  path = _(path).filter((segment) => {
    return segment;
  });
  var parentArray = path.slice(0, -1);
  var nameArray = path.slice(-1);
  return {
    fullArray: path,
    fullString: path.join('/'),
    parentArray,
    parentString: parentArray.join('/'),
    nameArray,
    name: nameArray.join()
  };
};

/**
 * Gets the node at the given path. If createParent is set to true, any
 * needed parent paths will also be created as well as the node.
 */
FileTree.prototype.getNodeAtPath = function(path, createParent) {
  path = this.sanitizePath(path).fullArray;
  // This version supports zero length paths (returns the root)
  if (!path.length) {
    return {
      type: 'directory',
      root: true,
      children: this.treeLayout
    };
  }
  var getRecursive = (children, remainingPath, currentPath) => {
    currentPath = currentPath + '/' + remainingPath[0];
    // Check if the node already exists
    var existing = _(children).find((node) => {
      return node.name === remainingPath[0];
    });
    if (existing) {
      if (remainingPath.length === 1) {
        return existing;
      } else {
        return getRecursive(existing.children,
          remainingPath.slice(1), currentPath);
      }
    } else if (!createParent) {
      return null;
    }
    var newNode = {
      type: 'directory',
      name: remainingPath[0],
      path: currentPath,
      children: []
    };
    children.push(newNode);
    if (remainingPath.length === 1) {
      return newNode;
    } else {
      return getRecursive(newNode.children,
        remainingPath.slice(1), currentPath);
    }
  };
  return getRecursive(this.treeLayout, path, '');
};

/**
 * Adds a list of diffs but skips diffs that have already been computed against
 * the active tree layout.
 */
FileTree.prototype.applyDiffs = function(newDiffs) {
  newDiffs.slice(this.oldDiffs_.length).forEach((diff) => {
    this.applyDiff_(diff);
    this.oldDiffs_.push(diff);
  });
};

/**
 * Applies a single diff to the treeLayout in a robust way.
 */
FileTree.prototype.applyDiff_ = function(diff) {
  if (diff.opType === 'create') {
    var node = this.getNodeAtPath(diff.targetPath, true);
    extend(node, diff.metaData);
  } else if (diff.opType === 'move') {
    // Find root of the path, remove it's child, store it in new path
    var sourcePath = this.sanitizePath(diff.sourcePath);
    var targetPath = this.sanitizePath(diff.targetPath);
    var sourceParentChildren = null;
    if (sourcePath.parentArray.length) {
      var sourceParentNode = this.getNodeAtPath(sourcePath.parentArray);
      if (!sourceParentNode) {
        console.error('Failed to find source of move diff');
        return false;
      }
      sourceParentChildren = sourceParentNode.children;
    } else {
      sourceParentChildren = this.treeLayout;
    }
    var node = sourceParentChildren.find((node) => {
      return node.name === sourcePath.name;
    });
    if (!node) {
      console.error('Failed to find source of move diff');
      return false;
    }
    node.name = targetPath.name;
    node.path = targetPath.fullString;
    if (sourcePath.parentString === targetPath.parentString) {
      // Just rename the file, don't 'move' it
      return true;
    }
    var nodeIndex = sourceParentChildren.indexOf(node);
    if (nodeIndex > -1) {
      sourceParentChildren.splice(nodeIndex, 1);
    }
    var targetNode =
      this.getNodeAtPath(targetPath.parentArray, true);
    targetNode.children.push(node);
  } else if (diff.opType === 'remove') {
    var targetPath = this.sanitizePath(diff.targetPath);
    var targetParentChildren = null;
    if (targetPath.parentArray.length) {
      var targetParentNode = this.getNodeAtPath(targetPath.parentArray);
      if (!targetParentNode) {
        console.error('Failed to find parent node of remove diff');
        return false;
      }
      targetParentChildren = targetParentNode.children;
    } else {
      targetParentChildren = this.treeLayout;
    }
    var node = targetParentChildren.find((node) => {
      return node.name === targetPath.name;
    });
    if (!node) {
      console.error('Failed to find target node of remove diff');
      return false;
    }
    var nodeIndex = targetParentChildren.indexOf(node);
    if (nodeIndex > -1) {
      targetParentChildren.splice(nodeIndex, 1);
    }
  } else {
    console.error('Unsupported File Tree Diff Type! Diff: ', diff);
  }
  return true;
};

exports.FileTree = FileTree;

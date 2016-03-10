// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Manages a file tree. Internally this is a list of diffs, meaning changes can
 * always be undone (and can never be deleted).
 * On the surface it presents this data as a tree, and a flat list of items, as
 * well as an API to manipulate them.
 */
angular.module('app').factory('FileTree', [
  '$timeout', '$compile', 'Project', 'atDockspawn',
  function($timeout, $compile, Project, atDockspawn) {
    return function(project) {

      this.project_ = project;

      this.treeLayout = [];

      /**
       * Adds a file (as a diff) to the file tree and computes where it belongs
       * in the treeLayout. Returns true if the file was added, false if it was
       * a duplicate.
       */
      this.addFile = function(targetPath) {
        targetPath = this.sanitizePath(targetPath).fullString;
        if (this.getNodeAtPath(targetPath)) {
          return false;
        }
        var diff = {
          targetPath,
          opType: 'create',
          metaData: {
            type: 'file',
            otDocId: newShortUuid()
          }
        };
        this.project_.fileTree.push(diff);
        this.project_.$save();
        this.applyDiff_(diff);
        return true;
      };

      /**
       * Adds a directory (as a diff) to the file tree and computes where it
       * belongs in the treeLayout. Returns true if the file was added, false if
       * it was a duplicate.
       */
      this.addDirectory = function(targetPath) {
        targetPath = this.sanitizePath(targetPath).fullString;
        if (this.getNodeAtPath(targetPath)) {
          return false;
        }
        var diff = {
          targetPath,
          opType: 'create',
          metaData: {
            type: 'directory'
          }
        };
        this.project_.fileTree.push(diff);
        this.project_.$save();
        this.applyDiff_(diff);
        return true;
      };

      this.moveItem = function(sourcePath, targetPath) {
        sourcePath = this.sanitizePath(sourcePath).fullString;
        targetPath = this.sanitizePath(targetPath).fullString;
        if (this.getNodeAtPath(targetPath)) {
          return false;
        }
        var diff = {
          sourcePath,
          targetPath,
          opType: 'move'
        };
        this.project_.fileTree.push(diff);
        this.project_.$save();
        this.applyDiff_(diff);
        return true;
      };

      this.removeItem = function(targetPath) {
        targetPath = this.sanitizePath(targetPath).fullString;
        if (!this.getNodeAtPath(targetPath)) {
          console.error('Failed to get node for remove at: ',
            targetPath);
          return false;
        }
        var diff = {
          targetPath,
          opType: 'remove'
        };
        this.project_.fileTree.push(diff);
        this.project_.$save();
        this.applyDiff_(diff);
        return true;
      };

      this.updateItem = function(item) {
        console.error('Not Implemented');
      };

      /**
       * Converts a path (given as an array or '/' seperated string) and
       * sanitizes it, returning the path as an array.
       */
      this.sanitizePath = function(path) {
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
      this.getNodeAtPath = function(path, createParent) {
        path = this.sanitizePath(path).fullArray;
        if (!path.length) {
          console.error('Zero Length Path');
          return null;
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
              return getRecursive(existing.children, remainingPath.slice(
                  1),
                currentPath);
            }
          } else if (!createParent) {
            return null;
          }
          var newNode = {
            type: 'directory',
            name: remainingPath[0],
            path: currentPath,
            children: [],
            ephemeral: {}
          };
          children.push(newNode);
          if (remainingPath.length === 1) {
            return newNode;
          } else {
            return getRecursive(newNode.children, remainingPath.slice(
                1),
              currentPath);
          }
        };
        return getRecursive(this.treeLayout, path, '');
      };

      /**
       * Opens a editor tab with the otDocId OT Doc loaded into it.
       */
      this.openFile = function(path) {
        var node = this.getNodeAtPath(path);
        if (!node || !node.otDocId) {
          console.error('Failed to find file at path: ', path);
          return false;
        }
        // TODO(athilenius): Check for open docs? Or leave this to ACE?
        // Create the DockSpawn window with ACE in it
        node.dsData = {};
        node.dsData.domElement = angular.element(
          '<div class="fill" at-ace-editor name="name" otDocId="otDocId"></div>'
        )[0];
        angular.element(document.getElementsByTagName('body')).append(
          node.dsData.domElement);
        $compile(node.dsData.domElement)({
          name: node.name,
          otDocId: node.otDocId
        });
        node.dsData.panelContainer = new dockspawn.PanelContainer(
          node.dsData.domElement,
          atDockspawn.dockManager);
        // Set panel attributes
        node.dsData.panelContainer.setTitle(node.name);
        node.dsData.dockNode = atDockspawn.dockManager.dockFill(
          atDockspawn.documentNode, node.dsData.panelContainer);
        node.dsData.panelContainer.onClose = (container) => {
          delete node.dsData;
        };
      };

      /**
       * Applies a single diff to the treeLayout in a robust way.
       */
      this.applyDiff_ = function(diff) {
        if (diff.opType === 'create') {
          var node = this.getNodeAtPath(diff.targetPath, true);
          angular.extend(node, diff.metaData);
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

      // Ensure the project has a fileTree field
      if (!this.project_.fileTree) {
        this.project_.fileTree = [];
        this.project_.$save();
      }
      // Add all diffs
      this.project_.fileTree.forEach((diff) => {
        this.applyDiff_(diff);
      });

    };
  }
]);

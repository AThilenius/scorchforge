// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

app.service('data', ['$rootScope', '$mdToast', 'Person', 'Workspace', 'Project',
  'ProjectShare', 'FileTree', 'CursorTracker', 'atTextDialog',
  function($rootScope, $mdToast, Person, Workspace, Project, ProjectShare,
    FileTree, CursorTracker, atTextDialog) {

    this.person = null;

    this.workspaces = [];
    this.activeWorkspace = null;

    this.projects = [];
    this.sharedProjects = [];
    this.activeProject = null;

    this.activeFileTree = null;
    this.activeCursorTracker = null;

    this.saveActivePerson = function() {};

    this.activateWorkspace = function(workspace) {
      this.activateProject(null);
      this.activeWorkspace = workspace;
      this.projects = [];
      this.sharedProjects = [];
      if (workspace) {
        // Load Projects
        Workspace.projects({
            id: workspace.id
          })
          .$promise.then((projects) => {
            this.projects = projects;
          });
        Workspace.sharedProjects({
            id: workspace.id
          })
          .$promise.then((projects) => {
            this.sharedProjects = projects;
          });
      }
    };

    this.addWorkspace = function() {
      var that = this;
      atTextDialog({
        title: 'Workspace Name',
        content: 'New Workspace Name',
        done: (val) => {
          Person.workspaces.create({
            id: that.person.id
          }, {
            name: val
          }, (workspace) => {
            that.workspaces.push(workspace);
            that.activateWorkspace(workspace);
            $mdToast.show($mdToast.simple()
              .textContent(`Workspace ${val} created!`)
              .position('top right')
              .hideDelay(3000)
              .theme('success')
            );
          });
        }
      });
    };

    this.saveActiveWorkspace = function() {};

    this.activateProject = function(project) {
      if (this.activeFileTree) {
        this.activeFileTree.closeAllWindows();
      }
      this.activeProject = project;
      this.activeFileTree = null;
      if (this.activeCursorTracker) {
        this.activeCursorTracker.release();
        this.activeCursorTracker = null;
      }
      if (project) {
        this.activeFileTree = new FileTree(project);
        this.activeCursorTracker = new CursorTracker(this.person, project);
      }
    };

    this.addProject = function() {
      if (!this.activeWorkspace) {
        console.error(
          'Cannot create a project without an active workspace');
        return;
      }
      var that = this;
      atTextDialog({
        title: 'Project Name',
        content: 'New Project Name',
        done: (val) => {
          Workspace.projects.create({
            id: that.activeWorkspace.id
          }, {
            name: val
          }, (project) => {
            that.projects.push(project);
            that.activateProject(project);
            $mdToast.show($mdToast.simple()
              .textContent(`Project ${val} created!`)
              .position('top right')
              .hideDelay(3000)
              .theme('success')
            );
          });
        }
      });
    };

    this.addSharedProject = function() {
      if (!this.activeWorkspace) {
        console.error(
          'Cannot create a project without an active workspace');
        return;
      }
      var that = this;
      atTextDialog({
        title: 'Project Share ID',
        content: 'Project Share ID',
        done: (sharedProjectId) => {
          // Make sure the project exists
          Project.findById({
            id: sharedProjectId
          }, (project) => {
            ProjectShare.create({
              workspaceId: that.activeWorkspace.id,
              projectId: sharedProjectId,
            }, (projectLink) => {
              that.projects.push(project);
              that.activateProject(project);
              $mdToast.show($mdToast.simple()
                .textContent(
                  `Project ${project.name} added!`)
                .position('top right')
                .hideDelay(3000)
                .theme('success'));
            });
          }, (err) => {
            $mdToast.show($mdToast.simple()
              .textContent('Project does not exist!')
              .position('top right')
              .hideDelay(6000)
              .theme('failure'));
          });
        }
      });
    };

    this.saveActiveProject = function() {};

    /**
     * Used in conjunction with Person.logout()
     */
    this.flushData = function() {
      this.activateProject(null);
      this.activateWorkspace(null);
      this.projects = [];
      this.workspaces = [];
      this.person = null;
      this.activeFileTree = null;
    };

    /**
     * Loads all data from the active LoopBack 'Person'
     */
    this.loadAllData = function() {
      // Load Workspaces Lambda
      var loadWorkspaces = (personId) => {
        workspace = Person.workspaces({
            id: personId
          })
          .$promise.then((workspaces) => {
            this.workspaces = this.workspaces.concat(workspaces);
          });
      };
      // Load Person Lambda
      var loadPerson = () => {
        Person.getCurrent((person) => {
          this.person = person;
          loadWorkspaces(person.id);
        });
      };
      this.flushData();
      loadPerson();
      // TODO(athilenius): I can switch back to a standard LoopBack Include.
      // Also need to change line:
      // file_tree.js: this.parse_:this.project_.$save()
    };

  }
]);

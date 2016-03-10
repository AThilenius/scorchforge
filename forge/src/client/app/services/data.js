// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

app.service('data', ['$rootScope', '$mdToast', 'Person', 'Workspace', 'Project',
  'FileTree', 'atTextDialog',
  function($rootScope, $mdToast, Person, Workspace, Project, FileTree,
    atTextDialog) {

    this.person = null;

    this.workspaces = [];
    this.activeWorkspace = null;

    this.projects = [];
    this.sharedProjects = [];
    this.activeProject = null;

    this.activeFileTree = null;

    this.saveActivePerson = function() {};

    this.activateWorkspace = function(workspace) {
      if (!workspace) {
        this.activeWorkspace = null;
      } else {
        this.activeWorkspace = workspace;
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
      if (!project) {
        this.activeProject = null;
        this.activeFileTree = null;
      } else {
        this.activeProject = project;
        this.activeFileTree = new FileTree(project);
      }
    };

    this.addProject = function() {
      if (!this.activeWorkspace) {
        console.error('Cannot create a project without an active workspace');
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
      // Load Project Lambda
      var loadProjects = (workspaceId) => {
        Workspace.projects({
            id: workspaceId
          })
          .$promise.then((projects) => {
            this.projects = this.projects.concat(projects);
            projects.forEach((project) => {
              // Need to load the file tree? Or defer that till the project
              // is activated?
            });
          });
        Workspace.sharedProjects({
            id: workspaceId
          })
          .$promise.then((projects) => {
            this.sharedProjects = this.sharedProjects.concat(projects);
            projects.forEach((project) => {
              // Need to load the file tree? Or defer that till the project
              // is activated?
            });
          });
      };
      // Load Workspaces Lambda
      var loadWorkspaces = (personId) => {
        workspace = Person.workspaces({
            id: personId
          })
          .$promise.then((workspaces) => {
            this.workspaces = this.workspaces.concat(workspaces);
            workspaces.forEach((workspace) => {
              loadProjects(workspace.id);
            });
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

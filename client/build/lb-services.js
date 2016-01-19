(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Person
 * @header lbServices.Person
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Person` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Person",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/People/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__findById__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__updateById__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Person.classes.findById() instead.
        "prototype$__findById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "GET"
        },

        // INTERNAL. Use Person.classes.destroyById() instead.
        "prototype$__destroyById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Person.classes.updateById() instead.
        "prototype$__updateById__classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Person.assignmentRuns.findById() instead.
        "prototype$__findById__assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "GET"
        },

        // INTERNAL. Use Person.assignmentRuns.destroyById() instead.
        "prototype$__destroyById__assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Person.assignmentRuns.updateById() instead.
        "prototype$__updateById__assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Person.workspace() instead.
        "prototype$__get__workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "GET"
        },

        // INTERNAL. Use Person.workspace.create() instead.
        "prototype$__create__workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "POST"
        },

        // INTERNAL. Use Person.workspace.update() instead.
        "prototype$__update__workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "PUT"
        },

        // INTERNAL. Use Person.workspace.destroy() instead.
        "prototype$__destroy__workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__get__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Queries accessTokens of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/People/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__create__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/People/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__delete__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/People/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$__count__accessTokens
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Counts accessTokens of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/People/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Person.classes() instead.
        "prototype$__get__classes": {
          isArray: true,
          url: urlBase + "/People/:id/classes",
          method: "GET"
        },

        // INTERNAL. Use Person.classes.create() instead.
        "prototype$__create__classes": {
          url: urlBase + "/People/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use Person.classes.destroyAll() instead.
        "prototype$__delete__classes": {
          url: urlBase + "/People/:id/classes",
          method: "DELETE"
        },

        // INTERNAL. Use Person.classes.count() instead.
        "prototype$__count__classes": {
          url: urlBase + "/People/:id/classes/count",
          method: "GET"
        },

        // INTERNAL. Use Person.assignmentRuns() instead.
        "prototype$__get__assignmentRuns": {
          isArray: true,
          url: urlBase + "/People/:id/assignmentRuns",
          method: "GET"
        },

        // INTERNAL. Use Person.assignmentRuns.create() instead.
        "prototype$__create__assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns",
          method: "POST"
        },

        // INTERNAL. Use Person.assignmentRuns.destroyAll() instead.
        "prototype$__delete__assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns",
          method: "DELETE"
        },

        // INTERNAL. Use Person.assignmentRuns.count() instead.
        "prototype$__count__assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#create
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/People",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#createMany
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/People",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#upsert
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/People",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#exists
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/People/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#findById
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/People/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#find
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/People",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#findOne
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/People/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#updateAll
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/People/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#deleteById
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/People/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#count
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/People/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#prototype$updateAttributes
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/People/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#createChangeStream
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/People/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#login
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/People/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#logout
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/People/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#confirm
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/People/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#resetPassword
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/People/reset",
          method: "POST"
        },

        // INTERNAL. Use Project.person() instead.
        "::get::Project::person": {
          url: urlBase + "/Projects/:id/person",
          method: "GET"
        },

        // INTERNAL. Use Enrolled.person() instead.
        "::get::Enrolled::person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "GET"
        },

        // INTERNAL. Use Enrolled.person.create() instead.
        "::create::Enrolled::person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "POST"
        },

        // INTERNAL. Use Enrolled.person.createMany() instead.
        "::createMany::Enrolled::person": {
          isArray: true,
          url: urlBase + "/Enrolleds/:id/person",
          method: "POST"
        },

        // INTERNAL. Use Enrolled.person.update() instead.
        "::update::Enrolled::person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "PUT"
        },

        // INTERNAL. Use Enrolled.person.destroy() instead.
        "::destroy::Enrolled::person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.person() instead.
        "::get::Workspace::person": {
          url: urlBase + "/Workspaces/:id/person",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Person#getCurrent
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/People" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Person#updateOrCreate
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Person#update
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Person#destroyById
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Person#removeById
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Person#getCachedCurrent
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Person#login} or
         * {@link lbServices.Person#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Person instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Person#isAuthenticated
         * @methodOf lbServices.Person
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Person#getCurrentId
         * @methodOf lbServices.Person
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Person#modelName
    * @propertyOf lbServices.Person
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Person`.
    */
    R.modelName = "Person";

    /**
     * @ngdoc object
     * @name lbServices.Person.classes
     * @header lbServices.Person.classes
     * @object
     * @description
     *
     * The object `Person.classes` groups methods
     * manipulating `Class` instances related to `Person`.
     *
     * Call {@link lbServices.Person#classes Person.classes()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Person#classes
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Queries classes of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::get::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#count
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Counts classes of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.classes.count = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::count::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#create
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Creates a new instance in classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.create = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::create::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#createMany
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Creates a new instance in classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.createMany = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::createMany::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#destroyAll
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Deletes all classes of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.classes.destroyAll = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::delete::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#destroyById
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Delete a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.classes.destroyById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::destroyById::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#findById
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Find a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.findById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::findById::Person::classes"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.classes#updateById
         * @methodOf lbServices.Person.classes
         *
         * @description
         *
         * Update a related item by id for classes.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for classes
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R.classes.updateById = function() {
          var TargetResource = $injector.get("Class");
          var action = TargetResource["::updateById::Person::classes"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Person.assignmentRuns
     * @header lbServices.Person.assignmentRuns
     * @object
     * @description
     *
     * The object `Person.assignmentRuns` groups methods
     * manipulating `AssignmentRun` instances related to `Person`.
     *
     * Call {@link lbServices.Person#assignmentRuns Person.assignmentRuns()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Person#assignmentRuns
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Queries assignmentRuns of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R.assignmentRuns = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::get::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#count
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Counts assignmentRuns of Person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.assignmentRuns.count = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::count::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#create
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Creates a new instance in assignmentRuns of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R.assignmentRuns.create = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::create::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#createMany
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Creates a new instance in assignmentRuns of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R.assignmentRuns.createMany = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::createMany::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#destroyAll
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Deletes all assignmentRuns of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.assignmentRuns.destroyAll = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::delete::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#destroyById
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Delete a related item by id for assignmentRuns.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for assignmentRuns
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.assignmentRuns.destroyById = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::destroyById::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#findById
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Find a related item by id for assignmentRuns.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for assignmentRuns
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R.assignmentRuns.findById = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::findById::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.assignmentRuns#updateById
         * @methodOf lbServices.Person.assignmentRuns
         *
         * @description
         *
         * Update a related item by id for assignmentRuns.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for assignmentRuns
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R.assignmentRuns.updateById = function() {
          var TargetResource = $injector.get("AssignmentRun");
          var action = TargetResource["::updateById::Person::assignmentRuns"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Person.workspace
     * @header lbServices.Person.workspace
     * @object
     * @description
     *
     * The object `Person.workspace` groups methods
     * manipulating `Workspace` instances related to `Person`.
     *
     * Call {@link lbServices.Person#workspace Person.workspace()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Person#workspace
         * @methodOf lbServices.Person
         *
         * @description
         *
         * Fetches hasOne relation workspace.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R.workspace = function() {
          var TargetResource = $injector.get("Workspace");
          var action = TargetResource["::get::Person::workspace"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.workspace#create
         * @methodOf lbServices.Person.workspace
         *
         * @description
         *
         * Creates a new instance in workspace of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R.workspace.create = function() {
          var TargetResource = $injector.get("Workspace");
          var action = TargetResource["::create::Person::workspace"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.workspace#createMany
         * @methodOf lbServices.Person.workspace
         *
         * @description
         *
         * Creates a new instance in workspace of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R.workspace.createMany = function() {
          var TargetResource = $injector.get("Workspace");
          var action = TargetResource["::createMany::Person::workspace"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.workspace#destroy
         * @methodOf lbServices.Person.workspace
         *
         * @description
         *
         * Deletes workspace of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.workspace.destroy = function() {
          var TargetResource = $injector.get("Workspace");
          var action = TargetResource["::destroy::Person::workspace"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Person.workspace#update
         * @methodOf lbServices.Person.workspace
         *
         * @description
         *
         * Update workspace of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R.workspace.update = function() {
          var TargetResource = $injector.get("Workspace");
          var action = TargetResource["::update::Person::workspace"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Project
 * @header lbServices.Project
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Project` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Project",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Projects/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Project.person() instead.
        "prototype$__get__person": {
          url: urlBase + "/Projects/:id/person",
          method: "GET"
        },

        // INTERNAL. Use Project.sourceFiles.findById() instead.
        "prototype$__findById__sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "GET"
        },

        // INTERNAL. Use Project.sourceFiles.destroyById() instead.
        "prototype$__destroyById__sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Project.sourceFiles.updateById() instead.
        "prototype$__updateById__sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Project.sourceFiles() instead.
        "prototype$__get__sourceFiles": {
          isArray: true,
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "GET"
        },

        // INTERNAL. Use Project.sourceFiles.create() instead.
        "prototype$__create__sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "POST"
        },

        // INTERNAL. Use Project.sourceFiles.destroyAll() instead.
        "prototype$__delete__sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "DELETE"
        },

        // INTERNAL. Use Project.sourceFiles.count() instead.
        "prototype$__count__sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#create
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Projects",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#createMany
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Projects",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#upsert
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Projects",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#exists
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Projects/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#findById
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Projects/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#find
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Projects",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#findOne
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Projects/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#updateAll
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Projects/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#deleteById
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Projects/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#count
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Projects/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#prototype$updateAttributes
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Projects/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Project#createChangeStream
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Projects/change-stream",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.project() instead.
        "::get::SourceFile::project": {
          url: urlBase + "/SourceFiles/:id/project",
          method: "GET"
        },

        // INTERNAL. Use Assignment.project() instead.
        "::get::Assignment::project": {
          url: urlBase + "/Assignments/:id/project",
          method: "GET"
        },

        // INTERNAL. Use Assignment.project.create() instead.
        "::create::Assignment::project": {
          url: urlBase + "/Assignments/:id/project",
          method: "POST"
        },

        // INTERNAL. Use Assignment.project.createMany() instead.
        "::createMany::Assignment::project": {
          isArray: true,
          url: urlBase + "/Assignments/:id/project",
          method: "POST"
        },

        // INTERNAL. Use Assignment.project.update() instead.
        "::update::Assignment::project": {
          url: urlBase + "/Assignments/:id/project",
          method: "PUT"
        },

        // INTERNAL. Use Assignment.project.destroy() instead.
        "::destroy::Assignment::project": {
          url: urlBase + "/Assignments/:id/project",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.projects.findById() instead.
        "::findById::Workspace::projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "GET"
        },

        // INTERNAL. Use Workspace.projects.destroyById() instead.
        "::destroyById::Workspace::projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.projects.updateById() instead.
        "::updateById::Workspace::projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Workspace.projects() instead.
        "::get::Workspace::projects": {
          isArray: true,
          url: urlBase + "/Workspaces/:id/projects",
          method: "GET"
        },

        // INTERNAL. Use Workspace.projects.create() instead.
        "::create::Workspace::projects": {
          url: urlBase + "/Workspaces/:id/projects",
          method: "POST"
        },

        // INTERNAL. Use Workspace.projects.createMany() instead.
        "::createMany::Workspace::projects": {
          isArray: true,
          url: urlBase + "/Workspaces/:id/projects",
          method: "POST"
        },

        // INTERNAL. Use Workspace.projects.destroyAll() instead.
        "::delete::Workspace::projects": {
          url: urlBase + "/Workspaces/:id/projects",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.projects.count() instead.
        "::count::Workspace::projects": {
          url: urlBase + "/Workspaces/:id/projects/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Project#updateOrCreate
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Project#update
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Project#destroyById
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Project#removeById
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Project#modelName
    * @propertyOf lbServices.Project
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Project`.
    */
    R.modelName = "Project";


        /**
         * @ngdoc method
         * @name lbServices.Project#person
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Fetches belongsTo relation person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::get::Project::person"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Project.sourceFiles
     * @header lbServices.Project.sourceFiles
     * @object
     * @description
     *
     * The object `Project.sourceFiles` groups methods
     * manipulating `SourceFile` instances related to `Project`.
     *
     * Call {@link lbServices.Project#sourceFiles Project.sourceFiles()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Project#sourceFiles
         * @methodOf lbServices.Project
         *
         * @description
         *
         * Queries sourceFiles of Project.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R.sourceFiles = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::get::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#count
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Counts sourceFiles of Project.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.sourceFiles.count = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::count::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#create
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Creates a new instance in sourceFiles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R.sourceFiles.create = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::create::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#createMany
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Creates a new instance in sourceFiles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R.sourceFiles.createMany = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::createMany::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#destroyAll
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Deletes all sourceFiles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sourceFiles.destroyAll = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::delete::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#destroyById
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Delete a related item by id for sourceFiles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sourceFiles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sourceFiles.destroyById = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::destroyById::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#findById
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Find a related item by id for sourceFiles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sourceFiles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R.sourceFiles.findById = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::findById::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Project.sourceFiles#updateById
         * @methodOf lbServices.Project.sourceFiles
         *
         * @description
         *
         * Update a related item by id for sourceFiles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sourceFiles
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R.sourceFiles.updateById = function() {
          var TargetResource = $injector.get("SourceFile");
          var action = TargetResource["::updateById::Project::sourceFiles"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.SourceFile
 * @header lbServices.SourceFile
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `SourceFile` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "SourceFile",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/SourceFiles/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use SourceFile.project() instead.
        "prototype$__get__project": {
          url: urlBase + "/SourceFiles/:id/project",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.findById() instead.
        "prototype$__findById__commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.destroyById() instead.
        "prototype$__destroyById__commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits.updateById() instead.
        "prototype$__updateById__commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "PUT"
        },

        // INTERNAL. Use SourceFile.stagedCommit() instead.
        "prototype$__get__stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.stagedCommit.create() instead.
        "prototype$__create__stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.stagedCommit.update() instead.
        "prototype$__update__stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "PUT"
        },

        // INTERNAL. Use SourceFile.stagedCommit.destroy() instead.
        "prototype$__destroy__stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits() instead.
        "prototype$__get__commits": {
          isArray: true,
          url: urlBase + "/SourceFiles/:id/commits",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.create() instead.
        "prototype$__create__commits": {
          url: urlBase + "/SourceFiles/:id/commits",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.commits.destroyAll() instead.
        "prototype$__delete__commits": {
          url: urlBase + "/SourceFiles/:id/commits",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits.count() instead.
        "prototype$__count__commits": {
          url: urlBase + "/SourceFiles/:id/commits/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#create
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/SourceFiles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#createMany
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/SourceFiles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#upsert
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/SourceFiles",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#exists
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/SourceFiles/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#findById
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/SourceFiles/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#find
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/SourceFiles",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#findOne
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/SourceFiles/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#updateAll
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/SourceFiles/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#deleteById
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/SourceFiles/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#count
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/SourceFiles/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#prototype$updateAttributes
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/SourceFiles/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#createChangeStream
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/SourceFiles/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Project.sourceFiles.findById() instead.
        "::findById::Project::sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "GET"
        },

        // INTERNAL. Use Project.sourceFiles.destroyById() instead.
        "::destroyById::Project::sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Project.sourceFiles.updateById() instead.
        "::updateById::Project::sourceFiles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Projects/:id/sourceFiles/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Project.sourceFiles() instead.
        "::get::Project::sourceFiles": {
          isArray: true,
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "GET"
        },

        // INTERNAL. Use Project.sourceFiles.create() instead.
        "::create::Project::sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "POST"
        },

        // INTERNAL. Use Project.sourceFiles.createMany() instead.
        "::createMany::Project::sourceFiles": {
          isArray: true,
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "POST"
        },

        // INTERNAL. Use Project.sourceFiles.destroyAll() instead.
        "::delete::Project::sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles",
          method: "DELETE"
        },

        // INTERNAL. Use Project.sourceFiles.count() instead.
        "::count::Project::sourceFiles": {
          url: urlBase + "/Projects/:id/sourceFiles/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.SourceFile#updateOrCreate
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#update
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#destroyById
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.SourceFile#removeById
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SourceFile` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.SourceFile#modelName
    * @propertyOf lbServices.SourceFile
    * @description
    * The name of the model represented by this $resource,
    * i.e. `SourceFile`.
    */
    R.modelName = "SourceFile";


        /**
         * @ngdoc method
         * @name lbServices.SourceFile#project
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Fetches belongsTo relation project.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.project = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::get::SourceFile::project"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.SourceFile.commits
     * @header lbServices.SourceFile.commits
     * @object
     * @description
     *
     * The object `SourceFile.commits` groups methods
     * manipulating `Commit` instances related to `SourceFile`.
     *
     * Call {@link lbServices.SourceFile#commits SourceFile.commits()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.SourceFile#commits
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Queries commits of SourceFile.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.commits = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::get::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#count
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Counts commits of SourceFile.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.commits.count = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::count::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#create
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Creates a new instance in commits of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.commits.create = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::create::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#createMany
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Creates a new instance in commits of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.commits.createMany = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::createMany::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#destroyAll
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Deletes all commits of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.commits.destroyAll = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::delete::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#destroyById
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Delete a related item by id for commits.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for commits
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.commits.destroyById = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::destroyById::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#findById
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Find a related item by id for commits.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for commits
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.commits.findById = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::findById::SourceFile::commits"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.commits#updateById
         * @methodOf lbServices.SourceFile.commits
         *
         * @description
         *
         * Update a related item by id for commits.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for commits
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.commits.updateById = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::updateById::SourceFile::commits"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.SourceFile.stagedCommit
     * @header lbServices.SourceFile.stagedCommit
     * @object
     * @description
     *
     * The object `SourceFile.stagedCommit` groups methods
     * manipulating `Commit` instances related to `SourceFile`.
     *
     * Call {@link lbServices.SourceFile#stagedCommit SourceFile.stagedCommit()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.SourceFile#stagedCommit
         * @methodOf lbServices.SourceFile
         *
         * @description
         *
         * Fetches hasOne relation stagedCommit.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.stagedCommit = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::get::SourceFile::stagedCommit"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.stagedCommit#create
         * @methodOf lbServices.SourceFile.stagedCommit
         *
         * @description
         *
         * Creates a new instance in stagedCommit of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.stagedCommit.create = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::create::SourceFile::stagedCommit"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.stagedCommit#createMany
         * @methodOf lbServices.SourceFile.stagedCommit
         *
         * @description
         *
         * Creates a new instance in stagedCommit of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.stagedCommit.createMany = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::createMany::SourceFile::stagedCommit"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.stagedCommit#destroy
         * @methodOf lbServices.SourceFile.stagedCommit
         *
         * @description
         *
         * Deletes stagedCommit of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.stagedCommit.destroy = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::destroy::SourceFile::stagedCommit"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SourceFile.stagedCommit#update
         * @methodOf lbServices.SourceFile.stagedCommit
         *
         * @description
         *
         * Update stagedCommit of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Commit` object.)
         * </em>
         */
        R.stagedCommit.update = function() {
          var TargetResource = $injector.get("Commit");
          var action = TargetResource["::update::SourceFile::stagedCommit"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Fiber
 * @header lbServices.Fiber
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Fiber` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Fiber",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Fibers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Fiber#create
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Fibers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#createMany
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Fibers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#upsert
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Fibers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#exists
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Fibers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#findById
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Fibers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#find
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Fibers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#findOne
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Fibers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#updateAll
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Fibers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#deleteById
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Fibers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#count
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Fibers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#prototype$updateAttributes
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Fibers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Fiber#createChangeStream
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Fibers/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Fiber#updateOrCreate
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Fiber#update
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Fiber#destroyById
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Fiber#removeById
         * @methodOf lbServices.Fiber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Fiber` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Fiber#modelName
    * @propertyOf lbServices.Fiber
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Fiber`.
    */
    R.modelName = "Fiber";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.BilletHost
 * @header lbServices.BilletHost
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `BilletHost` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "BilletHost",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/BilletHosts/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#create
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/BilletHosts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#createMany
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/BilletHosts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#upsert
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/BilletHosts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#exists
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/BilletHosts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#findById
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/BilletHosts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#find
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/BilletHosts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#findOne
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/BilletHosts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#updateAll
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/BilletHosts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#deleteById
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/BilletHosts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#count
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/BilletHosts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#prototype$updateAttributes
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/BilletHosts/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#createChangeStream
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/BilletHosts/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.BilletHost#updateOrCreate
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#update
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#destroyById
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.BilletHost#removeById
         * @methodOf lbServices.BilletHost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletHost` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.BilletHost#modelName
    * @propertyOf lbServices.BilletHost
    * @description
    * The name of the model represented by this $resource,
    * i.e. `BilletHost`.
    */
    R.modelName = "BilletHost";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.BilletRun
 * @header lbServices.BilletRun
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `BilletRun` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "BilletRun",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/BilletRuns/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#create
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/BilletRuns",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#createMany
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/BilletRuns",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#upsert
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/BilletRuns",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#exists
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/BilletRuns/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#findById
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/BilletRuns/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#find
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/BilletRuns",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#findOne
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/BilletRuns/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#updateAll
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/BilletRuns/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#deleteById
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/BilletRuns/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#count
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/BilletRuns/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#prototype$updateAttributes
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/BilletRuns/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#createChangeStream
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/BilletRuns/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.BilletRun#updateOrCreate
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#update
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#destroyById
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.BilletRun#removeById
         * @methodOf lbServices.BilletRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `BilletRun` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.BilletRun#modelName
    * @propertyOf lbServices.BilletRun
    * @description
    * The name of the model represented by this $resource,
    * i.e. `BilletRun`.
    */
    R.modelName = "BilletRun";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Diff
 * @header lbServices.Diff
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Diff` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Diff",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Diffs/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Patch.diffs.findById() instead.
        "::findById::Patch::diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Patch.diffs.destroyById() instead.
        "::destroyById::Patch::diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Patch.diffs.updateById() instead.
        "::updateById::Patch::diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Patch.diffs() instead.
        "::get::Patch::diffs": {
          isArray: true,
          url: urlBase + "/Patches/:id/diffs",
          method: "GET"
        },

        // INTERNAL. Use Patch.diffs.create() instead.
        "::create::Patch::diffs": {
          url: urlBase + "/Patches/:id/diffs",
          method: "POST"
        },

        // INTERNAL. Use Patch.diffs.createMany() instead.
        "::createMany::Patch::diffs": {
          isArray: true,
          url: urlBase + "/Patches/:id/diffs",
          method: "POST"
        },

        // INTERNAL. Use Patch.diffs.destroyAll() instead.
        "::delete::Patch::diffs": {
          url: urlBase + "/Patches/:id/diffs",
          method: "DELETE"
        },

        // INTERNAL. Use Patch.diffs.count() instead.
        "::count::Patch::diffs": {
          url: urlBase + "/Patches/:id/diffs/count",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Diff#modelName
    * @propertyOf lbServices.Diff
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Diff`.
    */
    R.modelName = "Diff";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Patch
 * @header lbServices.Patch
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Patch` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Patch",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Patches/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Patch.diffs.findById() instead.
        "prototype$__findById__diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "GET"
        },

        // INTERNAL. Use Patch.diffs.destroyById() instead.
        "prototype$__destroyById__diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Patch.diffs.updateById() instead.
        "prototype$__updateById__diffs": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Patches/:id/diffs/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Patch.diffs() instead.
        "prototype$__get__diffs": {
          isArray: true,
          url: urlBase + "/Patches/:id/diffs",
          method: "GET"
        },

        // INTERNAL. Use Patch.diffs.create() instead.
        "prototype$__create__diffs": {
          url: urlBase + "/Patches/:id/diffs",
          method: "POST"
        },

        // INTERNAL. Use Patch.diffs.destroyAll() instead.
        "prototype$__delete__diffs": {
          url: urlBase + "/Patches/:id/diffs",
          method: "DELETE"
        },

        // INTERNAL. Use Patch.diffs.count() instead.
        "prototype$__count__diffs": {
          url: urlBase + "/Patches/:id/diffs/count",
          method: "GET"
        },

        // INTERNAL. Use Commit.patches.findById() instead.
        "::findById::Commit::patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "GET"
        },

        // INTERNAL. Use Commit.patches.destroyById() instead.
        "::destroyById::Commit::patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Commit.patches.updateById() instead.
        "::updateById::Commit::patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Commit.patches() instead.
        "::get::Commit::patches": {
          isArray: true,
          url: urlBase + "/Commits/:id/patches",
          method: "GET"
        },

        // INTERNAL. Use Commit.patches.create() instead.
        "::create::Commit::patches": {
          url: urlBase + "/Commits/:id/patches",
          method: "POST"
        },

        // INTERNAL. Use Commit.patches.createMany() instead.
        "::createMany::Commit::patches": {
          isArray: true,
          url: urlBase + "/Commits/:id/patches",
          method: "POST"
        },

        // INTERNAL. Use Commit.patches.destroyAll() instead.
        "::delete::Commit::patches": {
          url: urlBase + "/Commits/:id/patches",
          method: "DELETE"
        },

        // INTERNAL. Use Commit.patches.count() instead.
        "::count::Commit::patches": {
          url: urlBase + "/Commits/:id/patches/count",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Patch#modelName
    * @propertyOf lbServices.Patch
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Patch`.
    */
    R.modelName = "Patch";

    /**
     * @ngdoc object
     * @name lbServices.Patch.diffs
     * @header lbServices.Patch.diffs
     * @object
     * @description
     *
     * The object `Patch.diffs` groups methods
     * manipulating `Diff` instances related to `Patch`.
     *
     * Call {@link lbServices.Patch#diffs Patch.diffs()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Patch#diffs
         * @methodOf lbServices.Patch
         *
         * @description
         *
         * Queries diffs of Patch.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Diff` object.)
         * </em>
         */
        R.diffs = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::get::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#count
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Counts diffs of Patch.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.diffs.count = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::count::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#create
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Creates a new instance in diffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Diff` object.)
         * </em>
         */
        R.diffs.create = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::create::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#createMany
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Creates a new instance in diffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Diff` object.)
         * </em>
         */
        R.diffs.createMany = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::createMany::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#destroyAll
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Deletes all diffs of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.diffs.destroyAll = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::delete::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#destroyById
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Delete a related item by id for diffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for diffs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.diffs.destroyById = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::destroyById::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#findById
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Find a related item by id for diffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for diffs
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Diff` object.)
         * </em>
         */
        R.diffs.findById = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::findById::Patch::diffs"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Patch.diffs#updateById
         * @methodOf lbServices.Patch.diffs
         *
         * @description
         *
         * Update a related item by id for diffs.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for diffs
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Diff` object.)
         * </em>
         */
        R.diffs.updateById = function() {
          var TargetResource = $injector.get("Diff");
          var action = TargetResource["::updateById::Patch::diffs"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Commit
 * @header lbServices.Commit
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Commit` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Commit",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Commits/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Commit.patches.findById() instead.
        "prototype$__findById__patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "GET"
        },

        // INTERNAL. Use Commit.patches.destroyById() instead.
        "prototype$__destroyById__patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Commit.patches.updateById() instead.
        "prototype$__updateById__patches": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Commits/:id/patches/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Commit.patches() instead.
        "prototype$__get__patches": {
          isArray: true,
          url: urlBase + "/Commits/:id/patches",
          method: "GET"
        },

        // INTERNAL. Use Commit.patches.create() instead.
        "prototype$__create__patches": {
          url: urlBase + "/Commits/:id/patches",
          method: "POST"
        },

        // INTERNAL. Use Commit.patches.destroyAll() instead.
        "prototype$__delete__patches": {
          url: urlBase + "/Commits/:id/patches",
          method: "DELETE"
        },

        // INTERNAL. Use Commit.patches.count() instead.
        "prototype$__count__patches": {
          url: urlBase + "/Commits/:id/patches/count",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.findById() instead.
        "::findById::SourceFile::commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.destroyById() instead.
        "::destroyById::SourceFile::commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits.updateById() instead.
        "::updateById::SourceFile::commits": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/SourceFiles/:id/commits/:fk",
          method: "PUT"
        },

        // INTERNAL. Use SourceFile.stagedCommit() instead.
        "::get::SourceFile::stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.stagedCommit.create() instead.
        "::create::SourceFile::stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.stagedCommit.createMany() instead.
        "::createMany::SourceFile::stagedCommit": {
          isArray: true,
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.stagedCommit.update() instead.
        "::update::SourceFile::stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "PUT"
        },

        // INTERNAL. Use SourceFile.stagedCommit.destroy() instead.
        "::destroy::SourceFile::stagedCommit": {
          url: urlBase + "/SourceFiles/:id/stagedCommit",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits() instead.
        "::get::SourceFile::commits": {
          isArray: true,
          url: urlBase + "/SourceFiles/:id/commits",
          method: "GET"
        },

        // INTERNAL. Use SourceFile.commits.create() instead.
        "::create::SourceFile::commits": {
          url: urlBase + "/SourceFiles/:id/commits",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.commits.createMany() instead.
        "::createMany::SourceFile::commits": {
          isArray: true,
          url: urlBase + "/SourceFiles/:id/commits",
          method: "POST"
        },

        // INTERNAL. Use SourceFile.commits.destroyAll() instead.
        "::delete::SourceFile::commits": {
          url: urlBase + "/SourceFiles/:id/commits",
          method: "DELETE"
        },

        // INTERNAL. Use SourceFile.commits.count() instead.
        "::count::SourceFile::commits": {
          url: urlBase + "/SourceFiles/:id/commits/count",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Commit#modelName
    * @propertyOf lbServices.Commit
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Commit`.
    */
    R.modelName = "Commit";

    /**
     * @ngdoc object
     * @name lbServices.Commit.patches
     * @header lbServices.Commit.patches
     * @object
     * @description
     *
     * The object `Commit.patches` groups methods
     * manipulating `Patch` instances related to `Commit`.
     *
     * Call {@link lbServices.Commit#patches Commit.patches()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Commit#patches
         * @methodOf lbServices.Commit
         *
         * @description
         *
         * Queries patches of Commit.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Patch` object.)
         * </em>
         */
        R.patches = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::get::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#count
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Counts patches of Commit.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.patches.count = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::count::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#create
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Creates a new instance in patches of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Patch` object.)
         * </em>
         */
        R.patches.create = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::create::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#createMany
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Creates a new instance in patches of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Patch` object.)
         * </em>
         */
        R.patches.createMany = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::createMany::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#destroyAll
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Deletes all patches of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.patches.destroyAll = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::delete::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#destroyById
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Delete a related item by id for patches.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for patches
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.patches.destroyById = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::destroyById::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#findById
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Find a related item by id for patches.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for patches
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Patch` object.)
         * </em>
         */
        R.patches.findById = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::findById::Commit::patches"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Commit.patches#updateById
         * @methodOf lbServices.Commit.patches
         *
         * @description
         *
         * Update a related item by id for patches.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `fk` – `{*}` - Foreign key for patches
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Patch` object.)
         * </em>
         */
        R.patches.updateById = function() {
          var TargetResource = $injector.get("Patch");
          var action = TargetResource["::updateById::Commit::patches"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Class
 * @header lbServices.Class
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Class` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Class",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Classes/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Class#create
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Classes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#createMany
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Classes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#upsert
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Classes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#exists
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Classes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#findById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Classes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#find
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Classes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#findOne
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Classes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#updateAll
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Classes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#deleteById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Classes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#count
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Classes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#prototype$updateAttributes
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Classes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Class#createChangeStream
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Classes/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Person.classes.findById() instead.
        "::findById::Person::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "GET"
        },

        // INTERNAL. Use Person.classes.destroyById() instead.
        "::destroyById::Person::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Person.classes.updateById() instead.
        "::updateById::Person::classes": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/classes/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Person.classes() instead.
        "::get::Person::classes": {
          isArray: true,
          url: urlBase + "/People/:id/classes",
          method: "GET"
        },

        // INTERNAL. Use Person.classes.create() instead.
        "::create::Person::classes": {
          url: urlBase + "/People/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use Person.classes.createMany() instead.
        "::createMany::Person::classes": {
          isArray: true,
          url: urlBase + "/People/:id/classes",
          method: "POST"
        },

        // INTERNAL. Use Person.classes.destroyAll() instead.
        "::delete::Person::classes": {
          url: urlBase + "/People/:id/classes",
          method: "DELETE"
        },

        // INTERNAL. Use Person.classes.count() instead.
        "::count::Person::classes": {
          url: urlBase + "/People/:id/classes/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Class#updateOrCreate
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Class#update
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Class#destroyById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Class#removeById
         * @methodOf lbServices.Class
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Class` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Class#modelName
    * @propertyOf lbServices.Class
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Class`.
    */
    R.modelName = "Class";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Enrolled
 * @header lbServices.Enrolled
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Enrolled` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Enrolled",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Enrolleds/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Enrolled.person() instead.
        "prototype$__get__person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "GET"
        },

        // INTERNAL. Use Enrolled.person.create() instead.
        "prototype$__create__person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "POST"
        },

        // INTERNAL. Use Enrolled.person.update() instead.
        "prototype$__update__person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "PUT"
        },

        // INTERNAL. Use Enrolled.person.destroy() instead.
        "prototype$__destroy__person": {
          url: urlBase + "/Enrolleds/:id/person",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#create
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Enrolleds",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#createMany
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Enrolleds",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#upsert
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Enrolleds",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#exists
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Enrolleds/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#findById
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Enrolleds/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#find
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Enrolleds",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#findOne
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Enrolleds/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#updateAll
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Enrolleds/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#deleteById
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Enrolleds/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#count
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Enrolleds/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#prototype$updateAttributes
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Enrolleds/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#createChangeStream
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Enrolleds/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Enrolled#updateOrCreate
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#update
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#destroyById
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Enrolled#removeById
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Enrolled` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Enrolled#modelName
    * @propertyOf lbServices.Enrolled
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Enrolled`.
    */
    R.modelName = "Enrolled";

    /**
     * @ngdoc object
     * @name lbServices.Enrolled.person
     * @header lbServices.Enrolled.person
     * @object
     * @description
     *
     * The object `Enrolled.person` groups methods
     * manipulating `Person` instances related to `Enrolled`.
     *
     * Call {@link lbServices.Enrolled#person Enrolled.person()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Enrolled#person
         * @methodOf lbServices.Enrolled
         *
         * @description
         *
         * Fetches hasOne relation person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::get::Enrolled::person"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Enrolled.person#create
         * @methodOf lbServices.Enrolled.person
         *
         * @description
         *
         * Creates a new instance in person of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person.create = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::create::Enrolled::person"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Enrolled.person#createMany
         * @methodOf lbServices.Enrolled.person
         *
         * @description
         *
         * Creates a new instance in person of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person.createMany = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::createMany::Enrolled::person"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Enrolled.person#destroy
         * @methodOf lbServices.Enrolled.person
         *
         * @description
         *
         * Deletes person of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.person.destroy = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::destroy::Enrolled::person"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Enrolled.person#update
         * @methodOf lbServices.Enrolled.person
         *
         * @description
         *
         * Update person of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person.update = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::update::Enrolled::person"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Assignment
 * @header lbServices.Assignment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Assignment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Assignment",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Assignments/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Assignment.project() instead.
        "prototype$__get__project": {
          url: urlBase + "/Assignments/:id/project",
          method: "GET"
        },

        // INTERNAL. Use Assignment.project.create() instead.
        "prototype$__create__project": {
          url: urlBase + "/Assignments/:id/project",
          method: "POST"
        },

        // INTERNAL. Use Assignment.project.update() instead.
        "prototype$__update__project": {
          url: urlBase + "/Assignments/:id/project",
          method: "PUT"
        },

        // INTERNAL. Use Assignment.project.destroy() instead.
        "prototype$__destroy__project": {
          url: urlBase + "/Assignments/:id/project",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#create
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Assignments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#createMany
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Assignments",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#upsert
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Assignments",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#exists
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Assignments/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#findById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Assignments/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#find
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Assignments",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#findOne
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Assignments/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#updateAll
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Assignments/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#deleteById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Assignments/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#count
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Assignments/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#prototype$updateAttributes
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Assignments/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Assignment#createChangeStream
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Assignments/change-stream",
          method: "POST"
        },

        // INTERNAL. Use AssignmentRun.assignment() instead.
        "::get::AssignmentRun::assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "GET"
        },

        // INTERNAL. Use AssignmentRun.assignment.create() instead.
        "::create::AssignmentRun::assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "POST"
        },

        // INTERNAL. Use AssignmentRun.assignment.createMany() instead.
        "::createMany::AssignmentRun::assignment": {
          isArray: true,
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "POST"
        },

        // INTERNAL. Use AssignmentRun.assignment.update() instead.
        "::update::AssignmentRun::assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "PUT"
        },

        // INTERNAL. Use AssignmentRun.assignment.destroy() instead.
        "::destroy::AssignmentRun::assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "DELETE"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Assignment#updateOrCreate
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#update
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#destroyById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Assignment#removeById
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Assignment#modelName
    * @propertyOf lbServices.Assignment
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Assignment`.
    */
    R.modelName = "Assignment";

    /**
     * @ngdoc object
     * @name lbServices.Assignment.project
     * @header lbServices.Assignment.project
     * @object
     * @description
     *
     * The object `Assignment.project` groups methods
     * manipulating `Project` instances related to `Assignment`.
     *
     * Call {@link lbServices.Assignment#project Assignment.project()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Assignment#project
         * @methodOf lbServices.Assignment
         *
         * @description
         *
         * Fetches hasOne relation project.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.project = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::get::Assignment::project"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Assignment.project#create
         * @methodOf lbServices.Assignment.project
         *
         * @description
         *
         * Creates a new instance in project of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.project.create = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::create::Assignment::project"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Assignment.project#createMany
         * @methodOf lbServices.Assignment.project
         *
         * @description
         *
         * Creates a new instance in project of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.project.createMany = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::createMany::Assignment::project"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Assignment.project#destroy
         * @methodOf lbServices.Assignment.project
         *
         * @description
         *
         * Deletes project of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.project.destroy = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::destroy::Assignment::project"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Assignment.project#update
         * @methodOf lbServices.Assignment.project
         *
         * @description
         *
         * Update project of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.project.update = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::update::Assignment::project"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.AssignmentRun
 * @header lbServices.AssignmentRun
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AssignmentRun` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AssignmentRun",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/AssignmentRuns/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use AssignmentRun.assignment() instead.
        "prototype$__get__assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "GET"
        },

        // INTERNAL. Use AssignmentRun.assignment.create() instead.
        "prototype$__create__assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "POST"
        },

        // INTERNAL. Use AssignmentRun.assignment.update() instead.
        "prototype$__update__assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "PUT"
        },

        // INTERNAL. Use AssignmentRun.assignment.destroy() instead.
        "prototype$__destroy__assignment": {
          url: urlBase + "/AssignmentRuns/:id/assignment",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#create
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/AssignmentRuns",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#createMany
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/AssignmentRuns",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#upsert
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/AssignmentRuns",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#exists
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/AssignmentRuns/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#findById
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/AssignmentRuns/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#find
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/AssignmentRuns",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#findOne
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/AssignmentRuns/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#updateAll
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/AssignmentRuns/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#deleteById
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/AssignmentRuns/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#count
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/AssignmentRuns/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#prototype$updateAttributes
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/AssignmentRuns/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#createChangeStream
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/AssignmentRuns/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Person.assignmentRuns.findById() instead.
        "::findById::Person::assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "GET"
        },

        // INTERNAL. Use Person.assignmentRuns.destroyById() instead.
        "::destroyById::Person::assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Person.assignmentRuns.updateById() instead.
        "::updateById::Person::assignmentRuns": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/assignmentRuns/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Person.assignmentRuns() instead.
        "::get::Person::assignmentRuns": {
          isArray: true,
          url: urlBase + "/People/:id/assignmentRuns",
          method: "GET"
        },

        // INTERNAL. Use Person.assignmentRuns.create() instead.
        "::create::Person::assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns",
          method: "POST"
        },

        // INTERNAL. Use Person.assignmentRuns.createMany() instead.
        "::createMany::Person::assignmentRuns": {
          isArray: true,
          url: urlBase + "/People/:id/assignmentRuns",
          method: "POST"
        },

        // INTERNAL. Use Person.assignmentRuns.destroyAll() instead.
        "::delete::Person::assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns",
          method: "DELETE"
        },

        // INTERNAL. Use Person.assignmentRuns.count() instead.
        "::count::Person::assignmentRuns": {
          url: urlBase + "/People/:id/assignmentRuns/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#updateOrCreate
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#update
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#destroyById
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#removeById
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AssignmentRun` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.AssignmentRun#modelName
    * @propertyOf lbServices.AssignmentRun
    * @description
    * The name of the model represented by this $resource,
    * i.e. `AssignmentRun`.
    */
    R.modelName = "AssignmentRun";

    /**
     * @ngdoc object
     * @name lbServices.AssignmentRun.assignment
     * @header lbServices.AssignmentRun.assignment
     * @object
     * @description
     *
     * The object `AssignmentRun.assignment` groups methods
     * manipulating `Assignment` instances related to `AssignmentRun`.
     *
     * Call {@link lbServices.AssignmentRun#assignment AssignmentRun.assignment()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun#assignment
         * @methodOf lbServices.AssignmentRun
         *
         * @description
         *
         * Fetches hasOne relation assignment.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignment = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::get::AssignmentRun::assignment"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun.assignment#create
         * @methodOf lbServices.AssignmentRun.assignment
         *
         * @description
         *
         * Creates a new instance in assignment of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignment.create = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::create::AssignmentRun::assignment"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun.assignment#createMany
         * @methodOf lbServices.AssignmentRun.assignment
         *
         * @description
         *
         * Creates a new instance in assignment of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignment.createMany = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::createMany::AssignmentRun::assignment"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun.assignment#destroy
         * @methodOf lbServices.AssignmentRun.assignment
         *
         * @description
         *
         * Deletes assignment of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.assignment.destroy = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::destroy::AssignmentRun::assignment"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AssignmentRun.assignment#update
         * @methodOf lbServices.AssignmentRun.assignment
         *
         * @description
         *
         * Update assignment of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Assignment` object.)
         * </em>
         */
        R.assignment.update = function() {
          var TargetResource = $injector.get("Assignment");
          var action = TargetResource["::update::AssignmentRun::assignment"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Workspace
 * @header lbServices.Workspace
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Workspace` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Workspace",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Workspaces/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Workspace.person() instead.
        "prototype$__get__person": {
          url: urlBase + "/Workspaces/:id/person",
          method: "GET"
        },

        // INTERNAL. Use Workspace.projects.findById() instead.
        "prototype$__findById__projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "GET"
        },

        // INTERNAL. Use Workspace.projects.destroyById() instead.
        "prototype$__destroyById__projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.projects.updateById() instead.
        "prototype$__updateById__projects": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Workspaces/:id/projects/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Workspace.projects() instead.
        "prototype$__get__projects": {
          isArray: true,
          url: urlBase + "/Workspaces/:id/projects",
          method: "GET"
        },

        // INTERNAL. Use Workspace.projects.create() instead.
        "prototype$__create__projects": {
          url: urlBase + "/Workspaces/:id/projects",
          method: "POST"
        },

        // INTERNAL. Use Workspace.projects.destroyAll() instead.
        "prototype$__delete__projects": {
          url: urlBase + "/Workspaces/:id/projects",
          method: "DELETE"
        },

        // INTERNAL. Use Workspace.projects.count() instead.
        "prototype$__count__projects": {
          url: urlBase + "/Workspaces/:id/projects/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#create
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Workspaces",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#createMany
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Workspaces",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#upsert
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Workspaces",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#exists
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Workspaces/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#findById
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Workspaces/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#find
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Workspaces",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#findOne
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Workspaces/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#updateAll
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Workspaces/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#deleteById
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Workspaces/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#count
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Workspaces/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#prototype$updateAttributes
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Workspaces/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Workspace#createChangeStream
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Workspaces/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Person.workspace() instead.
        "::get::Person::workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "GET"
        },

        // INTERNAL. Use Person.workspace.create() instead.
        "::create::Person::workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "POST"
        },

        // INTERNAL. Use Person.workspace.createMany() instead.
        "::createMany::Person::workspace": {
          isArray: true,
          url: urlBase + "/People/:id/workspace",
          method: "POST"
        },

        // INTERNAL. Use Person.workspace.update() instead.
        "::update::Person::workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "PUT"
        },

        // INTERNAL. Use Person.workspace.destroy() instead.
        "::destroy::Person::workspace": {
          url: urlBase + "/People/:id/workspace",
          method: "DELETE"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Workspace#updateOrCreate
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Workspace#update
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Workspace#destroyById
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Workspace#removeById
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Workspace` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Workspace#modelName
    * @propertyOf lbServices.Workspace
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Workspace`.
    */
    R.modelName = "Workspace";


        /**
         * @ngdoc method
         * @name lbServices.Workspace#person
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Fetches belongsTo relation person.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Person` object.)
         * </em>
         */
        R.person = function() {
          var TargetResource = $injector.get("Person");
          var action = TargetResource["::get::Workspace::person"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Workspace.projects
     * @header lbServices.Workspace.projects
     * @object
     * @description
     *
     * The object `Workspace.projects` groups methods
     * manipulating `Project` instances related to `Workspace`.
     *
     * Call {@link lbServices.Workspace#projects Workspace.projects()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Workspace#projects
         * @methodOf lbServices.Workspace
         *
         * @description
         *
         * Queries projects of Workspace.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.projects = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::get::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#count
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Counts projects of Workspace.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.projects.count = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::count::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#create
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Creates a new instance in projects of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.projects.create = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::create::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#createMany
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Creates a new instance in projects of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.projects.createMany = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::createMany::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#destroyAll
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Deletes all projects of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.projects.destroyAll = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::delete::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#destroyById
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Delete a related item by id for projects.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for projects
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.projects.destroyById = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::destroyById::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#findById
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Find a related item by id for projects.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for projects
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.projects.findById = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::findById::Workspace::projects"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Workspace.projects#updateById
         * @methodOf lbServices.Workspace.projects
         *
         * @description
         *
         * Update a related item by id for projects.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for projects
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Project` object.)
         * </em>
         */
        R.projects.updateById = function() {
          var TargetResource = $injector.get("Project");
          var action = TargetResource["::updateById::Workspace::projects"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);

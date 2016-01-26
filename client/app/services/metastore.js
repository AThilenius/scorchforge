// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * At a high level, links metadata and ephemeral data with a hasMany model
 * relationship. Links are formed at load time using linkHasMany and lazily
 * during runtime. Linking existing models is O(NM) where N is the number of
 * parent models and M is the number of child models, because I'm too lazy to
 * index them first :p
 * Transitions can be made from one of [model/meta/ephemeral] to any of
 * [model/meta/ephemeral/metaRoot/parentModel] in O(1) time.
 */
angular.module('app').service('metastore', function() {

  // A multi-index dictionary for O(1) lookups of links from any indexed object
  // objToLink:{obj:link, obj:link}
  this.objToLink = {};

  /**
   * Takes two forms, depending on the type of childModelOrChildModelName.
   * Model: Creates a link between the meta, model, ephemeral and indexes all of
   *        them.
   * String: Creates a link between the meta and ephemeral ONLY. This will
   *         result in model() and saveModel() returning null and haveing no
   *         effect. It is useful for linking metadata that is not backed by a
   *         model.
   */
  this.linkMeta = function(parentModel, childModelOrChildModelName,
    metaSeed) {
    var meta = metaSeed || {};
    var childModelName = typeof(childModelOrChildModelName) === 'string' ?
      childModelOrChildModelName : childModelOrChildModelName.constructor
      .modelName;
    parentModel.metadata = parentModel.metadata || {};
    // Make sure metadata.<modelName> exists
    var metaRoot = parentModel.metadata[childModelName] = parentModel.metadata[
      childModelName] || [];
    var uuid = meta.uuid || newUuid();
    var uuidFn = function() {
      return uuid;
    };
    // Generate the partial link
    var link = {
      uuid: uuid,
      parentModel: parentModel,
      metaRoot: metaRoot,
      meta: meta,
      ephemeral: {}
    };
    // Index by uuid
    this.objToLink[link.uuid] = link;
    // Set uuid in all indexed objects
    link.meta.uuidFn = uuidFn;
    link.ephemeral.uuidFn = uuidFn;
    if (typeof(childModelOrChildModelName) !== 'string') {
      // Link child model as well
      meta.modelId = childModelOrChildModelName.id;
      link.model = childModelOrChildModelName;
      childModelOrChildModelName.uuidFn = uuidFn;
    }
    return meta;
  };

  /**
   * Links existing metadata in parentModel with hasManyModels array. This is
   * used for initialization of metadata at load time. modelName must be
   * provided to allow pure-meta object to be linked.
   */
  this.linkHasMany = function(parentModel, hasManyModels, modelName) {
    if (hasManyModels.length <= 0) {
      return;
    }
    var childModelName = hasManyModels[0].constructor.modelName;
    if (!parentModel.metadata || !parentModel.metadata[childModelName]) {
      return;
    }
    var childMeta = parentModel.metadata[childModelName];
    // Iterate over meta
    var that = this;
    // Don't filter so we can still link pure-meta objects
    childMeta.eachRecursive('children', function(meta) {
      // Find the hasManyModel instance that matches this
      var linkModel = _(hasManyModels).find(function(model) {
        return model.id === meta.modelId;
      });
      if (linkModel) {
        that.linkMeta(parentModel, linkModel, meta);
      } else {
        // Link it as pure-meta
        that.linkMeta(parentModel, modelName, meta);
      }
    });
  };

  /**
   * Gets the metadata from one an indexed object.
   */
  this.meta = function(obj) {
    var link = obj && obj.uuidFn ? this.objToLink[obj.uuidFn()] : null;
    return link ? link.meta : null;
  };

  /**
   * Gets the model from one an indexed object.
   */
  this.model = function(obj) {
    var link = obj && obj.uuidFn ? this.objToLink[obj.uuidFn()] : null;
    return link ? link.model : null;
  };

  /**
   * Gets the ephemeral from one an indexed object.
   */
  this.ephemeral = function(obj) {
    var link = obj && obj.uuidFn ? this.objToLink[obj.uuidFn()] : null;
    return link ? link.ephemeral : null;
  };

  /**
   * Gets the parent object (holding the metadata) from one an indexed object.
   */
  this.parent = function(obj) {
    var link = obj && obj.uuidFn ? this.objToLink[obj.uuidFn()] : null;
    return link ? link.parentModel : null;
  };

  /**
   * Gets the root of the metadata object for this specific model
   */
  this.metaRoot = function(obj) {
    var link = obj && obj.uuidFn ? this.objToLink[obj.uuidFn()] : null;
    return link ? link.metaRoot : null;
  };

  /**
   * Helper function for saving the parent model holding the metadata
   */
  this.saveMeta = function(obj) {
    var parentModel = this.parent(obj);
    if (parentModel) {
      parentModel.constructor.prototype$updateAttributes({
        id: parentModel.id
      }, {
        metadata: parentModel.metadata
      });
    }
  };

  /**
   * Helper function for saving a child model of metadata. linkPlaceholder
   * cannot be used with this as there is no backing child model.
   */
  this.saveModel = function(obj) {
    var model = this.model(obj);
    if (model) {
      model.$save();
    }
  };

});

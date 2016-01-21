angular.module('app').service('meta', function () {
    var toMetaCache = {};
    var toModelCache = {};

    this.toMeta = function (model) {
        var meta = toMetaCache[model];
        if (!meta) {
            meta = {};
            toMetaCache[model] = meta;
            toModelCache[meta] = model;
        }
        return meta;
    };

    this.toModel = function (meta) {
        var model = toModelCache[meta];
        if (!model) {
            model = {};
            toModelCache[meta] = model;
            toMetaCache[model] = meta;
        }
        return model;
    };

    this.linkMeta = function (metaModel, metaObject, hasManyModel) {
        var protoKey = Object.getPrototypeOf(hasManyModel);
        hasManyModel.prototype.meta = function () {

        };
    };

});

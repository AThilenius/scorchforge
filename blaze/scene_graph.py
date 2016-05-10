import model
import utils


class Transform(object):
    """ Represents a single transform object (translate, rotation, scale). """

    def __init__(self, obj):
        obj = obj or {}
        self.position = obj.get('position', [0, 0, 0])
        self.rotation = obj.get('rotation', [0, 0, 0])
        self.scale = obj.get('scale', [1, 1, 1])


class SceneGraph(utils.BindableObject):
    """ Manages a scene graph loaded from JSON and rendered to OpenGL. """

    def __init__(self, scope, obj):
        """ Takes in the deserialized object (from JSON) for the model graph """
        super(SceneGraph, self).__init__(scope, obj['id'])
        self.name = obj['name']
        self.root_transform = Transform(obj.get('rootTransform', None))
        self.py_transform = Transform(None)
        self.model_id = obj.get('modelId', None)
        self.children = [SceneGraph(scope, child) for child in
                         obj.get('children', [])]

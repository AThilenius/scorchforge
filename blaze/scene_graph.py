import model
import utils


class TransformV1(object):
    """ Represents a single transform object (translate, rotation, scale). """

    def __init__(self, obj):
        obj = obj or {}
        self.position = obj.get('position', [0, 0, 0])
        self.rotation = obj.get('rotation', [0, 0, 0])
        self.scale = obj.get('scale', [1, 1, 1])

    def is_identity(self):
        return self.position == [0, 0, 0] and self.rotation == [0, 0, 0] and \
               self.scale == [1, 1, 1]


class SceneGraphV1(utils.BindableObject):
    """ Manages a scene graph loaded from JSON and rendered to OpenGL. """

    def __init__(self, scope, obj):
        """ Takes in the deserialized object (from JSON) for the model graph """
        super(SceneGraphV1, self).__init__(scope, obj['id'])
        self.name = obj['name']
        self.root_transform = utils.global_vtable.Transform(
            obj.get('rootTransform', None))
        self.py_transform = utils.global_vtable.Transform(None)
        self.model_transform = utils.global_vtable.Transform(None)
        self.model_id = obj.get('modelId', None)
        self.children = [SceneGraphV1(scope, child) for child in
                         obj.get('children', [])]

    def get_render_tree(self):
        """ Returns back a JSON tree of transforms and Models to be rendered """
        obj = {}
        cursor = obj
        if not self.root_transform.is_identity():
            cursor['position'] = self.root_transform.position
            cursor['rotation'] = self.root_transform.rotation
            cursor['scale'] = self.root_transform.scale
            child = {}
            cursor['children'] = [child]
            cursor = child
        if not self.py_transform.is_identity():
            cursor['position'] = self.py_transform.position
            cursor['rotation'] = self.py_transform.rotation
            cursor['scale'] = self.py_transform.scale
            child = {}
            cursor['children'] = [child]
            cursor = child
        if not self.model_transform.is_identity():
            cursor['position'] = self.model_transform.position
            cursor['rotation'] = self.model_transform.rotation
            cursor['scale'] = self.model_transform.scale
            child = {}
            cursor['children'] = [child]
            cursor = child
        if self.model_id:
            cursor['model_id'] = self.model_id
        cursor['children'] = [child.get_render_tree() for child in
                              self.children]
        return obj


utils.global_vtable.register_(1, 'SceneGraph', SceneGraphV1)
utils.global_vtable.register_(1, 'Transform', TransformV1)

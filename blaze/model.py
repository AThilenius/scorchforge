import math
import utils


class ModelCacheV1(object):
    """
    Does nothing more than load all models from a Mod and reference them by ID
    """

    def __init__(self, json_obj):
        # Maps model id: Model
        self.models = {}
        if json_obj:
            for model_json in json_obj:
                model = ModelV1(model_json)
                self.models[model.obj_id] = model

    def get(self, obj_id):
        return self.models[obj_id]


class ModelV1(object):
    """
    Manages a single voxel chunk of size. Size must be a power of 2not
    Addressing: Blocks are addressed the same as Minecraft, with y being the
    upward component.
    A JSON object can also be parsed in place of size.
    """

    def __init__(self, size_or_json_obj):
        if isinstance(size_or_json_obj, int):
            # Create a fresh model instance
            self.name = 'Unnamed'
            self.obj_id = utils.new_short_guid()
            self.size = size_or_json_obj
            self.data = [None] * (self.size ** 3)
            self.logViewDist = int(math.log(self.size, 2))
        else:
            # Parse our the JSON object from (position, color) tuples
            obj = size_or_json_obj
            self.name = obj['name']
            self.obj_id = obj['id']
            self.size = obj['size']
            self.data = [None] * (self.size ** 3)
            self.logViewDist = int(math.log(self.size, 2))
            for entry in obj['sparseData']:
                (x, y, z) = tuple(entry['position'])
                color = tuple(entry['color'])
                self.set(x, y, z, color)

    def get(self, x, y, z):
        """
        Gets the color of the block within the chunk given by x, y, z. Returns
        False if the block is empty or out of bounds.
        """
        if x < 0 or y < 0 or z < 0 \
                or x >= self.size or y >= self.size or z >= self.size:
            return False
        return self.data[
            (((z << self.logViewDist) + x) << self.logViewDist) + y]

    def set(self, x, y, z, color):
        """
        Sets the color of the block within the chunk give by x, y, z. Does
        nothing if the block is out of bounds.
        """
        if x < 0 or y < 0 or z < 0 \
                or x >= self.size or y >= self.size or z >= self.size:
            return
        self.data[
            (((z << self.logViewDist) + x) << self.logViewDist) + y] = color

    def to_vertex_list(self):
        """
        Renders the chunk out to a vertex list (culling invisible blocks, but
        does not join like-blocks). This code is adapted from my game engine:
        https:#raw.githubusercontent.com/AThilenius/VoxelCraft/master/VoxelCraftWin/UnManaged/VCChunk.cpp
        Returns a list of tuples in the form (position, color) where position is
        a tuple of (x, y, z) and color is a tuple of (r, g, b)
        """

        # Helper for linear interpolation of colors
        def lerp(f, t, amount):
            (fr, fg, fb) = f
            (tr, tg, tb) = t
            return (
                fr + int((tr - fr) * amount),
                fg + int((tg - fg) * amount),
                fb + int((tb - fb) * amount))

        quads = []
        for z in xrange(self.size):
            for x in xrange(self.size):
                for y in xrange(self.size):
                    color = self.get(x, y, z)
                    if not color:
                        continue
                    # Verts
                    v1 = (x, y, z + 1)
                    v2 = (x + 1, y, z + 1)
                    v3 = (x + 1, y + 1, z + 1)
                    v4 = (x, y + 1, z + 1)
                    v5 = (x, y, z)
                    v6 = (x + 1, y, z)
                    v7 = (x + 1, y + 1, z)
                    v8 = (x, y + 1, z)
                    black = (0, 0, 0)
                    # =====   Verticie Computations   ==========================
                    # Front face
                    if not self.get(x, y, z + 1):
                        v1c = v2c = v3c = v4c = 0.0
                        v1c = v1c + 0.2 if self.get(x - 1, y - 1,
                                                    z + 1) else v1c
                        v1c = v1c + 0.2 if self.get(x - 1, y, z + 1) else v1c
                        v4c = v4c + 0.2 if self.get(x - 1, y, z + 1) else v4c
                        v1c = v1c + 0.2 if self.get(x, y - 1, z + 1) else v1c
                        v3c = v3c + 0.2 if self.get(x, y + 1, z + 1) else v3c
                        v4c = v4c + 0.2 if self.get(x, y + 1, z + 1) else v4c
                        v2c = v2c + 0.2 if self.get(x + 1, y - 1,
                                                    z + 1) else v2c
                        v2c = v2c + 0.2 if self.get(x + 1, y, z + 1) else v2c
                        v3c = v3c + 0.2 if self.get(x + 1, y, z + 1) else v3c
                        v3c = v3c + 0.2 if self.get(x + 1, y + 1,
                                                    z + 1) else v3c
                        quads.append((v1, lerp(color, black, v1c)))
                        quads.append((v1, lerp(color, black, v1c)))
                        quads.append((v2, lerp(color, black, v2c)))
                        quads.append((v3, lerp(color, black, v3c)))
                        quads.append((v4, lerp(color, black, v4c)))
                    # Back face
                    if not self.get(x, y, z - 1):
                        v5c = v6c = v7c = v8c = 0.0
                        v5c = v5c + 0.2 if self.get(x - 1, y - 1,
                                                    z - 1) else v5c
                        v5c = v5c + 0.2 if self.get(x - 1, y, z - 1) else v5c
                        v8c = v8c + 0.2 if self.get(x - 1, y, z - 1) else v8c
                        v8c = v8c + 0.2 if self.get(x - 1, y + 1,
                                                    z - 1) else v8c
                        v5c = v5c + 0.2 if self.get(x, y - 1, z - 1) else v5c
                        v7c = v7c + 0.2 if self.get(x, y + 1, z - 1) else v7c
                        v8c = v8c + 0.2 if self.get(x, y + 1, z - 1) else v8c
                        v6c = v6c + 0.2 if self.get(x + 1, y - 1,
                                                    z - 1) else v6c
                        v6c = v6c + 0.2 if self.get(x + 1, y, z - 1) else v6c
                        v7c = v7c + 0.2 if self.get(x + 1, y, z - 1) else v7c
                        v7c = v7c + 0.2 if self.get(x + 1, y + 1,
                                                    z - 1) else v7c
                        quads.append((v6, lerp(color, black, v6c)))
                        quads.append((v5, lerp(color, black, v5c)))
                        quads.append((v8, lerp(color, black, v8c)))
                        quads.append((v7, lerp(color, black, v7c)))
                    # Right face
                    if not self.get(x + 1, y, z):
                        v2c = v3c = v6c = v7c = 0.0
                        v6c = v6c + 0.2 if self.get(x + 1, y - 1,
                                                    z - 1) else v6c
                        v6c = v6c + 0.2 if self.get(x + 1, y, z - 1) else v6c
                        v7c = v7c + 0.2 if self.get(x + 1, y, z - 1) else v7c
                        v7c = v7c + 0.2 if self.get(x + 1, y + 1,
                                                    z - 1) else v7c
                        v2c = v2c + 0.2 if self.get(x + 1, y - 1, z) else v2c
                        v6c = v6c + 0.2 if self.get(x + 1, y - 1, z) else v6c
                        v3c = v3c + 0.2 if self.get(x + 1, y + 1, z) else v3c
                        v7c = v7c + 0.2 if self.get(x + 1, y + 1, z) else v7c
                        v2c = v2c + 0.2 if self.get(x + 1, y - 1,
                                                    z + 1) else v2c
                        v2c = v2c + 0.2 if self.get(x + 1, y, z + 1) else v2c
                        v3c = v3c + 0.2 if self.get(x + 1, y, z + 1) else v3c
                        v3c = v3c + 0.2 if self.get(x + 1, y + 1,
                                                    z + 1) else v3c
                        quads.append((v2, lerp(color, black, v2c)))
                        quads.append((v6, lerp(color, black, v6c)))
                        quads.append((v7, lerp(color, black, v7c)))
                        quads.append((v3, lerp(color, black, v3c)))
                    # Left face
                    if not self.get(x - 1, y, z):
                        v1c = v4c = v5c = v8c = 0.0
                        v5c = v5c + 0.2 if self.get(x - 1, y - 1,
                                                    z - 1) else v5c
                        v5c = v5c + 0.2 if self.get(x - 1, y, z - 1) else v5c
                        v8c = v8c + 0.2 if self.get(x - 1, y, z - 1) else v8c
                        v8c = v8c + 0.2 if self.get(x - 1, y + 1,
                                                    z - 1) else v8c
                        v1c = v1c + 0.2 if self.get(x - 1, y - 1, z) else v1c
                        v5c = v5c + 0.2 if self.get(x - 1, y - 1, z) else v5c
                        v4c = v4c + 0.2 if self.get(x - 1, y + 1, z) else v4c
                        v8c = v8c + 0.2 if self.get(x - 1, y + 1, z) else v8c
                        v1c = v1c + 0.2 if self.get(x - 1, y - 1,
                                                    z + 1) else v1c
                        v1c = v1c + 0.2 if self.get(x - 1, y, z + 1) else v1c
                        v4c = v4c + 0.2 if self.get(x - 1, y, z + 1) else v4c
                        v4c = v4c + 0.2 if self.get(x - 1, y + 1,
                                                    z + 1) else v4c
                        quads.append((v5, lerp(color, black, v5c)))
                        quads.append((v1, lerp(color, black, v1c)))
                        quads.append((v4, lerp(color, black, v4c)))
                        quads.append((v8, lerp(color, black, v8c)))
                    # Top face
                    if not self.get(x, y + 1, z):
                        v3c = v4c = v7c = v8c = 0.0
                        v8c = v8c + 0.2 if self.get(x - 1, y + 1,
                                                    z - 1) else v8c
                        v8c = v8c + 0.2 if self.get(x - 1, y + 1, z) else v8c
                        v4c = v4c + 0.2 if self.get(x - 1, y + 1, z) else v4c
                        v4c = v4c + 0.2 if self.get(x - 1, y + 1,
                                                    z + 1) else v4c
                        v7c = v7c + 0.2 if self.get(x, y + 1, z - 1) else v7c
                        v8c = v8c + 0.2 if self.get(x, y + 1, z - 1) else v8c
                        v3c = v3c + 0.2 if self.get(x, y + 1, z + 1) else v3c
                        v4c = v4c + 0.2 if self.get(x, y + 1, z + 1) else v4c
                        v7c = v7c + 0.2 if self.get(x + 1, y + 1,
                                                    z - 1) else v7c
                        v7c = v7c + 0.2 if self.get(x + 1, y + 1, z) else v7c
                        v3c = v3c + 0.2 if self.get(x + 1, y + 1, z) else v3c
                        v3c = v3c + 0.2 if self.get(x + 1, y + 1,
                                                    z + 1) else v3c
                        quads.append((v4, lerp(color, black, v4c)))
                        quads.append((v3, lerp(color, black, v3c)))
                        quads.append((v7, lerp(color, black, v7c)))
                        quads.append((v8, lerp(color, black, v8c)))
                    # Bottom face
                    if not self.get(x, y - 1, z):
                        v1c = v2c = v5c = v6c = 0.0
                        v5c = v5c + 0.2 if self.get(x - 1, y - 1,
                                                    z - 1) else v5c
                        v5c = v5c + 0.2 if self.get(x - 1, y - 1, z) else v5c
                        v1c = v1c + 0.2 if self.get(x - 1, y - 1, z) else v1c
                        v1c = v1c + 0.2 if self.get(x - 1, y - 1,
                                                    z + 1) else v1c
                        v5c = v5c + 0.2 if self.get(x, y - 1, z - 1) else v5c
                        v6c = v6c + 0.2 if self.get(x, y - 1, z - 1) else v6c
                        v1c = v1c + 0.2 if self.get(x, y - 1, z + 1) else v1c
                        v2c = v2c + 0.2 if self.get(x, y - 1, z + 1) else v2c
                        v6c = v6c + 0.2 if self.get(x + 1, y - 1,
                                                    z - 1) else v6c
                        v6c = v6c + 0.2 if self.get(x + 1, y - 1, z) else v6c
                        v2c = v2c + 0.2 if self.get(x + 1, y - 1, z) else v2c
                        v2c = v2c + 0.2 if self.get(x + 1, y - 1,
                                                    z + 1) else v2c
                        quads.append((v1, lerp(color, black, v1c)))
                        quads.append((v5, lerp(color, black, v5c)))
                        quads.append((v6, lerp(color, black, v6c)))
                        quads.append((v2, lerp(color, black, v2c)))
        return quads

    def to_json_obj(self):
        """ Returns an object that can be JSON serialized """
        sparse_data = []
        for z in xrange(self.size):
            for x in xrange(self.size):
                for y in xrange(self.size):
                    color = self.get(x, y, z)
                    if not color:
                        continue
                    sparse_data.append({
                        'position': [x, y, z],
                        'color': color
                    })
        return {
            'id': self.obj_id,
            'name': self.name,
            'size': self.size,
            'sparseData': sparse_data
        }


utils.global_vtable.register_(1, 'ModelCache', ModelCacheV1)

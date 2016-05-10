import base64
import json
import utils
import zlib


class BlazeV1(object):
    """
    Represents an entire Blaze Mod, including all SparkTypes, and spark
    instances.
    """

    def __init__(self, json_obj):
        if 'blazeVersion' not in json_obj:
            raise Exception('Invalid or malformed Blaze mod!')
        if json_obj['blazeVersion'] < 1:
            raise Exception('Mismatched Blaze loader version!')
        if 'compression' not in json_obj or 'raw' not in json_obj:
            raise Exception('Invalid or malformed Blaze V1 Mod!')
        raw = json_obj['raw']
        for step in json_obj['compression']:
            if step == 'base64':
                raw = base64.b64decode(raw)
            elif step == 'zlib':
                raw = zlib.decompress(raw)
            elif step == 'json':
                raw = json.loads(raw)
            else:
                raise Exception('Unhandled compression type \'%s\'' % step)
        self.name = json_obj.get('name', 'Unnamed')
        self.author = json_obj.get('author', 'Unknown Author')
        # Load all icons (using VTable)
        self.icon_cache = utils.global_vtable.IconCache(raw['icons'])
        # Load all models (using VTable)
        self.model_cache = utils.global_vtable.ModelCache(raw['models'])
        # Global namespace will be shared with all Sparks within this Blaze Mod
        self.global_namespace = {}
        # Load all spark (using VTable)
        self.spark_types = [
            utils.global_vtable.SparkType(self.global_namespace, spark) for
            spark in raw['sparks']]

    def update_all(self):
        for spark_type in self.spark_types:
            spark_type.update_all()


utils.global_vtable.register_(1, 'Blaze', BlazeV1)

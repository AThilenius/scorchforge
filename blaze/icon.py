import base64
import utils


class IconCacheV1(object):
    """ Manages the Icon Cache, much like the ModelCache manages models. """

    def __init__(self, json_obj):
        # Maps icon id: icon
        self.icons = {}
        if json_obj:
            for icon_json in json_obj:
                icon = IconV1(icon_json)
                self.icons[icon.obj_id] = icon

    def get(self, obj_id):
        return self.icons[obj_id]


class IconV1(object):
    """
    Manages a single icon.
    """

    def __init__(self, json_obj):
        # Parse our the JSON object
        self.name = json_obj['name']
        self.obj_id = json_obj['id']
        self.data = base64.b64decode(json_obj['raw_64'])


utils.global_vtable.register_(1, 'IconCache', IconCacheV1)

from scene_graph import SceneGraph
from weakref import WeakKeyDictionary
import utils


class SparkTypeV1(object):
    """
    Flyweight pattern for managing a single Spark type (not an instance of a
    Spark, but the 'concept' of a Spark. One of these will be created for
    each Spark defined within a Mod
    """

    def __init__(self, global_namespace, json_obj):
        self.json_obj = json_obj
        self.flyweights = WeakKeyDictionary()
        # Use a shared global namespace between all flyweight instances
        self.global_namespace = global_namespace
        self.icon_id = json_obj['iconId']
        # Parse and compile the controller
        self.controller_byte_code = compile(json_obj['controller'], '<string>',
                                            'exec')

    def create(self):
        """
        Returns a new flyweight from 'this' SparkType.
        """
        spark = SparkV1(self)
        self.flyweights[spark] = None
        return spark

    def update_all(self):
        """
        Updates all flyweights
        """
        # Update all controllers first
        for spark in self.flyweights.iterkeyrefs():
            try:
                eval(self.controller_byte_code, self.global_namespace,
                     spark().local_namespace)
            except Exception as e:
                print 'Controller update error: %s' % e
        # Then update all bindings for each spark
        for spark in self.flyweights.iterkeyrefs():
            spark().binding_scope.update_bindings()


class SparkV1(object):
    def __init__(self, spark_type):
        self.local_namespace = {}
        self.binding_scope = utils.BindingScope(spark_type.global_namespace,
                                                self.local_namespace)
        # Load the Scene Graph
        self.scene_graph = SceneGraph(self.binding_scope,
                                      spark_type.json_obj['sceneGraph'])
        # Load Bindings
        # TODO(athilenius): This will result in bindings being recompiled
        # each time. This should be cached an used later.
        for object_id in spark_type.json_obj['bindings']:
            for path in spark_type.json_obj['bindings'][object_id]:
                binding = spark_type.json_obj['bindings'][object_id][path]
                self.binding_scope.bind(object_id, path, binding['type'],
                                        binding['value'])


utils.global_vtable.register_(1, 'SparkType', SparkTypeV1)

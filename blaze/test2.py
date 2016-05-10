import json
import utils
import model, icon, scene_graph, spark, blaze

blaze_mod_json = json.loads(open('sample_blaze_mod.json').read())
version = blaze_mod_json['blazeVersion']
utils.global_vtable.set_version_(version)
blaze = utils.global_vtable.Blaze(blaze_mod_json)
spark_instance = blaze.spark_types[0].create()
blaze.update_all()
print 'Wahoo!!'
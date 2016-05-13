import base64
import json
import utils
import zlib


"""
Some notes before I forget (because I have fucking amnesia!):

Rendering:
Rendering is done by polling each Spark instance for a new render tree. This
tree has all nodes (with IDs), transform/rotation/scale and the ModelID. This is
all the info that is needed to render a single Spark in the world. In Three.js
the Transform control will be attached to a Object3D like normal, but every time
it moves, the Python will be updated directly. Before each render, the Spark
will be polled for a new render tree just like Minecraft will.


Minecraft Events (Player Click, Server Tick, Blah Blah):
First, sent through the VTable to version that event to Blaze. This event is
then queued as an object. Pre-render, all events are handled by hooks in
server, world, and server-tick for Sparks.

For example, on_block_activated is a Minecraft event. It's handler looks
something like this:
def on_block_activated(world, x, y, z, player, blah_blah):
    # This event needs to be transformed into a direct event to that Spark
    tile_entity = world.getTileEntity(x, y, z)
    if tile_entity is not SparkTileEntity:
        return
    spark = tile_entity.spark
    vtable.on_block_activated(spark, player)
    # These will both enqueue an event object that will be processed by the
    Spark's controller later.

Events can also be scoped to the Blaze level:
def on_attack_entity(target):
    for blaze in all_blaze_mods:
        vtable.on_attack_entity(blaze, target)
# You know... I could have a blaze level "player" controller (one instance
per player) and a "world" controller (one instance per world) and so on? That
might be smart actually!
And Side-Note: If I stick with standard naming conventions then I can have a
nice 'events' list in ScorchForge.com where you can double click events and
have it generate a stub for you like:
def on_player_left_clicked(player, click_location, click_normal):
    # Some super awesome and long description of what the event does,
    # what all the parameters are and so on! Cool shit.


GUI:
Create a GUI in the GUI editor (for now just in Python). It will look something
like this to start with:

# uber_gui.py
button = Button()
container_slots = ContainerSlots16(controller.inventory)
...Code to set up (position bla bla) the button and container_slots...
button.on_click += controller.do_awesome_thing

Then (here is the cool part) this GUI can be bound to a Spark (by adding it
to the Spark's Controller), a Player (by adding it to the Player Controller),
an Item (again, Item's Controller). And it can be reused. That's some cool shit
right dur!!


Names:
BlazeLoader - Loads Blaze mods from JSON, loads Sparks from Save File /
              Network, communicated with ScorchForge to sync Blaze mods.
SparkBox    - Manages all sparks for all Blaze instances (and versions). Gives
              access to sparks by XYZ coordinates.
Blaze       - A Mod 'package' containing any of the following:
                - 1 Server Controller: Only one, global
                - 1 Player Controller: One-per-player
                - 1 World Controller: One-per-world
                - N Sparks: See Below
Spark       - A single mod entity within a Blaze. This can be a TE, Item,
              Entity, or Block. A Spark can have any of the following:
                - Controller: One-per-instance of a Spark, all hooks are run
                  on the server only.
                - Model-Tree: Only with TE/Entity.
                - GUI: N number of GUIs are possible, each is bound to the
                  Controller and has access to all variables in it
                - Icon: See Below
Model       - A single model mesh within a single Blaze
Icon        - A single icon image (PNG) within a single Blaze
GUI         - Defined above, a GUI is a reusable chunk of Python that can be
              bound to any duck-typed controller. Rendering is done on the
              client, all operations are done on the server.
XWrapper    - Wrapper around a TE, Block and Item in Minecraft land. Will
              expose a 'spark' field for easy access to the Spark data from
              Minecraft, like while rendering. Sparks can also be looked up
              from SparkBox.


ScorchForge (Project Type "Blaze Mod") can add any of the following:
Server Controller  - 1 - Singleton instance
Player Controller  - 1 - One instance per Player
World Controller   - 1 - One instance per World
GUI                - N - A reusable GUI. Several will be built in (eg. chest)
Spark::Item        - N - Any number of instances
Spark::Tile Entity - N - Any number of instances
Spark::Entity      - N - Any number of instances
Spark::Block       - N - Singleton Instance


Organization:

Server Side:
 - On server start, BlazeLoader checks ScorchForge.com for mod list, downloads
   and parses mod JSON into Blaze instances.
 - An existing world is loaded or a new one is created.
 - For each entity created in the world, SparkBox tracks the Spark instance
   by location and ID.
 - Render Trees are not computed server-side
 - Server has authority over Controllers. Fields marked @Synchronized are
   propagated to clients.
 - GUIs are rendered on client, but ALL actions (move item, click, so on) are
   RPCed to server. Changes will be made via @Synchronized propagation.
 - ALL events happen on the server (player click, block place, server tick).
 - @Synchronized events are persisted to disk on chunk load/unload as well
 ? What happens when an existing world upgrades a Blaze mod ?

Client Side:
 - Connection to a server starts, BlazeLoader requests mods directly from
   server, parses JSON and loads into Blaze instances.
 - World is loaded over network
 - For each entity in the world, SparkBox tracks the spark in remote mode.
 - Recomputes render trees per render loop. Things like delta-time are still
   there for rendering, but server ticks are never run, @Synchronized fields
   are ignored in controllers (downstream only).
 - Renders Sparks
 - Has no events, has no world impact. All are PRCed to server.

"""

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

    # This wont be here later
    def update_all(self):
        for spark_type in self.spark_types:
            spark_type.update_all()


utils.global_vtable.register_(1, 'Blaze', BlazeV1)

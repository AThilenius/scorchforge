import spark
import message
import world

# Model

# Entity View:
# Redston:
#   - North: redstone_on[FACE_DIR.NORTH]
#   - South: redstone_on[FACE_DIR.NORTH]
#   - East: redstone_on[FACE_DIR.NORTH]
#   - ...
# Inventory:
#	- Read Only Array of ItemStack
# Luminocity:
#	- `15 if is_on else 0`

# Root Rotation Y: animate(face_dir, 0.5f)
# Root Transform Y: sin(time * 0.5) * 0.2
# Rotor Rotation Y: sin(time * 2.0)

@synced
face_dir = 0.0

@synced
redstone_on = []

@synced
is_on = True

@synced
children = []

@synced
master = None

# Don't do stuff here

def server_update():
	redstone.set_side(NORTH, True)
	message.send_relative((0, -1, 0), 'send_power', 10)
	message.send_absolute((10, 100, 10), 'send_power', 10)

def on_added():
	for location in permutations(3, -1, 1):
		# Returns a string
		if world.get_type_relative(location) == SELF_TYPE:
			master = message.send_relative(location, 'get_master')
			if master.ttl > ttl:
				message.send_relative(location, 'register_child')
				master = master
			else:
				message.send_relative(location, 'change_master')

		# Returns None or Controller Module Instance
		spark = world.get_spark_relative(location)
		if spark.ttl > ttl:
			# it is master
		else
			# I'm master

def get_master(sender):
	return master

def send_power(amount):
	pass
import random
from collections import defaultdict


def new_short_guid():
    alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return ''.join(
        [alphabet[random.randrange(len(alphabet))] for _ in xrange(16)])


class BindingScope(object):
    """ Manages the binding cache for a specific scope (global, local). """

    def __init__(self, globals_namespace, local_namespace):
        self.global_namespace = globals_namespace
        self.local_namespace = local_namespace
        self.bindings = defaultdict(dict)
        self.bindables = {}

    def bind(self, obj_id, path, binding_type, python_code):
        """ Adds a binding even if the object doesn't yet exist. """
        self.bindings[obj_id][path] = {
            'object': self.bindables[
                obj_id] if obj_id in self.bindables else None,
            'path_parts': [part for part in path.split('.') if part],
            'binding_type': binding_type,
            'bytecode': compile(python_code, '<string>', 'eval')
        }

    def update_bindings(self):
        for obj_id, binding_set in self.bindings.iteritems():
            for path, binding in binding_set.iteritems():
                if not binding['object']:
                    if obj_id in self.bindables:
                        binding['object'] = self.bindables[obj_id]
                    else:
                        # Skip updating binds without backing objects
                        continue
                obj = binding['object']
                if binding['binding_type'] == 'set':
                    try:
                        value = eval(binding['bytecode'], self.global_namespace,
                                     self.local_namespace)
                        obj.set(binding['path_parts'], value)
                    except Exception as e:
                        print 'Binding update error on %s: %s' % (
                            binding['object'].obj_id, e)
                        continue
                else:
                    print 'Unsupported binding type: %s', binding['type']
                    continue


class BindableObject(object):
    """ Binds Python snippets to relative paths within the object. """

    def __init__(self, scope, obj_id=new_short_guid()):
        self.obj_id = obj_id
        scope.bindables[self.obj_id] = self

    def set(self, path_parts, value):
        """ Sets the value of the field at path to value. """
        if not path_parts:
            return False
        cursor = self
        for part in path_parts[:-1]:
            if part not in cursor.__dict__:
                return False
            cursor = cursor.__dict__[part]
        if path_parts[-1] not in cursor.__dict__:
            return False
        cursor.__dict__[path_parts[-1]] = value
        return True

    def get(self, path_parts):
        """ Returns the sub-object at path_parts (an array of path parts). """
        cursor = self
        for part in path_parts:
            if part not in cursor.__dict__:
                return None
            cursor = cursor.__dict__[part]
        return cursor

    def bind(self, path, binding_type, python_code):
        bindings[self.obj_id][path] = {
            'object': self,
            'path_parts': [part for part in path.split('.') if part],
            'binding_type': binding_type,
            'bytecode': compile(python_code, '<string>', 'eval')
        }

    def unbind(self, path):
        if path in bindings[self.obj_id]:
            del bindings[self.obj_id][path]


class Event(object):
    """ Acts just like C# events """

    def __init__(self):
        self.__handlers = []

    def __iadd__(self, handler):
        self.__handlers.append(handler)
        return self

    def __isub__(self, handler):
        self.__handlers.remove(handler)
        return self

    def __call__(self, *args, **kwargs):
        for handler in self.__handlers:
            handler(*args, **kwargs)

    def __len__(self):
        return len(self.__handlers)


class VTable(object):
    """
    Acts much like object inheritance's Virtual Method Tables but can
    bind at runtime and is versioned. Use register_ to add a binding,
    set_version_ to set the version binding and access members as if they
    were actually bound to the object.
    vtable = VTable()
    vtable.register_(2, 'foo', 42)
    vtable.set_version_(2)
    print vtable.foo
    """

    def __init__(self):
        # Table of {field_name: [ (version, value) (version, value)... ]}
        # The inner lists will be reverse ordered
        self.vtable = {}
        self.current_version = 0

    def __getattr__(self, name):
        # Grab the table for the field name
        table = self.vtable.get(name, None)
        if not table:
            # If an exception was raised here, then you're trying to access a
            # field that does not (in any version) exist in Hive.
            raise AttributeError('The field \'' + name + '\' does not exist.')
        # Find the first implementation who's version is less than current
        for (version, value) in table:
            if version <= self.current_version:
                return value
        # If an exception was raised here, then you're trying to access a
        # field who's version is greater than the currently active one.
        raise AttributeError('This version does not support \'' + name + '\'.')

    def register_(self, min_version, name, value):
        table = self.vtable[name] if name in self.vtable else []
        table.append((min_version, value))
        self.vtable[name] = sorted(table, reverse=True)

    def set_version_(self, version):
        self.current_version = version

    def version_(self, name):
        """ Returns the latest version of the field name, or None """
        table = self.vtable.get(name, None)
        return table[0][0] if table else None


global_vtable = VTable()

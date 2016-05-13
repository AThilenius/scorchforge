import sys
import imp

local_namespace = {}
global_namespace = {}


class MyLoader(object):
    def load_module(self, fullname):
        try:
            return sys.modules[fullname]
        except KeyError:
            pass
        print "load %s" % fullname
        m = imp.new_module(fullname)
        m.__file__ = fullname
        m.__path__ = []
        m.__loader__ = self
        sys.modules.setdefault(fullname, m)
        return m


class MyFinder(object):
    def find_module(self, fullname, path=None):
        print "find: %s, %s" % (fullname, path)
        return MyLoader()


__path__ = []
sys.meta_path.append(MyFinder())

exec 'import foo\ndef bar():\n    print \'hello\'' in global_namespace, \
    local_namespace

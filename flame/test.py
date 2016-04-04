string = """
class TestClass:
    def member(self):
        print math.sin(1)
some_var = 42
"""

import math

local = {}
exec(string, globals(), local)
print 'Local: ', local
test_class = local['TestClass']()
test_class.member()

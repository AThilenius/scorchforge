var requireImpl = ace.require != null ? ace.require : require;

var Range = requireImpl('ace/range').Range;

window.attachAce = function(doc, editor) {
  var ctx = doc.createContext();
  if (!ctx.provides.text) {
    throw new Error('Only text documents can be attached to ace');
  }

  var editorDoc = editor.getSession().getDocument();
  var suppress = false;
  editorDoc.setNewLineMode('unix');
  editorDoc.setValue(ctx.get());

  editorDoc.on('change', (evnt) => {
    if (!suppress) {
      var pos = editorDoc.positionToIndex(evnt.start);
      switch (evnt.action) {
        case 'insert':
          ctx.insert(pos, evnt.lines.join('\n'));
          break;
        case 'remove':
          ctx.remove(pos, evnt.lines.join('\n').length);
          break;
        default:
          throw new Error('unknown action: ' + evnt.action);
      }
    }
  });
  ctx.onInsert = function(pos, text) {
    suppress = true;
    editorDoc.insert(editorDoc.indexToPosition(pos), text);
    suppress = false;
  };
  ctx.onRemove = function(pos, length) {
    suppress = true;
    var range = Range.fromPoints(editorDoc.indexToPosition(pos),
      editorDoc.indexToPosition(pos + length));
    editorDoc.remove(range);
    suppress = false;
  };
};

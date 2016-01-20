module.exports = function(Person) {

  Person.observe('after save', function(ctx, next) {
    // Always create a workspace with a user
    Person.app.models.Workspace.create(
        {personId: ctx.instance.id}, function(err, workspace) { next(); });
  });

};

Package.describe({
  name: 'allandequeiroz:materialize-comments',
  version: '0.0.1',
  summary: 'A Materialize Comments Package without fussy',
  git: 'https://github.com/allandequeiroz/materialize-comments',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['accounts-password','underscore', 'mongo-livedata', 'templating', 'jquery', 'check', 'mrt:momentjs@2.1.0', 'random', 'aldeed:simple-schema@1.3.2']);
  api.addFiles('');

  api.addFiles(['lib/collection.js','lib/publication.js','lib/schema.js','lib/templates.html','lib/templates.js']);
});

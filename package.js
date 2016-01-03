Package.describe({
  name: 'katrotz:astronomy-coordinates',
  version: '0.0.3',
  summary: 'Now Astronomy models now about each other using MongoDB DBRef',
  git: 'https://github.com/katrotz/meteor-astronomy-coordinates.git',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');

  api.use('underscore');
  api.use('jagi:astronomy@1.1.0');
  api.use('jagi:astronomy-behaviors');
  api.use('katrotz:inflector');

  api.addFiles('lib/events.js', ['client', 'server']);
  api.addFiles('lib/methods.js', ['client', 'server']);
  api.addFiles('lib/customTypes.js', ['client', 'server']);
  api.addFiles('lib/behavior.js', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('katrotz:astronomy-coordinates');
  api.addFiles('tests/methods.js');
  api.addFiles('tests/customTypes.js');
});

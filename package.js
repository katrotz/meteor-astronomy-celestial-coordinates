Package.describe({
  name: 'katrotz:astronomy-celestial-coordinates',
  version: '0.0.1',
  summary: 'Astronomy add-on enabling relations between mongoDB documents using DBRef',
  git: 'https://github.com/katrotz/meteor-astronomy-celestial-coordinates.git',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('jagi:astronomy');
  api.addFiles('lib/methods.js');
  api.addFiles('lib/customTypes.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('katrotz:astronomy-celestial-coordinates');
  api.addFiles('tests/methods.js');
  api.addFiles('tests/customTypes.js');
});

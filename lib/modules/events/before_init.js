/* global events:true */

events.beforeInit = function beforeInit() {
  var Class = this.constructor;
  var schema = Class.schema;
  //var options = schema.behaviors.coordinates.options;
  //console.log('beforeinit');
  //console.log(schema);

  //console.log(schema.definitions);
  //console.log(JSON.stringify(Object.keys(schema)));
};

Astro.eventManager.on('initDefinition', function onInitDefinitionRelations(schemaDefinition) {
  var coordinates = schemaDefinition.coordinates;
  //var className = this.schema.className;
  var collectionName = this.schema.collection ? this.schema.collection._name : null;
  if (coordinates && collectionName) {
    Astro.coordinates[collectionName] = coordinates;
  }
});

Astro.eventManager.on('initSchema', function onInitSchema(schemaDefinition) {
  console.log(Object.keys(Astro.coordinates));
});
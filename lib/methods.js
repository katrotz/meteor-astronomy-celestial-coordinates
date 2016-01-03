/**
 * Creates an instance of mongoDB DBRef to the current document
 * @returns {MongoInternals.NpmModule.DBRef}
 */
Astro.BaseClass.prototype.dbReference = function() {
  var collection = this.constructor.getCollection();
  var DBRef = MongoInternals.NpmModule.DBRef;

  return new DBRef(collection._name, this._id);
};

methods = {};
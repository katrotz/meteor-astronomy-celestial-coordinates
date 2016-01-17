/* global MongoInternals:false */
/**
 * Define a new field type that allows creation of references between mongoDB documents using DBRef
 * @example: ```
 *  Comment = Astro.Class({
 *    name: 'Comment',
 *    collection: new Meteor.Collection('comments'),
 *    fields: {
 *      content: 'string',
 *      user: {
 *        type: 'ref',
 *        namespace: 'users',
 *      },
 *    },
 *  });
 *  var comment = new Comment({
 *    content: 'Lorem ipsum',
 *    user: Meteor.userId(), //Set the field with with ID of the referenced document
 *  });
 *  //The user field was resolved to the document found under the collection set in the namespace
 *  comment.user.profile; //{}
 *
 * ```
 */
Astro.createType({
  /**
   * Type name
   */
  name: 'ref',

  /**
   * Type constructor
   * @param definition
   * @constructor
   */
  constructor: function ObjectField(definition) {
    Astro.BaseField.apply(this, arguments);

    if (!definition.namespace) {
      throw new Meteor.Error('invalid-input', 'Field of type ref expects a namespace');
    }

    this.namespace = definition.namespace;
  },

  /**
   * Verifies if the value requires casting
   * @param value
   * @returns {boolean}
   */
  needsCast: function needsCast(value) {
    var DBRef = MongoInternals.NpmModule.DBRef;

    return !(value instanceof DBRef);
  },

  /**
   * Casts the value by resolving the reference
   * @param value
   * @returns {*}
   */
  cast: function cast(value) {
    var namespace = this.namespace;
    var DBRef = MongoInternals.NpmModule.DBRef;

    if (namespace && value) {
      var dbRef;
      var reference;

      if ((value instanceof DBRef)) {
        /*Allows to assign direct mongo db references*/
        dbRef = value;
      } else if (value instanceof Astro.BaseClass) {
        /*Allows to assign models*/
        dbRef = value.dbReference();
        reference = value;
      } else {
        /*Allows to assign model key*/
        dbRef = new DBRef(namespace, value);
      }

      //@todo: Add support for lazy loading
      if (reference) {
        /*Related model already initialized*/
        value = reference;
      } else {
        /*Initialize related model*/
        value = Mongo.Collection.get(dbRef.namespace).findOne(dbRef.oid);
      }
    }

    return value;
  },

  /**
   * Verifies if the value requires casting before saving to DB
   * @param value
   * @returns {boolean}
   */
  needsPlain: function needsPlain(value) {
    var DBRef = MongoInternals.NpmModule.DBRef;

    return !(value instanceof DBRef);
  },

  /**
   * Casts the value before storing in the DB
   * @param value
   * @returns {*}
   */
  plain: function plain(value) {
    if (value instanceof Astro.BaseClass) {
      return value.dbReference();
    } else {
      return value;
    }
  },
});
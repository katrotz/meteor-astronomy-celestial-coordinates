
Astro.createBehavior({
  name: 'coordinates',
  options: {
    /**
     * A hasOne association also sets up a one-to-one connection with another model
     * A customer has one address
     * @example:
     * ```
     * {
     *  behaviors: {
     *    coordinates: {
     *      hasOne: {
     *        addresses: {
     *          foreignKey: 'customerId', //Required as at the create schema phase we do not know the collection name
     *        },
     *      },
     *    },
     *  },
     * }
     * ```
     */
    hasOne: false,

    /**
     * A hasMany association indicates a one-to-many connection with another model
     * A customer has many orders
     * @example:
     */
    hasMany: false,

    /**
     * A belongsTo association sets up a one-to-one connection with another model
     * An address belongs to a customer
     * @example:
     */
    belongsTo: false,

    /**
     * A hasAndBelongToMany association creates a direct many-to-many connection with another model
     * Many users are friends with many users
     * @example:
     */
    hasAndBelongToMany: false,
  },
  createSchemaDefinition: function createSchemaDefinition(options) {
    console.log(options);

    console.log(this);

    var schemaDefinition = {
      fields: {
        coordinates: 'string',
      },
      events: {},
      methods: {},
    };

    if (options.hasOne) {
      this.initHasOneRelation(schemaDefinition, options.hasOne);
    }

    if (options.hasMany) {
      this.initHasManyRelation(schemaDefinition, options.hasMany);
    }

    if (options.belongsTo) {
      this.initBelongsToRelation(schemaDefinition, options.belongsTo);
    }

    if (options.hasAndBelongToMany) {
      this.initHasAndBelongsToManyRelation(schemaDefinition, options.hasAndBelongToMany);
    }

    return schemaDefinition;
  },

  initHasOneRelation: function initHasOneRelation(schemaDefinition, options) {
    if (_.isObject(options) && typeof options === 'object') {
      return schemaDefinition;
    } else if (_.isArray(options)) {
      return schemaDefinition;
    } else {
      return schemaDefinition;
    }

    function initCollectionRelation(fieldName) {

    }
  },

  initHasManyRelation: function initHasManyRelation(schemaDefinition, options) {},

  initBelongsToRelation: function initBelongsToRelation(schemaDefinition, options) {},

  initHasAndBelongsToManyRelation: function initHasAndBelongsToManyRelation(schemaDefinition, options) {},
});
/*

User = Astro.Class({
  name: 'User',
  collection: new Meteor.Collection('users'),
  fields: ['name', 'username', 'email'],
  behaviors: {
    coordinates: {
      hasOne: {
        comments: {
          fieldName: 'commentId',
        },
      },
      hasMany: ['comments', 'users'],
      belongsTo: 'users',
      hasAndBelongsToMany: 'users',
    },
  },
});*/

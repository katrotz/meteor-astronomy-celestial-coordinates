/* global methods:false, events:false, Inflector:false, RELATION_TYPES:false */

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

    var schemaDefinition = {
      fields: {},
      events: events,
      methods: methods,
    };

    var relationOptions = {};
    for (var key in RELATION_TYPES) {
      if (RELATION_TYPES.hasOwnProperty(key)) {
        var relationType = RELATION_TYPES[key];

        if (options[relationType]) {
          relationOptions[relationType] = normalizeOption(relationType, options[relationType]);
        }
      }
    }

    Astro.coordinates = schemaDefinition.coordinates = relationOptions;

    function normalizeOption(relationType, relationOptions) {
      var normalized = {};
      if (typeof relationOptions === 'object' && !Array.isArray(relationOptions)) {
        for (var collectionName in relationOptions) {
          if (relationOptions.hasOwnProperty(collectionName)) {
            var overrides = relationOptions[collectionName];
            normalized[collectionName] = normalizeFromString(relationType, collectionName);

            if (overrides.foreignKey) {
              normalized[collectionName].foreignKey = overrides.foreignKey;
            }
          }
        }
      } else if (Array.isArray(relationOptions)) {

        relationOptions.forEach(function(relationOption) {
          if (typeof relationOption === 'string') {
            normalized[relationOption] = normalizeFromString(relationType, relationOption);
          }
        });
      } else if (typeof relationOptions === 'string') {

        normalized[relationOptions] = normalizeFromString(relationType, relationOptions);
      }

      return normalized;
    }

    function normalizeFromString(relationType, collectionName) {
      var normalized = {
        foreignKey: getForeignKey(relationType, collectionName)
      };

      return normalized;
    }

    function getForeignKey(relationType, targetCollectionName) {
      if (RELATION_TYPES.HAS_ONE === relationType || RELATION_TYPES.BELONGS_TO === relationType) {
        return Inflector.singularize(targetCollectionName);
      } else {
        return Inflector.pluralize(targetCollectionName);
      }
    }

    return schemaDefinition;
  }
});
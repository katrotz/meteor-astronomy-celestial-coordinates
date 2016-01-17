# DEPRECATED

# Celestial coordinates for Astronomy

> A simple library that adds mongo DBRef relations support for the Meteor [Astronomy](https://github.com/jagi/meteor-astronomy) models.

## Installation

```meteor add katrotz:astronomy-coordinates```

## Introduction


1. Assign DbRef
2. Assign model
3. Assign model id


Coordinates can be defined as
1. String
2. Array of strings
3. Object with overrides

@todo: can not modify other class definitions for hasOne, hasMany and hasAndBelongsToMany coordinates

///////////////////////////
##Changes

The celestial coordinates introduces the following changes to the Astronomy:

1. A new field type `ref`
2. A new method to all Astronomy model instances `dbReference()`


When defining reference fields, the collection name the reference will be pointing to should be defined under the namespace key.

**Eg. Define a reference to the users collection**

	Astro.Class({
		...
		fields: {
			...
			user: {
				type: 'ref',
				namespace: 'users',
			},
		},
	});

The reference fields are stored as DBRef objects in the database.
	
**Eg. Reference to a model in the users collection**

	{
        "$ref" : "users",
        "$id" : "gnKnu4cwZQN2ossLv"
    }

The reference fields are automatically resolved to the referenced model

**Eg. Once the field was set with the foreign key, it will automatically be resolved with the reference model**

	Comment = Astro.Class({
		name: 'Comment',
		collection: new Meteor.Collection('comments'),
		fields: {
			content: 'string',
			user: {
				type: 'ref',
				namespace: 'users',
			},
		},
	});

	var comment = new Comment({
		content: 'Lorem ipsum',
		user: Meteor.userId(), //Set the value of the foreign key
	});

	comment.user.profile.username; //The user field is automatically resolved with the referenced user model and the output is 'john doe'

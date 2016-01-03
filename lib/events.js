events = {};

events.beforeUpdate = function() {
  var doc = this;
  var Class = doc.constructor;

  // Find a class on which the behavior had been set.
  var classBehavior = Class.getBehavior('coordinates');
  var options = classBehavior.options;

  console.log('Before update', options);

  this.set(coordinates, new Date());
};
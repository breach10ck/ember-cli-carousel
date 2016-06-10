import Ember from 'ember';
import layout from '../templates/components/ember-cli-carousel-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ember-cli-carousel-item'],
  classNameBindings: ['isActive:active'],
  index: 0,
  parentContainer: null,
  isActive: Ember.computed('index', 'parentContainer.activeIndex', function() {
    if(this.get('index') == this.get('parentContainer.activeIndex'))
      return true;
    return false;
  }),
  init: function(){
    this.set('parentContainer', this.nearestWithProperty('carousel_items'));
    this.get('parentContainer.carousel_items').pushObject(this);
    this.set('index',this.get('parentContainer.carousel_items.length')-1);
    this._super();
  }
});

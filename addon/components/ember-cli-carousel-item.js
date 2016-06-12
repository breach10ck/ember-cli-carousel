import Ember from 'ember';
import layout from '../templates/components/ember-cli-carousel-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ember-cli-carousel-item'],
  classNameBindings: ['showForward:forward', 'forwardHide:forward-hide', 'reverseHide:reverse-hide', 'showReverse:reverse'],
  index: 0,
  parentContainer: null,
  showForward: Ember.computed('flag',function(){
    return this.get('flag') == 1;
  }),
  forwardHide: Ember.computed('flag', function(){
    return this.get('flag') == 2;
  }),
  reverseHide: Ember.computed('flag', function(){
    return this.get('flag') == -2;
  }),
  showReverse: Ember.computed('flag', function(){
    return this.get('flag') == -1;
  }),
  isActive: Ember.computed('index', 'parentContainer.activeIndex', function() {
    if(this.get('index') == this.get('parentContainer.activeIndex'))
      return true;
    return false;
  }),
  init: function(){
    this.set('parentContainer', this.nearestWithProperty('carousel_items'));
    this.get('parentContainer.carousel_items').pushObject(this);
    this.set('index',this.get('parentContainer.carousel_items.length')-1);
    if(this.get('index') == 0)
      this.set('flag', this.get('parentContainer.direction')*1);
    this._super();
  }
});

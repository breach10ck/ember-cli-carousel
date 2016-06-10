import Ember from 'ember';
import layout from '../templates/components/ember-cli-carousel';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ember-cli-carousel'],
  activeIndex: 0,
  runLoop: null,
  carouselLength: Ember.computed('carousel_items', function(){
    return this.get('carousel_items.length');
  }),
  timeInterval: 2000,
  init: function(){
    this.set('carousel_items', Ember.A());
    this._super(...arguments);
  },
  didInsertElement: function(){
    this._super(...arguments);
    this.set('runLoop',Ember.run.later(this, this.slideRight, this.get('timeInterval')));
  },
  slideRight: function(){
    this.set('rewind',false);
    this.set('activeIndex', (this.get('activeIndex')+1)%this.get('carouselLength'));
    this.set('runLoop',Ember.run.later(this, this.slideRight, this.get('timeInterval')));
  },
  actions: {
    slideTo: function(index){
      Ember.run.cancel(this.get('runLoop'));
      this.set('activeIndex',index);
      this.set('runLoop',Ember.run.later(this, this.slideRight, this.get('timeInterval')));
    }
  }
});

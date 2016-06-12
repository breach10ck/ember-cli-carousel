import Ember from 'ember';
import layout from '../templates/components/ember-cli-carousel';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  reverse: false,
  direction: Ember.computed('reverse', function(){
    if(this.get('reverse') == true)
      return -1;
    return 1;
  }),
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
    this.get('carousel_items').objectAt(this.get('activeIndex')).set('flag', this.get('direction') * 2);
    this.set('activeIndex', (this.get('activeIndex')+1)%this.get('carouselLength'));
    this.get('carousel_items').objectAt(this.get('activeIndex')).set('flag', this.get('direction') * 1);
    this.set('runLoop',Ember.run.later(this, this.slideRight, this.get('timeInterval')));
  },
  didDestroyElement: function(){
    this._super(...arguments);
    Ember.run.cancel(this.get('runLoop'));
  },
  actions: {
    slideTo: function(index){
      Ember.run.cancel(this.get('runLoop'));
      var dir = index < this.get('activeIndex') ?  -1 : 1;
      if(index != this.get('activeIndex')){
        this.get('carousel_items').objectAt(this.get('activeIndex')).set('flag', dir * this.get('direction') * 2);
        this.set('activeIndex',index);
        this.get('carousel_items').objectAt(this.get('activeIndex')).set('flag', dir * this.get('direction') * 1);
      }
      this.set('runLoop',Ember.run.later(this, this.slideRight, this.get('timeInterval')));
    }
  }
});

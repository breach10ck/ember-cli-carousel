import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-cli-carousel', 'Integration | Component | ember cli carousel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-cli-carousel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-cli-carousel}}
      template block text
    {{/ember-cli-carousel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

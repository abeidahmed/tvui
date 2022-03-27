import Qunit, { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

function assertOpenedMenuButton(selector) {
  Qunit.assert.dom(selector).hasAttribute('id');
  Qunit.assert.dom(selector).hasAttribute('aria-controls');
  Qunit.assert.dom(selector).hasAria('haspopup', 'true');
  Qunit.assert.dom(selector).hasAria('expanded', 'true');
  Qunit.assert.dom(selector).hasAttribute('type', 'button');
}

function assertClosedMenuButton(selector) {
  Qunit.assert.dom(selector).hasAttribute('id');
  Qunit.assert.dom(selector).hasAria('haspopup', 'true');
  Qunit.assert.dom(selector).hasAria('expanded', 'false');
  Qunit.assert.dom(selector).hasAttribute('type', 'button');
  Qunit.assert.dom(selector).doesNotHaveAttribute('aria-controls');
}

function assertButtonLinkedWithMenu(buttonSelector, menuSelector) {
  const button = find(buttonSelector);
  const menu = find(menuSelector);
  Qunit.assert.dom(menuSelector).hasAria('labelledby', button.id);
  Qunit.assert.dom(buttonSelector).hasAria('controls', menu.id);
}

module('Integration | Component | dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Dropdown as |dropdown|>
        <dropdown.Button data-test-button>
          Button
        </dropdown.Button>

        <dropdown.Menu data-test-menu as |menu|>
          <menu.Item>
            Item 1
          </menu.Item>
        </dropdown.Menu>
      </Dropdown>
    `);

    assert.dom('[data-test-button]').hasText('Button');
    assertClosedMenuButton('[data-test-button]');
    assert.dom('[data-test-menu]').isNotVisible();
  });

  test('open/close menu', async function (assert) {
    await render(hbs`
      <Dropdown as |dropdown|>
        <dropdown.Button data-test-button>
          Button
        </dropdown.Button>

        <dropdown.Menu data-test-menu as |menu|>
          <menu.Item data-test-item>
            Item 1
          </menu.Item>
        </dropdown.Menu>
      </Dropdown>
    `);

    await click('[data-test-button]');
    assertOpenedMenuButton('[data-test-button]');
    assert.dom('[data-test-menu]').exists();

    assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

    assert.dom('[data-test-item]').hasAttribute('role', 'menuitem');
    assert.dom('[data-test-item]').hasAttribute('tabindex', '-1');

    await click('[data-test-button]');
    assert.dom('[data-test-menu]').doesNotExist();
  });
});

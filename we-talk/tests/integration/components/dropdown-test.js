import QUnit, { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  find,
  findAll,
  render,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { assertActiveElement } from '../../accessibility-assertions';

function getMenu() {
  return find('[role=menu]');
}

function getMenuItems() {
  return Array.from(findAll('[role=menuitem]'));
}

function assertOpenedMenuButton(selector) {
  QUnit.assert.dom(selector).hasAttribute('id');
  QUnit.assert.dom(selector).hasAttribute('aria-controls');
  QUnit.assert.dom(selector).hasAria('haspopup', 'true');
  QUnit.assert.dom(selector).hasAria('expanded', 'true');
  QUnit.assert.dom(selector).hasAttribute('type', 'button');
}

function assertClosedMenuButton(selector) {
  QUnit.assert.dom(selector).hasAttribute('id');
  QUnit.assert.dom(selector).hasAria('haspopup', 'true');
  QUnit.assert.dom(selector).hasAria('expanded', 'false');
  QUnit.assert.dom(selector).hasAttribute('type', 'button');
  QUnit.assert.dom(selector).doesNotHaveAttribute('aria-controls');
}

function assertButtonLinkedWithMenu(buttonSelector, menuSelector) {
  const button = find(buttonSelector);
  const menu = find(menuSelector);
  QUnit.assert.dom(menuSelector).hasAria('labelledby', button.id);
  QUnit.assert.dom(buttonSelector).hasAria('controls', menu.id);
}

function assertMenuLinkedWithMenuItem(itemSelector, menuSelector = getMenu()) {
  const itemElement = find(itemSelector);

  // Ensure link between menu & menu item is correct
  QUnit.assert
    .dom(menuSelector)
    .hasAria('activedescendant', itemElement.getAttribute('id'));
}

function assertNoActiveMenuItem(menuSelector = getMenu()) {
  QUnit.assert.dom(menuSelector).doesNotHaveAria('activedescendant');
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
          <menu.Item>
            Item 1
          </menu.Item>
          <menu.Item>
            Item 2
          </menu.Item>
          <menu.Item>
            Item 3
          </menu.Item>
        </dropdown.Menu>
      </Dropdown>
    `);

    await click('[data-test-button]');
    assertOpenedMenuButton('[data-test-button]');
    assert.dom('[data-test-menu]').exists();

    assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

    const items = getMenuItems();
    assert.strictEqual(items.length, 3, 'There are three visible menu items');
    assert.dom(items[0]).hasAttribute('role', 'menuitem');
    assert.dom(items[0]).hasAttribute('tabindex', '-1');

    await click('[data-test-button]');
    assert.dom('[data-test-menu]').doesNotExist();
    await assertActiveElement(find('[data-test-button]'));
  });

  module('Keyboard interactions', function () {
    module('Enter key', function () {
      test('it opens the menu', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'Enter');
        assertOpenedMenuButton('[data-test-button]');
        assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[0]);
      });

      test('it should not have active items if there are no menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu></dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'Enter');
        assertOpenedMenuButton('[data-test-button]');
        assertNoActiveMenuItem();
      });

      test('it should close the menu on Enter when there is no active menu item', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        await click('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'Enter');
        assertClosedMenuButton('[data-test-button]');

        const button = find('[data-test-button]');
        await assertActiveElement(button);
      });
    });

    module('Space key', function () {
      test('it opens the menu', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', ' ');
        assertOpenedMenuButton('[data-test-button]');
        assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[0]);
      });

      test('it should not have active items if there are no menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu></dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', ' ');
        assertOpenedMenuButton('[data-test-button]');
        assertNoActiveMenuItem();
      });

      test('it should close the menu on Enter when there is no active menu item', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        await click('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', ' ');
        assertClosedMenuButton('[data-test-button]');

        const button = find('[data-test-button]');
        await assertActiveElement(button);
      });
    });

    module('ArrowDown', function () {
      test('it opens the menu', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowDown');
        assertOpenedMenuButton('[data-test-button]');
        assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[0]);
      });

      test('it should not have active items if there are no menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu></dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowDown');
        assertOpenedMenuButton('[data-test-button]');
        assertNoActiveMenuItem();
      });

      test('it cycles through the menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
              <menu.Item>
                Item 3
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowDown');
        assertOpenedMenuButton('[data-test-button]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[0]);

        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowDown');
        assertMenuLinkedWithMenuItem(menuItems[1]);

        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowDown');
        assertMenuLinkedWithMenuItem(menuItems[2]);

        // Cycles to top
        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowDown');
        assertMenuLinkedWithMenuItem(menuItems[0]);
      });
    });

    module('ArrowUp', function () {
      test('it opens the menu', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowUp');
        assertOpenedMenuButton('[data-test-button]');
        assertButtonLinkedWithMenu('[data-test-button]', '[data-test-menu]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[menuItems.length - 1]);
      });

      test('it should not have active items if there are no menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu></dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowUp');
        assertOpenedMenuButton('[data-test-button]');
        assertNoActiveMenuItem();
      });

      test('it cycles through the menu items', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
              <menu.Item>
                Item 3
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        assertClosedMenuButton('[data-test-button]');
        await triggerKeyEvent('[data-test-button]', 'keydown', 'ArrowUp');
        assertOpenedMenuButton('[data-test-button]');

        const menuItems = getMenuItems();
        assertMenuLinkedWithMenuItem(menuItems[menuItems.length - 1]);

        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowUp');
        assertMenuLinkedWithMenuItem(menuItems[menuItems.length - 2]);

        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowUp');
        assertMenuLinkedWithMenuItem(menuItems[menuItems.length - 3]);

        // Cycles to bottom
        await triggerKeyEvent('[data-test-menu]', 'keydown', 'ArrowUp');
        assertMenuLinkedWithMenuItem(menuItems[menuItems.length - 1]);
      });
    });

    module('Escape', function () {
      test('it closes the menu', async function () {
        await render(hbs`
          <Dropdown as |dropdown|>
            <dropdown.Button data-test-button>
              Button
            </dropdown.Button>

            <dropdown.Menu data-test-menu as |menu|>
              <menu.Item>
                Item 1
              </menu.Item>
              <menu.Item>
                Item 2
              </menu.Item>
            </dropdown.Menu>
          </Dropdown>
        `);

        await click('[data-test-button]');
        assertOpenedMenuButton('[data-test-button]');

        await triggerKeyEvent('[data-test-menu]', 'keydown', 'Escape');
        assertClosedMenuButton('[data-test-button]');
        const button = find('[data-test-button]');
        await assertActiveElement(button);
      });
    });
  });
});

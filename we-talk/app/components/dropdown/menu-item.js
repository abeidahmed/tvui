import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class DropdownMenuItem extends Component {
  menuItemId = `${guidFor(this)}-wetalk-menu-item`;
  @tracked active = false;
  item = null;

  @action registerItem(item) {
    this.item = item;
    this.args.registerItem(this);
  }

  @action unregisterItem() {
    this.item = null;
    this.args.unregisterItem(this);
  }

  @action onMouseOver() {
    if (this.active) return;
    this.args.setActiveItem(this);
  }

  activate() {
    this.item.focus();
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}

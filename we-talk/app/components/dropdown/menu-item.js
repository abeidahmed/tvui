import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DropdownMenuItem extends Component {
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

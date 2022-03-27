import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class DropdownComponent extends Component {
  @tracked isActive = false;

  @action toggleMenu() {
    this.isActive = !this.isActive;
  }

  @action closeMenu() {
    this.isActive = false;
  }

  get menuId() {
    return `${this.guid}-menu`;
  }

  get buttonId() {
    return `${this.guid}-button`;
  }

  get guid() {
    return `${guidFor(this)}-wetalk`;
  }
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class DropdownComponent extends Component {
  @tracked isActive = false;
  @tracked items = [];
  @tracked activeItem = undefined;

  @action toggleMenu() {
    this.isActive = !this.isActive;
  }

  @action openMenu() {
    this.isActive = true;
  }

  @action closeMenu() {
    this.isActive = false;
  }

  @action registerItem(item) {
    this.items = [...this.items, item];
  }

  @action unregisterItem(item) {
    const { items } = this;
    const index = items.indexOf(item);
    items.splice(index, 1);
    this.items = items;
  }

  @action setActiveItem(item) {
    if (!item) return;

    this.items.forEach((item) => item.deactivate());
    this.activeItem = item;
    item.activate();
  }

  @action navigate(index) {
    let focusIndex = this.items.indexOf(this.activeItem);
    const atExtreme = focusIndex === this.items.length - 1 && index === 1;
    if (atExtreme) focusIndex = -1;

    let indexOfItem = index === 1 ? 0 : this.items.length - 1;
    if (focusIndex >= 0) {
      const newIndex = focusIndex + index;
      if (newIndex >= 0 && newIndex < this.items.length) {
        indexOfItem = newIndex;
      }
    }

    this.setActiveItem(this.items[indexOfItem]);
  }

  @action reset() {
    this.closeMenu();
    this.items = [];
    this.activeItem = undefined;
  }

  get menuId() {
    return `${this.guid}-menu`;
  }

  get buttonId() {
    return `${this.guid}-button`;
  }

  // Private

  get guid() {
    return `${guidFor(this)}-wetalk`;
  }
}

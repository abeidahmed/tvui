import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DropdownMenuComponent extends Component {
  @tracked items = [];
  @tracked activeItem = null;

  @action registerItem(item) {
    this.items = [...this.items, item];
  }

  @action unregisterItem(item) {
    const { items } = this;
    const index = items.indexOf(item);
    items.splice(index, 1);
    this.items = items;
  }

  @action onKeydown(event) {
    switch (event.key) {
      // Escape key is handled by focus-trap
      case 'Enter': {
        if (this.activeItem) {
          cancel(event);
          this.activeItem.item.click();
          this.reset();
        }
        break;
      }
      case 'ArrowDown': {
        cancel(event);
        if (this.activeItem) {
          this.move(1);
        } else {
          this.setActiveItem(this.items[0]);
        }
        break;
      }
      case 'ArrowUp': {
        cancel(event);
        if (this.activeItem) {
          this.move(-1);
        } else {
          this.setActiveItem(this.items[this.items.length - 1]);
        }
        break;
      }
    }
  }

  @action setActiveItem(item) {
    if (!item) return;

    this.items.forEach((item) => item.deactivate());
    this.activeItem = item;
    item.activate();
  }

  @action allowClickOutsideFocusTrap(event) {
    return this.clickInsideMenuTrigger(event);
  }

  @action clickOutsideFocusTrapDeactivates(event) {
    return !this.clickInsideMenuTrigger(event);
  }

  @action reset() {
    this.activeItem = null;
    this.items = [];
    this.args.closeMenu();
  }

  // Private

  move(index) {
    if (!this.activeElement) return;

    let focusIndex = this.items.indexOf(this.activeElement);
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

  clickInsideMenuTrigger(event) {
    const buttonElement = document.getElementById(this.args.buttonId);
    // The `buttonElement` could not exist if the element has been removed from the DOM
    return buttonElement ? buttonElement.contains(event.target) : false;
  }

  get activeItemIndex() {
    return this.items.indexOf(this.activeItem);
  }

  get activeElement() {
    return this.items.find((item) => item === this.activeItem);
  }
}

function cancel(event) {
  event.preventDefault();
  event.stopPropagation();
}

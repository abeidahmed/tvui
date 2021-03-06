import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Keys } from '../../constants/keyboard';

export default class DropdownMenuComponent extends Component {
  @action onKeydown(event) {
    switch (event.key) {
      // Escape key is handled by focus-trap
      case Keys.Enter: {
        if (this.args.activeItem) {
          event.preventDefault();
          event.stopPropagation();
          this.args.activeItem.item.click();
          this.args.reset();
        }
        break;
      }
      case Keys.ArrowDown: {
        event.preventDefault();
        event.stopPropagation();
        this.args.navigate(1);
        break;
      }
      case Keys.ArrowUp: {
        event.preventDefault();
        event.stopPropagation();
        this.args.navigate(-1);
        break;
      }
    }
  }

  @action allowClickOutsideFocusTrap(event) {
    return this.clickInsideMenuTrigger(event);
  }

  @action clickOutsideFocusTrapDeactivates(event) {
    return !this.clickInsideMenuTrigger(event);
  }

  // Private

  clickInsideMenuTrigger(event) {
    const buttonElement = document.getElementById(this.args.buttonId);
    // The `buttonElement` could not exist if the element has been removed from the DOM
    return buttonElement ? buttonElement.contains(event.target) : false;
  }
}

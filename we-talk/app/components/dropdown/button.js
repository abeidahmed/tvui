import Component from '@glimmer/component';
import { action } from '@ember/object';
import { next } from '@ember/runloop';

export default class DropdownButton extends Component {
  @action onKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case ' ':
      case 'Enter': {
        event.preventDefault();
        event.stopPropagation();

        if (this.args.isActive) {
          this.args.closeMenu();
        } else {
          this.args.openMenu();
          next(() => {
            this.args.navigate(1);
          });
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        event.stopPropagation();
        this.args.openMenu();

        next(() => {
          this.args.navigate(-1);
        });
        break;
      }
    }
  }
}

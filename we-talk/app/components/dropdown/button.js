import Component from '@glimmer/component';
import { action } from '@ember/object';
import { next } from '@ember/runloop';
import { Keys } from '../../constants/keyboard';

export default class DropdownButton extends Component {
  @action onKeydown(event) {
    switch (event.key) {
      case Keys.ArrowDown:
      case Keys.Space:
      case Keys.Enter: {
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
      case Keys.ArrowUp: {
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

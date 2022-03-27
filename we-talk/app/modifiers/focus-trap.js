import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';

export default modifier(function focusTrap(element, _params, { options } = {}) {
  const trap = createFocusTrap(element, options);
  trap.activate();

  return () => {
    trap.deactivate();
  };
});

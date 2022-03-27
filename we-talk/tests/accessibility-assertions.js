import QUnit from 'qunit';

export function assertActiveElement(element, comment) {
  try {
    if (element === null) {
      QUnit.assert.notEqual(element, null);
      return;
    }
    return QUnit.assert.waitFor(() => {
      QUnit.assert.strictEqual(document.activeElement, element, comment);
    });
  } catch (err) {
    Error.captureStackTrace(err, assertActiveElement);
    throw err;
  }
}

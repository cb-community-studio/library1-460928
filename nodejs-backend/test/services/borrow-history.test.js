const assert = require('assert');
const app = require('../../src/app');

describe('\'borrow-history\' service', () => {
  it('registered the service', () => {
    const service = app.service('borrow-history');

    assert.ok(service, 'Registered the service (borrow-history)');
  });
});

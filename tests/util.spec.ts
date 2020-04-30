import * as util from '#/util'

describe('toBoolean function', () => {

  test('should return true when "true" is passed', (): void => {
    const sample = util.toBoolean('true');
    expect(sample).toBe(true);
  });

  test ('should return false in other cases', (): void => {
    const sample = util.toBoolean('other strings');
    expect(sample).toBe(false);
  });

});

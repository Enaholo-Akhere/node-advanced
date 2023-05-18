describe('number operations', () => {
  test('1 + 1 should equal 2', () => {
    let a = 1;
    let b = 1;
    expect(a + b).toBe(2);
  });

  test('5 + 6 should equal 2', () => {
    let a = 5;
    let b = 6;
    expect(a + b).not.toBe(10);
  });
});

describe('testing other match methods', () => {
  test('testing that a variable is undefined', () => {
    let number = undefined;

    expect(number).not.toBeDefined();
    expect(number).toBeUndefined();
    expect(number).not.toBeNull();
    expect(number).toBeFalsy();
    expect(number).not.toBeTruthy();
  });

  it('should expect zero to act like zero', () => {
    let number = 0;

    expect(number).not.toBeNull();
    expect(number).not.toBeUndefined();
    expect(number).toBeDefined();
    expect(number).toBeFalsy();
    expect(number).not.toBeTruthy();
  });

  test('number comparison', () => {
    let a = 1;
    let b = 2;
    expect(a + b).toBeGreaterThan(2);
    expect(a + b).toBeGreaterThanOrEqual(3);
    expect(a + b).toBeGreaterThanOrEqual(3);
    expect(a + b).toBeLessThan(10);
  });

  test('there should be no I in team', () => {
    let team = 'team hello good people';

    expect(team).not.toMatch(/i/);
  });

  test('there is stop in Christopher', () => {
    let chris = 'Christopher';
    expect(chris).toMatch(/stop/i);
  });
});

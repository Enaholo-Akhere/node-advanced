const { before } = require('lodash');
const { sum, deleteUser, findOneUserById  } = require('../utils/helpers');

let userData = [];
console.log(userData);

beforeAll(() => {
    userData = ['sarah', 'glory', 'victor'];
      console.log('userData', userData);
    
});

beforeEach(() => {
    console.log('before each test start');
})

afterEach(() => {
    console.log('after start');
})

afterAll(() => {
    userData = []
    console.log('userData', userData);
  console.log('after all the test stops');
});

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

  const shoppingList = [
    'toilet role',
    'towel',
    'soap',
    'facials',
    'morning fresh',
    'Ps4',
  ];

  test('not to contain PS4', () => {
    expect(shoppingList).not.toContain(/ps4/i);
  });
});

describe('testing non-primitive types', () => {
  const user = {
    name: 'samuel',
  };
  user['age'] = 45;
  test('testing age', () => {
    expect(user).toEqual({
      name: 'samuel',
      age: 45,
    });
  });

  test('should return a user with name and age key', () => {
    expect(user).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        age: expect.any(Number),
      })
    );
  });

  test('array equality', () => {
    const users = ['Enaholo', 'Akhere', 'Desmond'];
    users.push('Jacob');

    expect(users).toEqual(['Enaholo', 'Akhere', 'Desmond', 'Jacob']);
    expect(users).toEqual(expect.arrayContaining([expect.any(String)]));

    const userObjArray = [
      { name: 'Clement', age: 12 },
      { name: 'Akhere', age: 15 },
      { name: 'Enaholo', age: 25 },
    ];
    userObjArray.push({
      name: 'Gerrard',
      age: 42,
    });

    expect(userObjArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          age: expect.any(Number),
        }),
      ])
    );
  });
});

describe('testing modularized functions', () => {
  const userArray = [
    { id: 1, name: 'Clement', age: 12 },
    { id: 2, name: 'Akhere', age: 15 },
    { id: 3, name: 'Enaholo', age: 25 },
    { id: 4, name: 'Enaholo2', age: 20 },
  ];

  test('sum of A and B', () => {
    expect(sum(4, 4)).toBe(8);
  });

  test('deleting a user', () => {
    expect(deleteUser(userArray, 1)).toEqual(
      expect.arrayContaining([
        // { id: 1, name: 'Clement', age: 12 },
        { id: 2, name: 'Akhere', age: 15 },
        { id: 3, name: 'Enaholo', age: 25 },
        { id: 4, name: 'Enaholo2', age: 20 },
      ])
    );
  });

  test('select one user', () => {
    expect(findOneUserById(userArray, 4)).toEqual([
      { id: 4, name: 'Enaholo2', age: 20 },
    ]);
  });
});

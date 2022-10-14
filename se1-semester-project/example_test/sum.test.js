/* eslint-env jest */
const sum = require('./sum')

test('Adds 2 numbers together correctly', () => {
  expect(sum(1, 2)).toBe(3)
})

// This file is meant to be an example of how to write tests

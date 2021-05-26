import { strlength } from '../util'

test('two plus two is four', () => {
  expect(strlength('不怕痛的人 (大制作家1简单与伟大)')).toBe(17);
});
import test from 'node:test';
import assert from 'node:assert/strict';
import { planDecode, frameAt } from './scramble.js';

const target = 'ROLE  FULL-STACK\nSTATUS  OPEN TO WORK';
const plan = planDecode(target, 42);

test('plan has one entry per character, all between 0 and 1', () => {
  assert.equal(plan.length, target.length);
  assert.ok(plan.every((p) => p >= 0 && p < 1));
});

test('progress 1 returns the target exactly', () => {
  assert.equal(frameAt(target, plan, 1, 3), target);
});

test('every in-between frame keeps length and whitespace in place', () => {
  for (const p of [0, 0.2, 0.5, 0.8]) {
    const out = frameAt(target, plan, p, 5);
    assert.equal(out.length, target.length);
    for (let i = 0; i < target.length; i++) {
      if (/\s/.test(target[i])) assert.equal(out[i], target[i]);
    }
  }
});

test('progress 0 hides most letters', () => {
  const out = frameAt(target, plan, 0, 1);
  const same = [...out].filter((c, i) => c === target[i] && /\S/.test(c)).length;
  assert.ok(same < target.replace(/\s/g, '').length / 2);
});

test('same tick gives the same noise', () => {
  assert.equal(frameAt(target, plan, 0.3, 9), frameAt(target, plan, 0.3, 9));
});

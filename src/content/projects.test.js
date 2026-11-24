import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { projectSchema } from '../lib/project-schema.js';

const dir = new URL('./projects/', import.meta.url);
const files = readdirSync(dir).filter((f) => /\.mdx?$/.test(f));

function frontmatter(file) {
  const m = readFileSync(new URL(file, dir), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(m, `${file} has no frontmatter block`);
  return parse(m[1]);
}

test('there is at least one project', () => {
  assert.ok(files.length > 0, `no projects found in ${fileURLToPath(dir)}`);
});

const orders = new Map();
for (const file of files) {
  const data = frontmatter(file);

  test(`${file}: frontmatter matches the schema`, () => {
    const result = projectSchema.safeParse(data);
    assert.ok(result.success, result.success ? '' : JSON.stringify(result.error.issues));
  });

  orders.set(file, data.order);
}

test('project order values are unique', () => {
  const values = [...orders.values()];
  assert.equal(new Set(values).size, values.length, JSON.stringify([...orders]));
});

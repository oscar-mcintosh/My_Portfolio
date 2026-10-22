import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  countProjectsByDiscipline,
  dedupeProjectsById,
  filterProjectsByDiscipline,
  getProjectDiscipline,
  getProjectPath,
  getProjectTechnologies,
  isSafeExternalUrl,
  normalizeDiscipline,
} from '../utils/project-utils.js';

const projects = [
  { id: 'sales-dashboard', category: ['Data Analysis'] },
  { id: 'sql-queries', category: ['SQL'] },
  { id: 'agency-site', category: ['Web Development'] },
  { id: 'explicit', discipline: 'web-development', category: ['SQL'] },
  { id: 'uncategorised', category: [null] },
];

test('getProjectDiscipline infers from categories and respects explicit field', () => {
  assert.equal(getProjectDiscipline(projects[0]), 'data-analytics');
  assert.equal(getProjectDiscipline(projects[1]), 'data-analytics');
  assert.equal(getProjectDiscipline(projects[2]), 'web-development');
  assert.equal(getProjectDiscipline(projects[3]), 'web-development');
  assert.equal(getProjectDiscipline(projects[4]), null);
  assert.equal(getProjectDiscipline({ id: 'x', category: 'Webflow' }), 'web-development');
});

test('normalizeDiscipline falls back to all for unknown values', () => {
  assert.equal(normalizeDiscipline('data-analytics'), 'data-analytics');
  assert.equal(normalizeDiscipline(['web-development']), 'web-development');
  assert.equal(normalizeDiscipline('nope'), 'all');
  assert.equal(normalizeDiscipline(undefined), 'all');
  assert.equal(normalizeDiscipline('all'), 'all');
});

test('filterProjectsByDiscipline returns matching projects', () => {
  assert.equal(filterProjectsByDiscipline(projects, 'all').length, 5);
  assert.deepEqual(
    filterProjectsByDiscipline(projects, 'data-analytics').map((p) => p.id),
    ['sales-dashboard', 'sql-queries']
  );
  assert.deepEqual(
    filterProjectsByDiscipline(projects, 'web-development').map((p) => p.id),
    ['agency-site', 'explicit']
  );
});

test('countProjectsByDiscipline derives counts from data', () => {
  assert.deepEqual(countProjectsByDiscipline(projects), {
    all: 5,
    'data-analytics': 2,
    'web-development': 2,
  });
  assert.deepEqual(countProjectsByDiscipline([]), {
    all: 0,
    'data-analytics': 0,
    'web-development': 0,
  });
});

test('dedupeProjectsById drops duplicates and records without ids', () => {
  const result = dedupeProjectsById([{ id: 'a' }, { id: 'a' }, { id: 'b' }, {}, null]);
  assert.deepEqual(result.map((p) => p.id), ['a', 'b']);
});

test('getProjectTechnologies splits comma strings and dedupes', () => {
  assert.deepEqual(
    getProjectTechnologies({ technology: ['Vue.js, Nuxt.js', 'Firebase', 'Vue.js', ''] }),
    ['Vue.js', 'Nuxt.js', 'Firebase']
  );
  assert.deepEqual(getProjectTechnologies({}), []);
});

test('getProjectPath encodes the project id', () => {
  assert.equal(getProjectPath({ id: 'abc 123' }), '/projects/abc%20123');
});

test('isSafeExternalUrl only accepts http(s)', () => {
  assert.equal(isSafeExternalUrl('https://github.com/oscar-mcintosh'), true);
  assert.equal(isSafeExternalUrl('javascript:alert(1)'), false);
  assert.equal(isSafeExternalUrl('not a url'), false);
  assert.equal(isSafeExternalUrl(null), false);
});

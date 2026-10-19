// Run: node scripts/check-level.mjs
import assert from 'node:assert/strict';

import { getLevelProgress } from '../src/utils/level.ts';

assert.deepEqual(getLevelProgress(0), { level: 1, xpIntoLevel: 0, xpForLevel: 1000 });
assert.deepEqual(getLevelProgress(999), { level: 1, xpIntoLevel: 999, xpForLevel: 1000 });
assert.deepEqual(getLevelProgress(1000), { level: 2, xpIntoLevel: 0, xpForLevel: 2000 });
assert.deepEqual(getLevelProgress(3500), { level: 3, xpIntoLevel: 500, xpForLevel: 3000 });
assert.deepEqual(getLevelProgress(-50), { level: 1, xpIntoLevel: 0, xpForLevel: 1000 });

console.log('level checks passed');

import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {shuffle, freshProgress, isMastered, isDue, recordAnswer, chooseQuestions, validProgress, DAY} from '../dist/engine.js';
import {quizConfig} from '../dist/quiz-config.js';

const content = (await Promise.all(quizConfig.dataFiles.map(file => readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8').then(JSON.parse)))).flat();
const categories = ['astronomy', 'biology', 'geology'];
function makeBank(topics, perTopic = 6) {
  return topics.flatMap(category => Array.from({length: perTopic}, (_, index) => ({id: `${category}-${index}`, category, difficulty: index % 3 + 1})));
}
const bank = makeBank(categories);
const ids = new Set(bank.map(q => q.id));
const progressOptions = {categories};
const [first, second, third] = bank.map(q => q.id);
let checks = 0;
function test(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
function seeded(seed) { let state = seed >>> 0; return () => { state = (Math.imul(1664525, state) + 1013904223) >>> 0; return state / 4294967296; }; }
function valid(progress) { return validProgress(progress, ids, progressOptions); }
function sessionFixture() {
  const p = freshProgress();
  p.session = {id: '123', mode: 'mixed', category: null, queue: [first, second], index: 0, answers: {}, orders: {[first]: [2, 1, 0, 3], [second]: [3, 2, 0, 1]}, confidences: {}, hints: {}, selections: {}};
  return p;
}

test('shuffle preserves input and permutation', () => {
  const a = [0, 1, 2, 3];
  const s = shuffle(a, seeded(7));
  assert.deepEqual(a, [0, 1, 2, 3]);
  assert.deepEqual([...s].sort(), a);
});
test('mixed rounds never repeat an ID, even beyond bank size', () => {
  for (let seed = 1; seed < 20; seed++) {
    const q = chooseQuestions(bank, {}, {count: bank.length + 20, random: seeded(seed)});
    assert.equal(q.length, bank.length);
    assert.equal(new Set(q.map(x => x.id)).size, bank.length);
  }
});
test('mixed selection balances arbitrary three- and four-topic quizzes', () => {
  for (const topics of [categories, [...categories, 'chemistry']]) {
    const custom = makeBank(topics);
    for (let seed = 1; seed < 20; seed++) {
      for (let count = 1; count <= custom.length; count++) {
        const selected = chooseQuestions(custom, {}, {count, random: seeded(seed)});
        const sizes = topics.map(id => selected.filter(q => q.category === id).length);
        assert.equal(selected.length, count);
        assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1);
      }
    }
  }
});
test('short rounds can include every category across sessions', () => {
  const seen = new Set();
  for (let seed = 1; seed <= 20; seed++) chooseQuestions(bank, {}, {count: 2, random: seeded(seed)}).forEach(q => seen.add(q.category));
  assert.deepEqual([...seen].sort(), [...categories].sort());
});
test('placement uses configured category repetition and favors easier questions', () => {
  const placementCategories = ['biology', 'astronomy', 'geology', 'biology'];
  const q = chooseQuestions(bank, {}, {mode: 'placement', count: 4, placementCategories, random: () => 0});
  assert.equal(q.filter(x => x.category === 'biology').length, 2);
  assert.equal(new Set(q.map(x => x.category)).size, 3);
  assert.ok(q.every(x => x.difficulty === 1));
});
test('placement derives categories from the bank when configuration is omitted', () => {
  const q = chooseQuestions(bank, {}, {mode: 'placement', count: 6, random: seeded(3)});
  for (const category of categories) assert.equal(q.filter(x => x.category === category).length, 2);
});
test('partial or stale category configuration does not hide bank questions', () => {
  const q = chooseQuestions(bank, {}, {categoryOrder: ['missing', 'biology', 'biology'], count: bank.length, random: seeded(3)});
  assert.equal(new Set(q.map(x => x.id)).size, bank.length);
  assert.equal(chooseQuestions(bank, {}, {mode: 'placement', placementCategories: ['missing'], count: 3}).length, 3);
});
test('depleted categories, empty banks, and unavailable topics are safe', () => {
  const uneven = bank.filter(q => q.category !== 'astronomy' || q.id === first);
  assert.equal(chooseQuestions(uneven, {}, {count: bank.length}).length, uneven.length);
  assert.deepEqual(chooseQuestions([], {}, {count: 10}), []);
  assert.deepEqual(chooseQuestions(bank, {}, {category: 'missing'}), []);
  for (const count of [0, -1, NaN, Infinity, 1.5]) assert.deepEqual(chooseQuestions(bank, {}, {count}), []);
});
test('topic selection respects requested category and available count', () => {
  const q = chooseQuestions(bank, {}, {category: 'geology', count: bank.length, random: seeded(4)});
  assert.equal(q.length, bank.filter(x => x.category === 'geology').length);
  assert.ok(q.every(x => x.category === 'geology'));
});
test('configured edition works with its actual bank size and placement categories', () => {
  assert.ok(content.length > 0);
  assert.equal(new Set(content.map(q => q.id)).size, content.length);
  const categoryOrder = quizConfig.topics.map(topic => topic.id);
  for (const count of quizConfig.roundSizes) {
    const q = chooseQuestions(content, {}, {count, categoryOrder, random: seeded(10)});
    assert.equal(q.length, Math.min(content.length, count));
  }
  const q = chooseQuestions(content, {}, {mode: 'placement', count: quizConfig.placementCount, categoryOrder, placementCategories: quizConfig.placementCategories, random: seeded(3)});
  assert.equal(q.length, Math.min(content.length, quizConfig.placementCount));
  assert.equal(new Set(q.map(x => x.id)).size, q.length);
});
test('correct streak schedules growing review intervals; misses reset', () => {
  let p;
  for (const [i, days] of [1, 3, 7, 14, 30, 30].entries()) {
    p = recordAnswer(p, true, 'medium', false, 1000);
    assert.equal(p.streak, i + 1);
    assert.equal(p.due, 1000 + days * DAY);
  }
  assert.ok(isMastered(p));
  p = recordAnswer(p, false, 'high', false, 2000);
  assert.equal(p.streak, 0);
  assert.equal(p.right, 6);
  assert.equal(p.attempts, 7);
  assert.ok(isDue(p, 2000));
  assert.ok(!isMastered(p));
});
test('skips are due immediately and do not increase correct count', () => {
  const p = recordAnswer(undefined, false, '', true, 2000);
  assert.equal(p.right, 0);
  assert.equal(p.attempts, 1);
  assert.ok(isDue(p, 2000));
  assert.equal(p.skipped, true);
});
test('review selects only due questions and prioritizes confident misses', () => {
  const now = 10000;
  const p = {[first]: recordAnswer(undefined, false, 'high', false, now), [second]: recordAnswer(undefined, true, '', false, now), [third]: recordAnswer(undefined, false, 'low', false, now)};
  const q = chooseQuestions(bank, p, {mode: 'review', count: 10, now, random: () => 0});
  assert.deepEqual(q.map(x => x.id), [first, third]);
  assert.deepEqual(chooseQuestions(bank, {}, {mode: 'review'}), []);
});
test('empty progress and ordinary question records validate without category configuration', () => {
  const p = freshProgress();
  assert.ok(validProgress(p, ids));
  p.questions[first] = recordAnswer(undefined, true, 'low', false, 1000);
  assert.ok(validProgress(p, ids));
  assert.ok(!valid({...p, questions: []}));
});
test('sessions and round history require explicit configured categories', () => {
  const p = sessionFixture();
  assert.equal(validProgress(p, ids), false);
  assert.ok(valid(p));
  p.session.mode = 'topic';
  p.session.category = 'astronomy';
  assert.ok(valid(p));
  assert.equal(validProgress(p, ids, {categories: ['unrelated']}), false);
  assert.equal(validProgress(p, ids, {categories: 'astronomy'}), false);
  p.session = null;
  p.rounds = [{id: 'done', date: 1000, mode: 'mixed', category: null, total: 5, right: 3}];
  assert.equal(validProgress(p, ids), false);
  assert.ok(valid(p));
});
test('unfinished, answered, skipped, and advanced sessions survive serialization', () => {
  const p = sessionFixture();
  assert.ok(valid(JSON.parse(JSON.stringify(p))));
  p.session.selections[first] = 2;
  p.session.answers[first] = {chosen: 2, correct: true, skipped: false, confidence: ''};
  p.questions[first] = recordAnswer(undefined, true, '', false, 1000);
  assert.ok(valid(p));
  p.session.index = 1;
  assert.ok(valid(p));
  p.session.answers[second] = {chosen: null, correct: false, skipped: true, confidence: ''};
  p.questions[second] = recordAnswer(undefined, false, '', true, 2000);
  assert.ok(valid(p));
});
test('malformed imported sessions are rejected without throwing', () => {
  const mutations = [p => p.session.category = 'unknown', p => p.session.mode = 'unknown', p => p.session.orders[first] = ['0', '1', '2', '3'], p => p.session.orders[first] = [0, 0, 2, 3], p => p.session.answers = [], p => p.session.answers[first] = null, p => p.session.index = 1, p => p.session.queue = [first, first], p => p.session.queue = ['missing'], p => p.session.hints[first] = 'yes', p => p.session.confidences[first] = {}, p => p.session.selections[first] = '0', p => p.session.selections.extra = 0, p => p.session.orders = 'truthy', p => p.session = {}, p => p.session.mode = 'topic'];
  for (const mutate of mutations) {
    const p = sessionFixture();
    mutate(p);
    assert.equal(valid(p), false);
  }
});
test('impossible progress records and malformed round summaries are rejected', () => {
  const good = freshProgress();
  good.questions[first] = recordAnswer(undefined, true, 'high', false, 1000);
  for (const [key, value] of [['attempts', -1], ['right', 2], ['streak', 2], ['lastCorrect', false], ['due', Infinity], ['confidence', 'other'], ['skipped', true]]) {
    const p = structuredClone(good);
    p.questions[first][key] = value;
    assert.equal(valid(p), false);
  }
  const p = freshProgress();
  p.rounds = [{id: 'done', date: 1000, mode: 'topic', category: 'astronomy', total: 5, right: 3}];
  assert.ok(valid(p));
  p.rounds[0].category = 'unknown';
  assert.equal(valid(p), false);
  p.rounds[0].category = 'astronomy';
  p.rounds[0].right = 6;
  assert.equal(valid(p), false);
});
console.log(`${checks} engine checks passed.`);

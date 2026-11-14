import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve, dirname, sep} from 'node:path';
import assert from 'node:assert/strict';
import {quizConfig} from '../dist/quiz-config.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const safeId = value => nonempty(value) && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value) && !['constructor', 'prototype', '__proto__'].includes(value);
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
function httpsUrl(value, label) {
  assert(nonempty(value), `${label}: URL required`);
  assert.equal(new URL(value).protocol, 'https:', `${label}: HTTPS URL required`);
}
function readData(path) {
  assert(nonempty(path), 'Data file path required');
  const file = resolve(dist, path);
  assert(file.startsWith(dist + sep), 'Data paths must stay inside dist/');
  const data = JSON.parse(readFileSync(file, 'utf8'));
  assert(Array.isArray(data), `${path}: expected a JSON array`);
  return data;
}
function validateQuestions(bank, categories, label = 'Question bank') {
  assert(bank.length > 0, `${label} must contain at least one question`);
  assert.equal(new Set(bank.map(q => q.id)).size, bank.length, `${label}: unique IDs`);
  assert.equal(new Set(bank.map(q => q.prompt)).size, bank.length, `${label}: unique prompts`);
  for (const q of bank) {
    assert(safeId(q.id), `${label}: safe question ID`);
    assert(categories.has(q.category), `${q.id}: configured category`);
    assert([1, 2, 3].includes(q.difficulty), `${q.id}: difficulty`);
    assert(nonempty(q.prompt) && q.prompt.length > 20, `${q.id}: prompt`);
    assert(Array.isArray(q.options) && q.options.length === 4, `${q.id}: four options`);
    for (const option of q.options) {
      assert(nonempty(option.text) && nonempty(option.explanation) && option.explanation.length > 15, `${q.id}: explained options`);
    }
    assert.equal(new Set(q.options.map(o => o.text.trim().toLowerCase())).size, 4, `${q.id}: distinct options`);
    assert(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, `${q.id}: answer key`);
    assert(nonempty(q.hint) && nonempty(q.takeaway), `${q.id}: learning supports`);
    assert(Array.isArray(q.sources) && q.sources.length > 0, `${q.id}: evidence`);
    for (const source of q.sources) {
      assert(nonempty(source.title), `${q.id}: source title`);
      httpsUrl(source.url, q.id);
    }
    assert(date(q.asOf), `${q.id}: valid review date`);
    assert(Array.isArray(q.tags) && q.tags.length > 0 && q.tags.every(nonempty), `${q.id}: tags`);
  }
}

assert(Array.isArray(quizConfig.topics) && quizConfig.topics.length > 0, 'Configure at least one topic');
const categories = new Set(quizConfig.topics.map(topic => topic.id));
assert.equal(categories.size, quizConfig.topics.length, 'Unique topic IDs');
for (const topic of quizConfig.topics) assert(safeId(topic.id) && nonempty(topic.title) && nonempty(topic.short), 'Topics need safe IDs and display labels');
assert(Array.isArray(quizConfig.dataFiles) && quizConfig.dataFiles.length > 0, 'Configure at least one question file');
assert.equal(new Set(quizConfig.dataFiles).size, quizConfig.dataFiles.length, 'Unique data file paths');
assert(Array.isArray(quizConfig.placementCategories) && quizConfig.placementCategories.length > 0 && quizConfig.placementCategories.every(id => categories.has(id)), 'Placement categories must reference configured topics');
assert(Number.isSafeInteger(quizConfig.placementCount) && quizConfig.placementCount > 0, 'Positive placement count');
assert(Array.isArray(quizConfig.roundSizes) && quizConfig.roundSizes.length > 0 && quizConfig.roundSizes.every(n => Number.isSafeInteger(n) && n > 0), 'Positive round sizes');
assert.equal(new Set(quizConfig.roundSizes).size, quizConfig.roundSizes.length, 'Unique round sizes');
assert(quizConfig.roundSizes.includes(quizConfig.defaultRoundSize), 'Default round size must be one of the available sizes');
assert(nonempty(quizConfig.storageKey), 'Progress storage key required');

const bank = quizConfig.dataFiles.flatMap(readData);
validateQuestions(bank, categories);
for (const id of categories) assert(bank.some(q => q.category === id), `${id}: configured topic needs at least one question`);
const profiles = quizConfig.profilesFile ? readData(quizConfig.profilesFile) : [];
const photos = quizConfig.portraitsFile ? readData(quizConfig.portraitsFile) : [];
assert.equal(new Set(profiles.map(p => p.id)).size, profiles.length, 'Unique profile IDs');
for (const profile of profiles) {
  assert(safeId(profile.id) && [profile.name, profile.party, profile.state, profile.chamber, profile.focus].every(nonempty), 'Profile fields required');
  assert(Array.isArray(profile.record) && profile.record.length > 0, `${profile.id}: profile evidence`);
  for (const record of profile.record) {
    assert(date(record.date) && nonempty(record.text), `${profile.id}: dated profile record`);
    httpsUrl(record.url, profile.id);
  }
}
assert.equal(new Set(photos).size, photos.length, 'Unique portrait IDs');
const portraitsDirectory = resolve(dist, quizConfig.portraitsDirectory || 'portraits');
assert(portraitsDirectory.startsWith(dist + sep), 'Portrait assets must stay inside dist/');
for (const id of photos) assert(safeId(id) && existsSync(resolve(portraitsDirectory, id + '.jpg')), `${id}: portrait asset`);
for (const file of ['index.html', 'style.css', 'app.js', 'engine.js', 'quiz-config.js', 'icon.svg']) assert(existsSync(resolve(dist, file)), `${file}: required asset`);

const examplePath = resolve(root, 'examples/questions.json');
if (existsSync(examplePath)) {
  const examples = JSON.parse(readFileSync(examplePath, 'utf8'));
  assert(Array.isArray(examples), 'Examples must be a JSON array');
  validateQuestions(examples, new Set(examples.map(q => q.category)), 'Example bank');
}
console.log(`PASS ${bank.length} questions, ${bank.reduce((sum, q) => sum + q.options.length, 0)} explained choices, ${categories.size} topics, ${profiles.length} profiles, source URLs, IDs, dates, examples, and local assets.`);

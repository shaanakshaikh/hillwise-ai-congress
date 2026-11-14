export const VERSION = 1;
export const DAY = 86400000;
export function shuffle(items, random = Math.random) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function freshProgress() { return {version: VERSION, questions: {}, rounds: [], session: null}; }
export function isMastered(record) { return !!record && record.streak >= 2; }
export function isDue(record, now = Date.now()) { return !!record && Number.isFinite(record.due) && record.due <= now; }
export function recordAnswer(previous, correct, confidence = '', skipped = false, now = Date.now()) {
  const p = previous || {attempts: 0, right: 0, streak: 0};
  const streak = correct ? (p.streak || 0) + 1 : 0;
  const intervals = [0, 1, 3, 7, 14, 30];
  return {attempts: p.attempts + 1, right: p.right + (correct ? 1 : 0), streak,
    lastCorrect: correct, lastSeen: now, due: correct ? now + intervals[Math.min(streak, 5)] * DAY : now,
    confidence, skipped};
}
export function chooseQuestions(bank, progress, {mode = 'mixed', category = null, count = 10, now = Date.now(), random = Math.random, categoryOrder, placementCategories} = {}) {
  const availableCategories = [...new Set(bank.map(q => q.category))];
  const available = new Set(availableCategories);
  // A partial or stale configuration must not hide questions in the bank.
  const orderedCategories = [...new Set([...(categoryOrder || []), ...availableCategories])].filter(id => available.has(id));
  const placementOrder = (placementCategories || orderedCategories).filter(id => available.has(id));
  const limit = Number.isSafeInteger(count) && count > 0 ? count : 0;
  let pool = bank.filter(q => !category || q.category === category);
  if (mode === 'review') pool = pool.filter(q => isDue(progress[q.id], now));
  const decorated = pool.map(q => {
    const p = progress[q.id];
    const priority = !p ? 60 : !p.lastCorrect ? 90 + (p.confidence === 'high' ? 5 : 0) : isDue(p, now) ? 70 : 10;
    const placementBonus = mode === 'placement' ? (4 - q.difficulty) * 8 : 0;
    return {q, score: priority + placementBonus + random() * 9};
  }).sort((a,b) => b.score - a.score);
  if (category || mode === 'review') return decorated.slice(0, limit).map(x=>x.q);
  const categories = mode === 'placement' && placementOrder.length ? placementOrder : shuffle(orderedCategories, random);
  const chosen = [];
  while (chosen.length < limit && decorated.length) {
    const categoryWanted = categories[chosen.length % categories.length];
    let i = decorated.findIndex(x => x.q.category === categoryWanted);
    if (i < 0) i = 0;
    chosen.push(decorated.splice(i, 1)[0].q);
  }
  return shuffle(chosen, random);
}
export function validProgress(value, ids, {categories: categoryList = []} = {}) {
  const object = x => !!x && typeof x === 'object' && !Array.isArray(x) && (Object.getPrototypeOf(x) === Object.prototype || Object.getPrototypeOf(x) === null);
  const integer = (x, min, max) => Number.isSafeInteger(x) && x >= min && x <= max;
  const timestamp = x => Number.isFinite(x) && x >= 0 && x <= 8640000000000000;
  if (!Array.isArray(categoryList) || categoryList.some(id => typeof id !== 'string' || !id)) return false;
  const categories = new Set(categoryList);
  const modes = new Set(['mixed','topic','placement','review']);
  const confidence = x => ['', 'low', 'medium', 'high'].includes(x);
  if (!object(value) || value.version !== VERSION || !object(value.questions) || !Array.isArray(value.rounds) || value.rounds.length > 100) return false;
  if (!categories.size && (value.rounds.length || value.session != null)) return false;
  for (const [id, p] of Object.entries(value.questions)) {
    if (!ids.has(id) || !object(p) || !integer(p.attempts,1,Number.MAX_SAFE_INTEGER) || !integer(p.right,0,p.attempts) || !integer(p.streak,0,p.right) || !timestamp(p.due) || !timestamp(p.lastSeen) || typeof p.lastCorrect !== 'boolean' || typeof p.skipped !== 'boolean' || !confidence(p.confidence)) return false;
    if (p.lastCorrect !== (p.streak > 0) || (p.skipped && p.lastCorrect)) return false;
  }
  for (const r of value.rounds) {
    if (!object(r) || typeof r.id !== 'string' || !r.id || !timestamp(r.date) || !modes.has(r.mode) || !(r.category === null || categories.has(r.category)) || !integer(r.total,1,ids.size) || !integer(r.right,0,r.total)) return false;
  }
  if (value.session !== null && value.session !== undefined) {
    const s=value.session;
    if (!object(s) || typeof s.id !== 'string' || !s.id || !modes.has(s.mode) || !(s.category === null || categories.has(s.category)) || (s.mode === 'topic') !== categories.has(s.category)) return false;
    if (!Array.isArray(s.queue) || !s.queue.length || s.queue.length > ids.size || !integer(s.index,0,s.queue.length-1) || !object(s.answers) || !object(s.orders) || !object(s.confidences) || !object(s.hints) || !object(s.selections)) return false;
    if (new Set(s.queue).size !== s.queue.length) return false;
    const queued = new Set(s.queue);
    for (const dictionary of [s.answers,s.orders,s.confidences,s.hints,s.selections]) if (Object.keys(dictionary).some(id=>!queued.has(id))) return false;
    for (let i=0; i<s.queue.length; i++) {
      const id=s.queue[i];
      if (!ids.has(id) || !Array.isArray(s.orders[id]) || s.orders[id].length !== 4 || !s.orders[id].every(x=>integer(x,0,3)) || new Set(s.orders[id]).size !== 4) return false;
      const a=s.answers[id];
      if (Object.hasOwn(s.answers,id)) {
        if (!object(a) || typeof a.correct !== 'boolean' || typeof a.skipped !== 'boolean' || !confidence(a.confidence) || !(a.chosen===null || integer(a.chosen,0,3)) || a.skipped !== (a.chosen === null) || (a.skipped && a.correct) || !Object.hasOwn(value.questions,id)) return false;
        if (i > s.index || (!a.skipped && s.selections[id] !== a.chosen)) return false;
      } else if (i < s.index) return false;
      if (Object.hasOwn(s.selections,id) && !integer(s.selections[id],0,3)) return false;
      if (Object.hasOwn(s.confidences,id) && !confidence(s.confidences[id])) return false;
      if (Object.hasOwn(s.hints,id) && typeof s.hints[id] !== 'boolean') return false;
    }
  }
  return true;
}

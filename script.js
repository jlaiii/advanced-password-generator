// Generator core moved to script.js for testing
// Implemented as CommonJS so tests can `require()` it.
const crypto = (typeof window !== 'undefined' && window.crypto) ? window.crypto : require('crypto').webcrypto;

function secureRandUint32() {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0];
}

function secureRandInt(maxExclusive) {
  if (maxExclusive <= 0) return 0;
  const maxUint32 = 0xFFFFFFFF;
  const limit = maxUint32 - (maxUint32 % maxExclusive);
  let r = secureRandUint32();
  while (r >= limit) r = secureRandUint32();
  return r % maxExclusive;
}

function secureRandIntRange(min, max) {
  const span = max - min + 1;
  return min + secureRandInt(span);
}

function secureRandFloat() {
  return secureRandInt(1000000) / 1000000;
}

function pick(arr) {
  return arr[secureRandInt(arr.length)];
}

function randomDigits(n) {
  let s = '';
  for (let i = 0; i < n; i++) s += String(secureRandInt(10));
  return s;
}

function makeAnon(numCount) {
  const prefix = pick(['XUSID','USER','ANON','GUEST','UID']);
  return prefix + randomDigits(numCount || 6);
}

function makeAlphaNum(len) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[secureRandInt(chars.length)];
  return s;
}

const commonNames = ["alex","sam","mike","jordan","chris","taylor","jess","casey","drew","pat","james","john","emily","sarah","matt","laura","anna","ben","kate","nate","olivia","liam","noah","mia","ava","sophia","jack","ryan","luke","zach","luke","rylee","max","leo","isla","ella","grace","ryanb","kevin","dylan"];

const commonWords = ["shadow","echo","nova","spark","pixel","storm","ember","quartz","luna","vortex","cipher","drift","blaze","orbit","ripple","zenith","cascade","atlas","harbor","groove","pioneer","matrix","vector","tempo","rocket","falcon","mercury","phoenix","atlas","forge"];

function createUsername({mode, includeNumbers=true, numCount=6} = {}) {
  mode = mode || 'mixed';
  includeNumbers = typeof includeNumbers === 'boolean' ? includeNumbers : true;
  numCount = typeof numCount === 'number' ? numCount : 6;
  let username = '';
  if (mode === 'names') {
    username = pick(commonNames) + (includeNumbers && numCount ? randomDigits(numCount) : '');
  } else if (mode === 'words') {
    username = pick(commonWords) + (includeNumbers && numCount ? randomDigits(numCount) : '');
  } else if (mode === 'words2') {
    username = pick(commonWords) + pick(commonWords) + (includeNumbers && numCount ? randomDigits(numCount) : '');
  } else if (mode === 'anon') {
    username = makeAnon(numCount);
  } else if (mode === 'alphanum') {
    username = makeAlphaNum(secureRandIntRange(6,12));
  } else {
    const gens = [() => pick(commonNames), () => pick(commonWords), () => makeAnon(numCount), () => makeAlphaNum(secureRandIntRange(6,10))];
    username = pick(gens)();
    if (includeNumbers && numCount) username += randomDigits(numCount);
  }
  return username;
}

function createPassword(opts = {}) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const allSymbols = '!@#$%^&*()_+{}[]<>?,./\\|=-';
  const safeSymbols = '!@#$%^&*()-_=+';
  const length = typeof opts.length === 'number' ? opts.length : (opts.length ? opts.length : 16);
  const useUpper = typeof opts.useUpper === 'boolean' ? opts.useUpper : true;
  const useLower = typeof opts.useLower === 'boolean' ? opts.useLower : true;
  const useNumbers = typeof opts.useNumbers === 'boolean' ? opts.useNumbers : true;
  const useSymbols = typeof opts.useSymbols === 'boolean' ? opts.useSymbols : true;
  const minNumbers = typeof opts.minNumbers === 'number' ? opts.minNumbers : 0;
  const minSymbols = typeof opts.minSymbols === 'number' ? opts.minSymbols : 0;

  let allChars = '';
  const guaranteed = [];
  if (useUpper) { allChars += upper; guaranteed.push(upper[secureRandInt(upper.length)]); }
  if (useLower) { allChars += lower; guaranteed.push(lower[secureRandInt(lower.length)]); }
  if (useNumbers) { allChars += numbers; for (let i=0;i<minNumbers;i++) guaranteed.push(numbers[secureRandInt(numbers.length)]); }
  if (useSymbols) { const sym = safeSymbols; allChars += sym; for (let i=0;i<minSymbols;i++) guaranteed.push(sym[secureRandInt(sym.length)]); }
  if (!allChars) return '';
  let L = length;
  if (L < guaranteed.length) L = guaranteed.length;
  const arr = Array.from(guaranteed);
  for (let i = arr.length; i < L; i++) arr.push(allChars[secureRandInt(allChars.length)]);
  for (let i = arr.length -1; i>0; i--) { const j = secureRandInt(i+1); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr.join('');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { secureRandUint32, secureRandInt, secureRandIntRange, secureRandFloat, pick, randomDigits, makeAnon, makeAlphaNum, createUsername, createPassword };
}

// Also attach to window when available for browser usage
if (typeof window !== 'undefined') {
  window.createPassword = createPassword;
  window.createUsername = createUsername;
  // expose shared lists to avoid duplication between files
  window.commonNames = commonNames;
  window.commonWords = commonWords;
}

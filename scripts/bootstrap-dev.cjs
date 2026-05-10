#!/usr/bin/env node
/**
 * One-shot local setup: env templates + npm installs (root + client).
 * Does not overwrite existing .env or client/.env.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');

function copyIfMissing(from, to, label) {
  if (fs.existsSync(to)) return false;
  if (!fs.existsSync(from)) return false;
  fs.copyFileSync(from, to);
  console.log(`Created ${label}`);
  return true;
}

function readPortFromEnv(envPath) {
  if (!fs.existsSync(envPath)) return 5000;
  const raw = fs.readFileSync(envPath, 'utf8');
  const m = raw.match(/^\s*PORT\s*=\s*(\d+)/m);
  return m ? parseInt(m[1], 10) : 5000;
}

function ensureClientEnv(port) {
  const clientDir = path.join(root, 'client');
  const dest = path.join(clientDir, '.env');
  if (fs.existsSync(dest)) return;
  const example = path.join(clientDir, '.env.example');
  if (fs.existsSync(example)) {
    fs.copyFileSync(example, dest);
    console.log('Created client/.env from client/.env.example (review REACT_APP_API_URL)');
    return;
  }
  const body =
    `REACT_APP_API_URL=http://127.0.0.1:${port}/api\n` +
    `# Matches PORT in root .env (${port})\n`;
  fs.writeFileSync(dest, body);
  console.log('Created client/.env');
}

console.log('Bootstrap: checking env files…');
copyIfMissing(path.join(root, '.env.example'), path.join(root, '.env'), '.env from .env.example');

const port = readPortFromEnv(path.join(root, '.env'));
ensureClientEnv(port);

console.log('Bootstrap: npm install (root + client)…');
execSync('npm run install-all', { cwd: root, stdio: 'inherit' });

console.log('\nDone. Next: edit root .env (MONGODB_URI, JWT_SECRET), then run: npm run dev');

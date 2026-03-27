# Advanced Password And Username Generator

This project is a browser-based credential generator built around the UI in `index.html`.
It includes three main tools on one page:

- Username Generator
- Password Generator
- Batch Generator (multiple rows at once)

## What The `index.html` Page Includes

### 1) Username Generator

- Multiple generation modes (words, names, anon, alphanumeric, mixed, leet, camel, initials)
- Optional number inclusion
- Configurable number count
- Copy-to-clipboard support

### 2) Password Generator

- Length controls (number input + range slider)
- Character set toggles:
	- Uppercase
	- Lowercase
	- Numbers
	- Symbols
- Safe symbol mode
- Minimum required numbers and symbols
- Copy-to-clipboard with status message

### 3) Export And History

- Export current username + password as:
	- CSV
	- JSON
	- One-per-line
	- KeePass CSV
- Optional encrypted export using a passphrase
- Optional generation history panel
- Optional encrypted history storage

### 4) Batch Generator

- Generate many credentials at once
- Choose username and/or password generation
- Batch password modes:
	- Random
	- Passphrase
	- Pronounceable
	- Template
- Output pattern options (CSV, JSON, pair formats, custom)
- Progress/ETA display
- Preview and export controls

### 5) Settings And UI

- Dark/light theme toggle
- Import/export settings
- Reset to defaults

## How To Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Use the sections on the page to generate credentials.

## Files

- `index.html` - Main interface and inline generator logic
- `script.js` - Additional generator data and helpers
- `test-run.js` - Project test runner script

## Security Notes

- Randomness uses the Web Crypto API in the browser.
- Generated credentials can be sensitive. Do not share exports or screenshots containing real credentials.
- If you enable encryption features, keep your passphrase safe. Lost passphrases cannot be recovered.

## Live Demo

https://jlaiii.github.io/advanced-password-generator/

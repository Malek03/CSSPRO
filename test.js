const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf-8');
const js = fs.readFileSync('app.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
const window = dom.window;

// Mock some APIs if needed
window.navigator.clipboard = { writeText: () => Promise.resolve() };
window.document.execCommand = () => {};

try {
  window.eval(js);
  console.log("No errors during init!");
} catch (e) {
  console.error("Error found:", e);
}

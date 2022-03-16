/*
 * Based on reference here:
 * https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *
 * Loads, transpiles, and executes a Typescript module.
 * This is very simple, literally just enough for an environment.ts file.
 */
function load_ts(filename) {
  const fs = require('fs');
  const ts = require('typescript');

  // Load and transpile to JS
  let ts_code = fs.readFileSync(filename, 'utf-8');
  let js_code = ts.transpileModule(ts_code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS }
  }).outputText;

  // Execute JS. We need 'exports' to exist, or this breaks.
  let exports = {};
  return eval(js_code);
}

const environment = load_ts('./src/environments/environment.ts');
console.log("API url: " + environment.api.url);

const PROXY_CONFIG = [
  {
    context: [
      "/api/"
    ],
    target: environment.api.url,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;

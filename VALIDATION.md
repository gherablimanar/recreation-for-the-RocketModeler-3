# Validation

Run `npm test` and `npm run validate` from the project root. No dependency installation is necessary.

All 21 automated tests passed in the prepared environment. The test suite covers total mass, weighted CG, weight, drag, net force, acceleration, three planetary gravities and lunar vacuum, stable/unstable designs, integrated motor impulse/time dependence, decreasing burn mass, zero wind symmetry, nonzero wind deflection, apogee/recovery/landing, two booster separations and timestep convergence. Default .005 s and .0025 s runs must agree on apogee within 3%. Tests check functional invariants, not agreement with NASA or measured flight data.

The validation command and UI Print Validation Run emit full SI inputs, component masses/positions, equations, stability, events and final numerical outputs for a run. Pause stops the UI's integration; validation computes an independent complete flight synchronously.

Chromium checks in the current environment exercise design editing/default reset, launch/countdown, pause/time freeze, resume, CSV download, JSON save/load, complete validation output, restart/reset and return to design. Desktop and 390px mobile screenshots are generated in ignored artifacts/. JavaScript page errors and horizontal overflow are checked. The browser check uses Playwright installed separately in /tmp; it is not an application dependency.

These checks validate this implementation only. NASA parity, manufacturer thrust data, high angle aerodynamic validity, launch performance accuracy and deployment loads remain unvalidated. A 600 s timeout is reported explicitly, not treated as successful landing. See PHYSICS.md and NASA_REFERENCE.md.

Reproduce the browser check with a running application:

```sh
npm install --prefix /tmp/rocket-browser --cache /tmp/npm-cache playwright --no-audit --no-fund
NODE_PATH=/tmp/rocket-browser/node_modules node scripts/browser-check.cjs
```

Set CHROMIUM_PATH if Chromium is installed somewhere other than /usr/bin/chromium. The browser check does not install a browser.

The interactive editor adds a regression test for moved component mass positions, changed CG, JSON round trips, legacy JSON defaults, invalid motor/recovery positions and a complete flight with moved components. `scripts/design-check.cjs` exercises all five drag handles, balance updates, per-field explanations and launching the edited design in Chromium.

# RocketModeler III — independent browser recreation

A working, dependency-free HTML/CSS/JavaScript model-rocket simulator. NASA RocketModeler III is the intended reference, an educational Java applet for rocket design and launch. This implementation runs in current browsers without Java or plugins.

**Reference fidelity is not yet verified.** The NASA pages and archive were blocked by the environment proxy (HTTP 403). This is a provisional implementation, not a claim of matching the original layout, engine data, defaults or algorithms. See NASA_REFERENCE.md.

## Run

Requires Node.js 20 or newer; no package installation or build is required.

```sh
cd /workspace/recreation-for-the-RocketModeler-3
npm start
```

The server listens on port 5173 (override using `PORT`). In a local development machine, open the application on that port using your browser. Cloud onboarding does not provide a localhost web preview.

Design Rocket → adjust dimensions, materials, engines and recovery → Launch Rocket → Begin Launch → countdown and flight. Pause/Resume control integration. Reset clears the flight, Restart launches the same design, and Design Rocket returns to editing. Reset to Default restores the reference design. Save/Load use JSON files; Export Results downloads SI-valued CSV. Print Validation Run computes a full run with inputs, equations, units and events.

## Checks

```sh
npm test
npm run validate
```

Node's built-in test runner is used. The browser UI has also been exercised using Chromium and Playwright; see VALIDATION.md. No external backend, API keys or services are needed.

## Implemented

One/two/three sequential stages; length/diameter/nose shape; fin count, root/tip chord, span and location; component materials; four illustrative motors; editable dry/propellant masses; parachute/streamer/no recovery; planetary atmosphere/gravity; launch angle and wind vector; CG/CP/static margin; dynamic 2D rocket/trajectory; countdown, powered ascent, coast, apogee, recovery and landing; live numerical results and five graphs; persistence, export and validation.

`src/models` defines components and geometry; `src/data` contains materials, engines and planets; `src/physics` contains equations and stability; `src/simulation` integrates flight; `src/components` binds controls; `src/rendering` draws rockets and graphs; `src/utils` handles persistence and reports; `src/tests` exercises physics.

## Remaining work

Recover the official NASA sources and screenshots, compare terminology/layout/defaults/constraints and outputs, replace synthetic motor curves with authoritative data, and validate pitch, drag, staging and recovery against the original. Different engines and geometry per stage, true ogive volume/aerodynamics, launch-rod dynamics and full three-dimensional flight are not implemented. This is an educational model, not certified launch-planning software.

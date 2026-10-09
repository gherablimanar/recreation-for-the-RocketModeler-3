# NASA reference status

Requested authoritative sources:

- https://www.grc.nasa.gov/www/k-12/InteractProgs/index.htm
- https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/rktsim.html
- https://www.grc.nasa.gov/www/k-12/rocket/javplts/jrm3d/RocketModeler.zip

All three were attempted on 2026-10-09. The proxy denied the hostname with HTTP 403; no NASA source, asset, screenshot or Java code was recovered. `www.grc.nasa.gov` has been added to the environment configuration draft's custom network domains. Saving a draft does not activate network changes; user settings review/save is required before retrying. No TLS/checksum verification was bypassed.

## Evidence and provisional choices

The design → launch → begin → observe → pause/resume/reset/redesign workflow and named controls come from the user's specification. Their presence is verified, but exact correspondence with the applet is not. The dark side-view canvas, right-side grouped controls, muted gray panels, blue headings, red fins and yellow/blue CG/CP markers are an independent provisional appearance. Original placement, wording, colors and dimensions remain unverified.

Every value in defaults in src/models/rocket.js is provisional: 1 stage, 0.30 m body, 0.025 m diameter, 0.07 m conical nose, three balsa fins, 0.06 m root/0.035 m tip/0.05 m span, fins 0.24 m from body front, cardboard tube, balsa nose, illustrative C6-5, 0.012 kg propellant and dry motor, 0.30 m parachute, 90° launch, no wind, Earth, Cd=0.5 and dt=.005 s. Control limits are conservative implementation bounds, not NASA-derived. Ogive geometry/mass is approximate.

CG uses component mass moments. CP uses a simplified Barrowman-style model; no claim is made that it matches NASA's implementation. Engine table/curves and material constants are approximations documented in PHYSICS.md. No NASA assets are redistributed and no official endorsement is implied. NASA branding is explicitly marked inspired; the source is independently implemented.

## Required comparison when access is restored

Download and inspect the archive; identify original entry point and source version; recover defaults, limits, material/motor tables, CP equations, staging and recovery logic. Capture original screens using a safe isolated Java runtime if possible, then compare UI positions and per-control behavior. Run matching designs on both and document differences in CG, CP, mass and trajectories. Only then replace provisional values and claim verified fidelity. Until that happens, this app is a functional prototype rather than a completed faithful recreation.

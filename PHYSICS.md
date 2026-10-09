# Physics and assumptions

All internal values are SI: kg, m, s, N, Pa; angular state is radians (UI degrees). Component positions and CG/CP are distances aft of the nose tip. Rocket angle is counterclockwise from horizontal; wind direction is the direction the air moves, not meteorological “from” direction. This is a planar x/y model.

## Components

Total mass is Σm_i. CG is Σ(m_i x_i)/Σm_i. Tube mass is π diameter × length × 0.001 m wall × density. Nose mass is solid cone volume π d² L/12 × density, with an assumed 1.4 volume factor for “Ogive.” Fins use trapezoidal planform area times 0.002 m thickness and density. Fin span is labelled height; fin width is tip chord; length is root chord. Fin location is measured from the front of the body, not nose tip. Cone CG is 3/4 length. Body CG is midpoint; fin centroid is approximated at 45% root chord. Recovery mass includes 4 g fittings plus assumed fabric area density 0.035 kg/m². Material densities are approximate, not NASA-recovered values.

All stages use the same engine. Each booster dry engine is dropped at burnout; body/fins remain. The motor burns a fraction of propellant equal to its integrated impulse fraction. Removed/remaining component masses update CG during flight. No payload, stage-specific body or decoupler mass is represented.

## Thrust

The A8-3, B6-4, C6-5 and D12-5 labels denote **illustrative**, synthetic piecewise-linear curves, not measured manufacturer curves. Impulses are 2.5, 5, 10 and 20 N·s; durations 0.32, 0.85, 1.7 and 1.65 s. Trapezoidal integration normalizes each curve to its declared impulse. Curve shape has six normalized knots: (0,0), (.04,2), (.12,1.6), (.25,.8), (.9,.7), (1,0). Dry masses, propellant masses and ejection delays are provisional values in engines.js. Initial, average and peak thrust are shown in the UI.

F = mdot ve + (pe-pa) Ae. This implementation uses a prescribed thrust curve, ve = total impulse / propellant mass and mdot = F/ve. No chamber-pressure/nozzle solution is performed. Pressure thrust is absorbed in the curve; thrust does not change with planet ambient pressure. The inverse equivalent exhaust velocity is an assumption, not a motor measurement.

## Environment, forces and stability

Earth g=9.81 m/s², sea-level rho=1.225 kg/m³, scale height 8500 m. Moon g=1.62 and rho=0. Mars g=3.71, rho=0.020, scale height 11100 m. Density falls as rho0 exp(-altitude/H); gravity stays constant. Weight is m g. Wind is a uniform prescribed planar vector. Relative velocity is v-wind. Drag is 0.5 rho |v-wind|² Cd A, opposing relative velocity; A=π d²/4 and Cd defaults to 0.5.

The CP model is a simplified small-angle Barrowman-style conical nose plus unswept trapezoid fins. Nose normal-force slope is 2. Cone CP is 2/3 nose length; ogive CP is assumed 0.466 length. Fin normal slope and weighted CP are explicit in aerodynamics.js. The static margin is (CP-CG)/diameter: >=1 stable, between 0 and 1 marginal, <=0 unstable. These classifications are provisional thresholds, not recovered NASA logic. Large-angle motion is outside Barrowman's validity.

Normal force is -q A CNa sin(alpha), perpendicular to relative airflow (lift performs no continuous work in still air). Pitch moment is approximated as normal force × (CP-CG). Inertia is approximated by m totalLength²/12, with linear angular damping 2 omega s⁻¹. Below 0.8 m, launch orientation is held; a physical constrained launch rod is not modeled. Drag and normal force then act alongside oriented thrust and downward gravity. The integrator resolves x/y force components, rather than subtracting scalar mg from an angled thrust vector. The scalar vertical case is Fnet = thrust - drag - mg; acceleration is force/mass.

## Integration and recovery

Explicit Euler: position_next = position + velocity dt; velocity_next = velocity + acceleration dt. Default dt=.005 s; user/testing range .001–.020 s. Rendering uses requestAnimationFrame with fixed physics steps, independent of display rate, and caps frame catch-up at .1 s. Histories are sampled around .04 s.

Apogee is detected by a positive-to-nonpositive vertical velocity crossing. Recovery deploys after the final engine's burn + delay, which can occur **before or after apogee**. Parachute area is π diameter²/4 and Cd=1.5. Streamer area is body diameter × 0.3 m and Cd=1.5. Inflation is instantaneous; deployment replaces body drag with recovery drag and disables normal force. In vacuum it cannot slow a rocket. The rocket attitude is then frozen, a visual approximation. Ground impact is clamped to altitude zero; impact speed is retained. No bounce or ground motion. Integration stops at landing, failure to lift or 600 s; a time-limit result is not a landing.

No heating, compressibility, turbulent gusts, Earth curvature, variable gravity, 3D roll, structural failure, parachute failure or stage-specific engines. No arbitrary animation altitude/velocity is substituted for integrated results. The display auto-scales the physical trajectory.

export const help = {
 stages:'Number of motors burned in sequence. Empty booster motors are dropped between stages; each stage uses the same motor and geometry.',
 length:'Length of the cylindrical body, excluding the nose. Increasing it adds material and changes mass and balance.',
 diameter:'Width of the body. It changes frontal area, drag, mass and the unit used for static margin.',
 noseLength:'Distance from the nose tip to the body front. Drag its handle to change this length.',
 noseShape:'Cone or approximate ogive profile. The model uses simplified mass and aerodynamic estimates.',
 bodyMaterial:'Material density sets the body mass; the assumed wall thickness is 1 mm.',
 noseMaterial:'Material density sets the nose mass. A heavier nose usually moves the center of gravity forward.',
 finNumber:'Total fins around the body. The side view shows their projected shape, rather than every fin.',
 finLength:'Length of the edge attached to the body. Fins must fit within the body.',
 finWidth:'Length of the outer fin edge; together with root length and span it sets fin area.',
 finHeight:'How far each fin extends outward from the body. Larger fins increase aerodynamic stability and mass.',
 finPosition:'Distance from the body front to the fin root’s forward edge. Drag the Fins handle to move all fins together.',
 finMaterial:'Fin density sets their mass; the assumed thickness is 2 mm.',
 engine:'Illustrative thrust curve, burn duration and delay. Choosing a motor resets its dry and propellant masses. These are synthetic curves.',
 engineOffset:'Distance the whole motor assembly moves forward from its default aft position. Moving it changes CG; the engines stay inside the body.',
 recoveryPosition:'Recovery pack location as a fraction of body length: 0 is the body front, 1 is its rear. Moving it changes balance, not deployment timing.',
 propellant:'Fuel mass in each stage. Mass decreases as the motor burns; changing this keeps the selected thrust curve.',
 engineDry:'Mass of each motor after its propellant is gone. Booster dry mass is dropped at separation.',
 recovery:'Parachute, streamer, or no recovery. Deployment uses the selected motor delay; vacuum provides no aerodynamic braking.',
 parachute:'Canopy diameter. A larger canopy creates more drag during recovery and adds pack mass.',
 planet:'Selects gravity and atmospheric density. The Moon has no atmospheric drag.',
 angle:'90° points straight up; 45° points diagonally to the right. This is the initial launch direction.',
 wind:'Air speed relative to the ground. Wind changes air-relative drag and horizontal drift.',
 windDirection:'Wind direction: 0° right, 90° up, 180° left, 270° down in the simulated plane.',
 cd:'Dimensionless body drag coefficient. Larger values mean greater resistance to motion through air.',
 dt:'Numerical integration interval. Smaller steps improve precision but require more computation.'
};
export const outputHelp={
 Time:'Seconds since motor ignition.',Altitude:'Height above the launch ground.',Velocity:'Magnitude of ground-relative velocity.',Acceleration:'Magnitude of net acceleration, including gravity.',
 'Current mass':'Mass of the remaining rocket, including unburned fuel.',Thrust:'Current force from the active motor.',Drag:'Magnitude of the aerodynamic force opposing air-relative motion.',Distance:'Total path length traveled, including ascent and descent.',
 'Max altitude':'Highest altitude reached so far.','Max velocity':'Highest speed reached so far.','Flight time':'Elapsed simulation time; final duration after landing.','Landing velocity':'Speed at ground contact; available once the rocket lands.',
 'Angle of attack':'Angle between the rocket axis and its air-relative velocity, in degrees.','Engine impulse':'Total thrust integrated over the motor burn. Newton-seconds measure total motor push.','Burn time':'Duration of the selected motor thrust curve.','Initial thrust':'Force at the beginning of the curve.','Average thrust':'Total impulse divided by burn duration.','Maximum thrust':'Highest force on the selected thrust curve.'
};

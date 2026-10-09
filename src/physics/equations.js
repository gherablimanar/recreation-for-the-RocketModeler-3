export const totalMass=c=>c.reduce((s,p)=>s+p.mass,0);
export const centerOfGravity=c=>c.reduce((s,p)=>s+p.mass*p.x,0)/totalMass(c);
export const weight=(m,g)=>m*g;
export const drag=(rho,v,cd,A)=>.5*rho*v*v*cd*A;
export const netForce=(thrust,D,m,g)=>thrust-D-weight(m,g);
export const acceleration=(force,m)=>force/m;

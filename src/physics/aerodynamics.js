import {components} from '../models/rocket.js';
import {centerOfGravity} from './equations.js';
export function stability(r,c=components(r)){
 // Simplified Barrowman small-angle conical nose + unswept trapezoid fins.
 const n=r.noseLength,d=r.diameter,s=r.finHeight,root=r.finLength,tip=r.finWidth;
 const slope=r.finNumber*4*(s/d)**2/(1+Math.sqrt(1+(2*s/(root+tip))**2))*(1+d/(2*s+d));
 const noseCP=n*(r.noseShape==='Cone'?2/3:.466);
 const finCP=n+r.finPosition+(root+tip-root*tip/(root+tip))/6;
 const cp=(2*noseCP+slope*finCP)/(2+slope),cg=centerOfGravity(c),margin=(cp-cg)/d;
 return {cp,cg,margin,status:margin>=1?'Stable':margin>0?'Marginally stable':'Unstable',normalSlope:2+slope};
}

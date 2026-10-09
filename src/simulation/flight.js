import {components,flightComponents,engineFor,validateDesign} from '../models/rocket.js';
import {thrust,impulseAt,planets} from '../data/engines.js';
import {totalMass} from '../physics/equations.js';
import {stability} from '../physics/aerodynamics.js';
export class Flight{
 constructor(r){if(validateDesign(r).length)throw Error(validateDesign(r).join(' '));if(!(r.dt>=.001&&r.dt<=.02))throw Error('Time step must be 0.001–0.02 s');this.r={...r};this.e=engineFor(r);this.p=planets[r.planet];this.initial=totalMass(components(r));this.stage=0;this.stageStart=0;this.history=[];this.events=[];this.state={t:0,x:0,y:0,vx:0,vy:0,theta:r.angle*Math.PI/180,omega:0,mass:this.initial,thrust:0,drag:0,acceleration:0,speed:0,distance:0,maxAltitude:0,maxVelocity:0,phase:'Ignition',parachute:false,landed:false,alpha:0};this.history.push({...this.state});this.event('Ignition');}
 event(name){this.events.push({name,t:this.state.t});}
 step(){const s=this.state,r=this.r,e=this.e,dt=r.dt;if(s.landed)return s;
 let elapsed=s.t-this.stageStart;if(elapsed>=e.burn&&this.stage<r.stages-1){this.event('Burnout');this.stage++;this.stageStart=s.t;elapsed=0;this.event('Stage separation');this.burnout=false;}
 const frac=impulseAt(e,elapsed)/e.impulse;
 s.mass=this.initial-this.stage*(r.propellant+r.engineDry)-r.propellant*frac;
 if(elapsed>=e.burn&&!this.burnout){this.event('Burnout');this.burnout=true;}
 s.thrust=thrust(e,elapsed);
 const wx=r.wind*Math.cos(r.windDirection*Math.PI/180),wy=r.wind*Math.sin(r.windDirection*Math.PI/180);
 const ux=s.vx-wx,uy=s.vy-wy,v=Math.hypot(ux,uy),rho=this.p.rho*Math.exp(-Math.max(s.y,0)/this.p.scale);
 const area=Math.PI*r.diameter**2/4;
 const recoveryArea=r.recovery==='Parachute'?Math.PI*r.parachute**2/4:r.diameter*.3;
 s.drag=.5*rho*v*v*(s.parachute?1.5*recoveryArea:r.cd*area);
 s.alpha=v>.1?Math.atan2(Math.sin(s.theta-Math.atan2(uy,ux)),Math.cos(s.theta-Math.atan2(uy,ux))):0;
 const stab=stability(r,flightComponents(r,this.stage,1-frac));s.cg=stab.cg;s.cp=stab.cp;s.margin=stab.margin;const normal=s.parachute?0:-.5*rho*v*v*area*stab.normalSlope*Math.sin(s.alpha);
 const moment=normal*(stab.cp-stab.cg),inertia=s.mass*(r.length+r.noseLength)**2/12;
 if(s.y>.8&&!s.parachute){s.omega+=(moment/inertia-2*s.omega)*dt;s.theta+=s.omega*dt;}
 const ax=(s.thrust*Math.cos(s.theta)-(v?s.drag*ux/v:0)-(v?normal*uy/v:0))/s.mass;
 const ay=(s.thrust*Math.sin(s.theta)-(v?s.drag*uy/v:0)+(v?normal*ux/v:0))/s.mass-this.p.g;
 s.acceleration=Math.hypot(ax,ay);s.ax=ax;s.ay=ay;
 const oldVy=s.vy;
 s.x+=s.vx*dt;s.y+=s.vy*dt;s.vx+=ax*dt;s.vy+=ay*dt;s.t+=dt;
 if(s.y<=0&&s.maxAltitude===0){s.y=0;s.vy=Math.max(0,s.vy);s.vx=0;}
 s.speed=Math.hypot(s.vx,s.vy);s.distance+=s.speed*dt;s.maxAltitude=Math.max(s.maxAltitude,s.y);s.maxVelocity=Math.max(s.maxVelocity,s.speed);
 if(!s.apogee&&oldVy>0&&s.vy<=0&&s.y>0){this.event('Apogee');s.apogee=true;}
 if(!s.parachute&&r.recovery!=='None'&&this.stage===r.stages-1&&elapsed>=e.burn+e.delay){s.parachute=true;this.event('Recovery deployment');}
 s.phase=s.thrust>0?'Powered ascent':s.vy>0?'Coasting':s.parachute?'Recovery descent':'Descent';
 if(s.y<=0&&s.maxAltitude>0){s.y=0;s.landingVelocity=s.speed;s.landed=true;s.phase='Landing';this.event('Landing');}
 if(s.t>3&&s.maxAltitude===0&&elapsed>e.burn){s.landed=true;s.phase='Failed to lift off';this.event(s.phase);}
 if(s.t>=600){s.landed=true;s.phase='Time limit';this.event(s.phase);}
 if(this.history.length===1||s.t-this.history.at(-1).t>=.04||s.landed)this.history.push({...s});return s;
 }
 run(){while(!this.state.landed)this.step();return this.state;}
}

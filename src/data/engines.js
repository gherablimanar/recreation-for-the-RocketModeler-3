// Illustrative curves, NOT recovered NASA/manufacturer measurements. SI throughout.
const make=(name,impulse,burn,propellant,dry,delay)=>{
 const points=[[0,0],[.04,2],[.12,1.6],[.25,.8],[.9,.7],[1,0]];
 const integral=points.slice(1).reduce((s,p,i)=>s+(p[0]-points[i][0])*(p[1]+points[i][1])/2,0);
 return {name,impulse,burn,propellant,dry,delay,curve:points.map(([t,f])=>[t*burn,f*impulse/(integral*burn)])};
};
export const engines=[make('A8-3',2.5,.32,.003,.013,3),make('B6-4',5,.85,.006,.012,4),make('C6-5',10,1.7,.012,.012,5),make('D12-5',20,1.65,.025,.020,5)];
export function thrust(engine,t){if(t<0||t>=engine.burn)return 0; for(let i=1;i<engine.curve.length;i++){const [b,y]=engine.curve[i], [a,x]=engine.curve[i-1];if(t<=b)return x+(y-x)*(t-a)/(b-a);}return 0;}
export function impulseAt(e,t){let sum=0;for(let i=1;i<e.curve.length;i++){const [a,f]=e.curve[i-1], [b,g]=e.curve[i];const end=Math.min(b,Math.max(0,t));if(end>a)sum+=(end-a)*(f+(f+(g-f)*(end-a)/(b-a)))/2;}return sum;}
export const planets={Earth:{g:9.81,rho:1.225,scale:8500},Moon:{g:1.62,rho:0,scale:1},Mars:{g:3.71,rho:.020,scale:11100}};
export const materials={Cardboard:700,Balsa:160,Plastic:1050,Aluminum:2700};

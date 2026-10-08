import fs from 'node:fs';
const loops = JSON.parse(fs.readFileSync('.cache/loops.json'));
const names = ['H','E','L','I','X'];
function circle(pts){ let sx=0,sy=0,sxx=0,syy=0,sxy=0,sxz=0,syz=0,sz=0,m=pts.length;
  for(const [x,y] of pts){const z=x*x+y*y;sx+=x;sy+=y;sxx+=x*x;syy+=y*y;sxy+=x*y;sxz+=x*z;syz+=y*z;sz+=z;}
  const A=[[sxx,sxy,sx],[sxy,syy,sy],[sx,sy,m]],B=[sxz,syz,sz];
  const det=M=>M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
  const d=det(A); const rep=c=>A.map((row,r)=>row.map((v,k)=>k===c?B[r]:v));
  const cx=det(rep(0))/d/2, cy=det(rep(1))/d/2, cc=det(rep(2))/d; const r=Math.sqrt(cc+cx*cx+cy*cy);
  let err=0; for(const [x,y] of pts) err=Math.max(err,Math.abs(Math.hypot(x-cx,y-cy)-r));
  return {cx:+cx.toFixed(1),cy:+cy.toFixed(1),r:+r.toFixed(1),maxErr:+err.toFixed(2),n:m}; }
const win=(L,x0,x1,y0,y1)=>loops[names.indexOf(L)].filter(([x,y])=>x>=x0&&x<=x1&&y>=y0&&y<=y1);
const out={};
// X top-left outer shoulder (between vertical edge and diagonal)
out.X_outerShoulder_TL = circle(win('X',1866,1912,232,322));
out.X_outerShoulder_TL_wide = circle(win('X',1866,1912,215,325));
// X top inner (between the notch's vertical edge and diagonal), left arm right side
out.X_innerShoulder_TL = circle(win('X',2040,2070,226,262));
// X bottom inner left and bottom outer left
out.X_innerShoulder_BL = circle(win('X',2040,2054,686,724));
out.X_outerShoulder_BL = circle(win('X',1866,1910,602,712));
// E counters and outer
out.E_outerTL = circle(win('E',682,915,126,350));
out.E_outerBL = circle(win('E',682,915,580,801));
out.E_cTop = circle(win('E',856,918,296,357));
out.E_cBot = circle(win('E',856,918,572,632));
out.L_outerBL = circle(win('L',1203,1435,570,800));
out.L_inner = circle(win('L',1381,1432,578,623));
// straight diagonals: fit lines (orthogonal regression) on X
function line(pts){const n=pts.length;let mx=0,my=0;for(const[x,y]of pts){mx+=x;my+=y}mx/=n;my/=n;let sxx=0,sxy=0,syy=0;for(const[x,y]of pts){sxx+=(x-mx)**2;sxy+=(x-mx)*(y-my);syy+=(y-my)**2}
 const th=0.5*Math.atan2(2*sxy,sxx-syy);const dx=Math.cos(th),dy=Math.sin(th);let e=0;for(const[x,y]of pts)e=Math.max(e,Math.abs((x-mx)*dy-(y-my)*dx));return{angleDeg:+(th*180/Math.PI).toFixed(2),mx:+mx.toFixed(1),my:+my.toFixed(1),maxErr:+e.toFixed(2),n}}
out.X_diag_outerTL = line(win('X',1912,2030,330,455));
out.X_diag_innerTL = line(win('X',2072,2148,268,355));
out.X_diag_innerBL = line(win('X',2056,2148,575,680));
out.X_diag_outerBL = line(win('X',1938,2030,470,570));
out.X_diag_outerTR = line(win('X',2280,2395,355,455));
out.X_diag_innerTR = line(win('X',2160,2240,268,355));
// extreme/waist vertices
const ext=(L,f)=>{const pts=loops[names.indexOf(L)];return pts.reduce((a,b)=>f(b,a)?b:a)};
out.X_waist_left = ext('X',(b,a)=>b[0]>a[0]&&b[1]>440&&b[1]<490 && false) ;
// waist: min of |dx| near y=463: left waist = max x among points with x<2100 and y in 440..485 ; right waist = min x among x>2200
out.X_waist_left = loops[4].filter(([x,y])=>x<2100&&y>440&&y<490).reduce((a,b)=>b[0]>a[0]?b:a);
out.X_waist_right = loops[4].filter(([x,y])=>x>2200&&y>440&&y<490).reduce((a,b)=>b[0]<a[0]?b:a);
out.X_notch_top = loops[4].filter(([x,y])=>x>2100&&x<2200&&y<420).reduce((a,b)=>b[1]>a[1]?b:a);
out.X_notch_bot = loops[4].filter(([x,y])=>x>2100&&x<2200&&y>500).reduce((a,b)=>b[1]<a[1]?b:a);
console.log(JSON.stringify(out,null,1));

/* ======================================================================
   ROOM PHOTO VISUALIZER — perspective warp helpers
   ----------------------------------------------------------------------
   Kept separate from the renderer so the maths can be tested on its own.

   WHY A HOMOGRAPHY, NOT A SQUASH
   The old tool faked perspective by scaling the rug vertically, which is
   only correct when you are looking straight down a wall. A real floor
   recedes, so the far edge of a rug is both shorter AND narrower. Mapping
   the rug through a homography (the same transform a camera applies to a
   flat plane) puts all four corners exactly where the user drags them and
   keeps the pattern's straight lines straight.

   WHY NOT BILINEAR
   Interpolating between the four corners is much simpler but produces the
   classic "PlayStation 1" texture skew — straight lines inside the rug
   bend. A homography is barely more code and is actually correct.
   ====================================================================== */

window.HeritageRoomWarp = (function(){

  /* Maps the unit square (0,0)-(1,1) onto an arbitrary convex quad.
   Corners must be supplied in order: top-left, top-right, bottom-right,
   bottom-left — the same order the drag handles use. */
function unitSquareToQuad(p0, p1, p2, p3){
  const x0=p0.x, y0=p0.y, x1=p1.x, y1=p1.y, x2=p2.x, y2=p2.y, x3=p3.x, y3=p3.y;

  // a collapsed quad has nothing to draw into; bail before producing a
  // matrix full of zeros that would silently render nothing
  const area = Math.abs(
    (x0*y1 - x1*y0) + (x1*y2 - x2*y1) + (x2*y3 - x3*y2) + (x3*y0 - x0*y3)
  ) / 2;
  if(area < 1e-6) return null;

  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;

  // a parallelogram needs no projective term — fall back to affine
  if(Math.abs(sx) < 1e-10 && Math.abs(sy) < 1e-10){
    return { a:x1-x0, b:x2-x1, c:x0, d:y1-y0, e:y2-y1, f:y0, g:0, h:0 };
  }
  const den = dx1*dy2 - dx2*dy1;
  if(Math.abs(den) < 1e-12) return null;          // degenerate quad

  const g = (sx*dy2 - dx2*sy) / den;
  const h = (dx1*sy - sx*dy1) / den;
  return {
    a: x1 - x0 + g*x1, b: x3 - x0 + h*x3, c: x0,
    d: y1 - y0 + g*y1, e: y3 - y0 + h*y3, f: y0,
    g: g, h: h
  };
}

function applyHomography(H, u, v){
  const w = H.g*u + H.h*v + 1;
  if(Math.abs(w) < 1e-12) return { x:0, y:0 };
  return { x:(H.a*u + H.b*v + H.c)/w, y:(H.d*u + H.e*v + H.f)/w };
}

/* Default corner positions for a freshly placed rug: a trapezoid that
   already looks like something lying on a floor, so the first thing the
   user sees is roughly right rather than a flat rectangle. */
function defaultCorners(cx, cy, width, height, taper){
  const t = taper == null ? 0.62 : taper;      // far edge as a fraction of near
  const halfNear = width / 2;
  const halfFar  = halfNear * t;
  const halfH    = height / 2;
  return [
    { x: cx - halfFar,  y: cy - halfH },   // far-left
    { x: cx + halfFar,  y: cy - halfH },   // far-right
    { x: cx + halfNear, y: cy + halfH },   // near-right
    { x: cx - halfNear, y: cy + halfH }    // near-left
  ];
}

function cornersCentroid(corners){
  let x=0, y=0;
  corners.forEach(p=>{ x+=p.x; y+=p.y; });
  return { x:x/corners.length, y:y/corners.length };
}

function translateCorners(corners, dx, dy){
  return corners.map(p=>({ x:p.x+dx, y:p.y+dy }));
}

function rotateCorners(corners, radians){
  const c = cornersCentroid(corners);
  const cos = Math.cos(radians), sin = Math.sin(radians);
  return corners.map(p=>{
    const x = p.x - c.x, y = p.y - c.y;
    return { x: c.x + x*cos - y*sin, y: c.y + x*sin + y*cos };
  });
}

function scaleCorners(corners, factor){
  const c = cornersCentroid(corners);
  return corners.map(p=>({ x: c.x + (p.x-c.x)*factor, y: c.y + (p.y-c.y)*factor }));
}

/* A quad the user has dragged into a bow-tie can't be drawn sensibly.
   Cheap convexity test via the sign of the cross product at each corner. */
function isConvex(corners){
  let sign = 0;
  for(let i=0;i<4;i++){
    const a = corners[i], b = corners[(i+1)%4], c = corners[(i+2)%4];
    const cross = (b.x-a.x)*(c.y-b.y) - (b.y-a.y)*(c.x-b.x);
    if(Math.abs(cross) < 1e-9) continue;
    const s = cross > 0 ? 1 : -1;
    if(sign === 0) sign = s;
    else if(s !== sign) return false;
  }
  return true;
}

function clampCornersToCanvas(corners, W, H, margin){
  const m = margin == null ? 40 : margin;       // allow a little overhang
  return corners.map(p=>({
    x: Math.min(W + m, Math.max(-m, p.x)),
    y: Math.min(H + m, Math.max(-m, p.y))
  }));
}

/* index of the corner nearest a point, or -1 if none is within `radius` */
function hitCorner(corners, x, y, radius){
  let best = -1, bestD = radius * radius;
  corners.forEach((p,i)=>{
    const dx = p.x - x, dy = p.y - y;
    const d = dx*dx + dy*dy;
    if(d <= bestD){ bestD = d; best = i; }
  });
  return best;
}

function pointInQuad(corners, x, y){
  let sign = 0;
  for(let i=0;i<4;i++){
    const a = corners[i], b = corners[(i+1)%4];
    const cross = (b.x-a.x)*(y-a.y) - (b.y-a.y)*(x-a.x);
    if(Math.abs(cross) < 1e-9) continue;
    const s = cross > 0 ? 1 : -1;
    if(sign === 0) sign = s;
    else if(s !== sign) return false;
  }
  return true;
}

  return { unitSquareToQuad: unitSquareToQuad, applyHomography: applyHomography, defaultCorners: defaultCorners, cornersCentroid: cornersCentroid, translateCorners: translateCorners, rotateCorners: rotateCorners, scaleCorners: scaleCorners, isConvex: isConvex, clampCornersToCanvas: clampCornersToCanvas, hitCorner: hitCorner, pointInQuad: pointInQuad };
})();

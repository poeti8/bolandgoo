uniform float uBrightness;

void main() {
  vec2 st = gl_PointCoord;
  vec3 color = vec3(1.0);

  vec2 bl = step(vec2(0.1), st);
  float pct = bl.x * bl.y;

  vec2 tr = step(vec2(0.1), 1.0 - st);
  pct *= tr.x * tr.y;

  color = clamp(vec3(1.0 - pct), 0.0, 1.0) * uBrightness;

  gl_FragColor = vec4(color, 1.0);
}
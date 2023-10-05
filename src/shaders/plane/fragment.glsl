#include ../noise;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
    43758.5453123);
}

void main() {
  vec2 st = vUv * 1100.0;
  vec2 griduv = fract(st);
  vec2 gridid = floor(st);

  float c = noise3D(vec3(gridid * 0.91, mod(uTime, 5.0) * 0.025));
  c = (c + 1.0) * 0.5;
  c = step(0.2, c);

  vec2 mouse = (uMouse + 1.0) * 0.5;
  float dist = distance(mouse, vUv);
  c *= step(0.005, dist);
  c *= 0.988;
  c += 0.95;

  vec3 color = vec3(c);
  gl_FragColor = vec4(color, 1.0);
}
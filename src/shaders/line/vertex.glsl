#include ../noise;

uniform float uOffset;

void main() {
  vec4 pos = vec4(position, 1.0);
  pos.y += noise2D(vec2(pos.x, 0.0) * 50.0) * 0.018;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;
}
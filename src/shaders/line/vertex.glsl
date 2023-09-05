void main() {
  vec4 pos = vec4(position, 1.0);
  pos.y += sin(pos.x);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;
}
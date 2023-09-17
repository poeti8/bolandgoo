#include <fog_pars_fragment>

void main() {
  float brightness = 0.95;
  vec3 color = vec3(1.0, 1.0, 1.0) * brightness;
  gl_FragColor = vec4(color, 1.0);

  #include <fog_fragment>
}
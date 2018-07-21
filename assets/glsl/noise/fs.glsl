#pragma glslify: grain = require(glsl-film-grain)

precision mediump float;
varying vec2 vuv;

uniform float u_time;
uniform vec2 mouse;

void main() {

    gl_FragColor = vec4(255.0, 255.0, 255.0, 0.0);
}

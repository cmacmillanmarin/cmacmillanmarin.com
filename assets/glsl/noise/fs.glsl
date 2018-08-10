
precision mediump float;
varying vec2 vuv;

uniform float u_time;
uniform vec2 mouse;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    float alpha = rand(mod(vuv * u_time, vec2(1.0))) * 0.075;
    // gl_FragColor = vec4(vuv.x, vuv.y, 1.0, 1.0);
    gl_FragColor = vec4(alpha, alpha, alpha, 1.0);
}

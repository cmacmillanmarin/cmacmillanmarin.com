precision mediump float;
varying vec2 vuv;

uniform sampler2D u_image;
uniform sampler2D u_mask;
uniform sampler2D u_depthMap;

uniform float u_time;
uniform vec2 mouse;

void main() {

    vec4 coord = gl_FragCoord;

    vec2 distortedVuv = vuv;

    float frequency = 150.0;
    float amplitude = 0.0075;
    float speed = 0.3;
    float distortion = sin(vuv.x * frequency + u_time * speed) * amplitude;

    frequency = 100.0;
    amplitude = 0.0035;
    speed = 0.01;
    float distortion2 = sin(vuv.x * frequency + u_time * speed) * amplitude;

    frequency = 1.0;
    amplitude = 0.0035;
    speed = 0.035;
    float distortion3 = sin(vuv.x * frequency + u_time * speed) * amplitude;

    float map = texture2D(u_mask, vuv).r;
    float map2 = texture2D(u_mask, vuv).g;
    float map3 = texture2D(u_mask, vuv).b;

    distortedVuv.y += distortion * map;
    distortedVuv.x += distortion2 * map2;
    distortedVuv.y += distortion3 * map3;

    float map4 = texture2D(u_depthMap, vuv).r;

    vec2 parallax = mouse * 0.003 * map4;

    distortedVuv += parallax;

    gl_FragColor = texture2D(u_image, distortedVuv);
    // gl_FragColor = texture2D(u_mask, vuv);
    // gl_FragColor = texture2D(u_depthMap, vuv);
    // gl_FragColor = vec4(vuv.x, vuv.y, 0.0, 1.0);
}

// gets the current position
attribute vec4 a_position;
varying vec2 vuv;

void main() {
   // returns the position

    vuv = (a_position.xy + vec2(1.0)) * vec2(0.5);
    // vuv.y = 1.0 - vuv.y;

    gl_Position = a_position;
}

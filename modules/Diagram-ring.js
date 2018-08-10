global.THREE = require('three');


function Ring(options) {

    THREE.Line.call( this );

    this.nCoords = 3;
    this.step = 2 * Math.PI / this.nCoords;
    this.coords = [];
    this.radius = (options.radius !== undefined) ? options.radius : 150;
    this.time = 0;
    this.shape = Math.floor(Math.random() * 3 + 1);
    this.obj_resolution = 99;
    this.buffer_size = 100;
    this.rotateVelocity = Math.random() * 10 + 0.009
    this.direction = Math.floor(Math.random() * 2 - 1);

    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors,transparent:true});
    var positions = new Float32Array(this.buffer_size * 3);
    var colors = new Float32Array(this.buffer_size * 3);

    for (var i = 0; i < this.buffer_size; i++) {

        colors[i * 3] = options.color[0];//( x / r ) + 0.5;
        colors[i * 3 + 1] = options.color[1];//( y / r ) + 0.5;
        colors[i * 3 + 2] = options.color[2];//0;
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    this.geometry = geometry;
    this.material = material;

    this.generateCoords();
}


Ring.prototype = Object.create(THREE.Line.prototype);
Ring.prototype.constructor = Ring;


Ring.prototype.generateCoords = function () {

    var s = 0.1;

    var positions = this.geometry.attributes.position.array;
    var angle_step = ( ( 360 ) / this.obj_resolution );

    for (var i = 0; i < this.buffer_size; i++) {
        var r = this.radius;
        var ang = ( Math.PI / 180 ) * angle_step * i;

        ang += 0.1 * Math.cos(0.01 * this.time + ang);
        ang += 0.25 * Math.cos(0.05 * this.time + ang);

        r += s * 15 * Math.cos(this.shape * ang + 0.1 * this.time);
        r -= s * 15 * Math.cos(2 * ang - 0.1 * this.time);
        r += s * 10 * Math.sin(this.shape * ang + 0.02 * this.time);
        r -= s * 15 * Math.sin(2 * ang - 0.01 * this.time);
        r += s * 10 * Math.cos(2 * ang + 0.01 * this.time) * Math.sin(this.shape * ang + 0.1 * this.time);
        r += s * 10 * Math.sin(this.shape * ang - 0.1 * this.time) * Math.sin(ang + 0.1 * this.time);

        positions[3 * i] = r * Math.cos(ang);
        positions[3 * i + 1] = r * Math.sin(ang);

    }

    this.geometry.attributes.position.needsUpdate = true;

}


Ring.prototype.update=function() {

    this.rotation.z += 0.1;
    this.time += 0.5;

}

module.exports = Ring;
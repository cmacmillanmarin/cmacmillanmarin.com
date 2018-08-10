global.THREE = require('three');
var Ring = require("./Diagram-ring");
var gyro = require("./Gyro")


var mouseY=0,mouseX = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rings = [];
var tweens = [];
var tweens2 = [];
var numRings = 22;
var gapRings = 1;
var raf

var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
camera.position.z = 400;
if (window.innerWidth < 769) camera.position.z = 500;
var scene = new THREE.Scene();
//scene.fog = new THREE.Fog( 0x000000, 1, 1500 );

var renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );


//listeners
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener('mousemove', onDocumentMouseMove, false);

gyro.startTracking(doGyro)
function doGyro(o) {
	if (document.querySelector('canvas').getBoundingClientRect().top + window.innerHeight < 0) return
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	const device = Boolean( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
	const sign = ((/android/i.test(userAgent)) || (/android/i.test(userAgent))) ? 1 : -1
	if (device) {
		mouseX =  Math.min(Math.max(-6, (Number(o.x))), 6) * 250 * sign
		mouseY = Math.min(Math.max(-6, (Number(o.z) + (-5 * sign))), 6) * 250 * sign
	}
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

//methods
function makeRings(){
    for (var  i = 0; i < numRings; i++) {

        var mesh = new Ring({
            color: (i < numRings / 2) ? [1, 1, 1] : [1, 1, 1],
            radius: 100,
            wavesAmount: Math.floor(Math.random() * 10) + 10

        })

        rings.push(mesh);
        scene.add(mesh);

        var tl = new TimelineMax();
            mesh.position.z = -10000;
            mesh.scale.x = 1;
            mesh.scale.y = 1;
        mesh.material.opacity=0;
            tl.to(mesh.position, 8, {
                z: 200,
                ease: Power2.easeOut,
            });
            tl.to(mesh.material, 8, {
                opacity: 0.75,
                ease: Power1.easeIn,
            },0);

            tl.to(mesh.position, 3, {
                z: -6200,
                ease: Power2.easeIn,
            });
            tl.to(mesh.material, 3, {
                opacity: 0,
                ease: Power0.easeNone,
            },"-=3");


        (i < numRings / 2) ? tweens.push(tl) : tweens2.push(tl);

    }


    var globaltl=new TimelineMax({
    });
    var tl = new TimelineMax({repeat: -1});
    tl.insertMultiple(tweens, 0, 'start', gapRings);
    var tl2 = new TimelineMax({repeat: -1, delay: (numRings / 2) * gapRings});
    tl2.insertMultiple(tweens2, 0, 'start', gapRings);
    globaltl.add(tl,0)
    globaltl.add(tl2,0)
    globaltl.play(3);

}

function onWindowResize(){

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
	camera.position.z = 400;
	if (window.innerWidth < 769) camera.position.z = 500;
}


function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}

function animate(){

    raf = requestAnimationFrame( animate );

    camera.position.x += ( mouseX - camera.position.x * 24 ) * .005;
    camera.position.y += ( -mouseY - camera.position.y * 24 ) * .005;

    var ring;
    for (var i = 0; i < rings.length; i++) {

         ring = rings[i].update();

    }

    renderer.render( scene, camera );

}

module.exports = {

    init: function(){
        document.querySelector('.diagram-wrapper').appendChild(renderer.domElement)
        onWindowResize();
    },
    kill: function(){
        cancelAnimationFrame(raf)
    },
    animate:function(){
        animate();
    },
    makeRings: function() {
        makeRings()
    }

}

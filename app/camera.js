import * as THREE from "three";


export function createCamera(){

    const camera=
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );


    // فاصله 20 واحد از مبدا
    camera.position.set(
        20,
        0,
        0
    );


    camera.lookAt(0,0,0);


    return camera;

}

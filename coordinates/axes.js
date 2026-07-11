import * as THREE from "three";


export function createAxes(scene){


const length=12;



// X قرمز

const x =
new THREE.ArrowHelper(
new THREE.Vector3(1,0,0),
new THREE.Vector3(-length,0,0),
length*2,
0xff0000
);

scene.add(x);



// Y سبز

const y =
new THREE.ArrowHelper(
new THREE.Vector3(0,1,0),
new THREE.Vector3(0,-length,0),
length*2,
0x00ff00
);

scene.add(y);



// Z آبی

const z =
new THREE.ArrowHelper(
new THREE.Vector3(0,0,1),
new THREE.Vector3(0,0,-length),
length*2,
0x0000ff
);

scene.add(z);



// خط‌کش واحدها

const grid =
new THREE.GridHelper(
24,
24,
0x555555,
0x333333
);


scene.add(grid);


}

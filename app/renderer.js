import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";

export function createRenderer(){

const renderer =
new THREE.WebGLRenderer({
    antialias:true
});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


window.addEventListener(
"resize",
()=>{

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});


return renderer;

}

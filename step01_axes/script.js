import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(12,10,12);

const renderer=new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);

controls.enableDamping=true;

controls.target.set(0,0,0);

controls.update();

scene.add(new THREE.AmbientLight(0xffffff,2));



function createAxis(color,start,end){

const material=new THREE.LineBasicMaterial({color});

const geometry=new THREE.BufferGeometry().setFromPoints([
start,
end
]);

const line=new THREE.Line(geometry,material);

scene.add(line);

}



function createTicks(axis,color){

const material=new THREE.LineBasicMaterial({color});

for(let i=-12;i<=12;i++){

if(i===0) continue;

let p1,p2;

switch(axis){

case "x":

p1=new THREE.Vector3(i,-0.12,0);

p2=new THREE.Vector3(i,0.12,0);

break;

case "y":

p1=new THREE.Vector3(-0.12,i,0);

p2=new THREE.Vector3(0.12,i,0);

break;

case "z":

p1=new THREE.Vector3(-0.12,0,i);

p2=new THREE.Vector3(0.12,0,i);

break;

}

const geo=new THREE.BufferGeometry().setFromPoints([p1,p2]);

scene.add(new THREE.Line(geo,material));

}

}



createAxis(
0xff0000,
new THREE.Vector3(-12,0,0),
new THREE.Vector3(12,0,0)
);

createAxis(
0x00ff00,
new THREE.Vector3(0,-12,0),
new THREE.Vector3(0,12,0)
);

createAxis(
0x0088ff,
new THREE.Vector3(0,0,-12),
new THREE.Vector3(0,0,12)
);



createTicks("x",0xff0000);

createTicks("y",0x00ff00);

createTicks("z",0x0088ff);



const xArrow=new THREE.ArrowHelper(
new THREE.Vector3(1,0,0),
new THREE.Vector3(11.2,0,0),
0.8,
0xff0000
);

scene.add(xArrow);



const yArrow=new THREE.ArrowHelper(
new THREE.Vector3(0,1,0),
new THREE.Vector3(0,11.2,0),
0.8,
0x00ff00
);

scene.add(yArrow);



const zArrow=new THREE.ArrowHelper(
new THREE.Vector3(0,0,1),
new THREE.Vector3(0,0,11.2),
0.8,
0x0088ff
);

scene.add(zArrow);



function makeLabel(text,color){

const canvas=document.createElement("canvas");

canvas.width=256;

canvas.height=256;

const ctx=canvas.getContext("2d");

ctx.fillStyle="rgba(0,0,0,0)";

ctx.fillRect(0,0,256,256);

ctx.fillStyle=color;

ctx.font="Bold 160px Arial";

ctx.textAlign="center";

ctx.textBaseline="middle";

ctx.fillText(text,128,128);

const texture=new THREE.CanvasTexture(canvas);

const material=new THREE.SpriteMaterial({
map:texture,
transparent:true
});

const sprite=new THREE.Sprite(material);

sprite.scale.set(1,1,1);

return sprite;

}



const lx=makeLabel("X","red");

lx.position.set(12.8,0,0);

scene.add(lx);



const ly=makeLabel("Y","lime");

ly.position.set(0,12.8,0);

scene.add(ly);



const lz=makeLabel("Z","deepskyblue");

lz.position.set(0,0,12.8);

scene.add(lz);



window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});



function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();

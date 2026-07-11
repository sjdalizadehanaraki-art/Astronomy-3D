import {OrbitControls}
from
"three/addons/controls/OrbitControls.js";


export function createControls(
camera,
canvas
){

const controls =
new OrbitControls(
camera,
canvas
);


// موبایل:
// یک انگشت چرخش
// دو انگشت زوم

controls.enableDamping=true;

controls.enableZoom=true;

controls.rotateSpeed=0.5;

controls.zoomSpeed=1;


return controls;

}

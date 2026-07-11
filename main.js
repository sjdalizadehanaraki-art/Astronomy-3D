import * as THREE from "three";

import {createScene} from "./app/scene.js";
import {createCamera} from "./app/camera.js";
import {createRenderer} from "./app/renderer.js";
import {createControls} from "./app/controls.js";

import {createAxes} from "./coordinates/axes.js";


const scene=createScene();

const camera=createCamera();

const renderer=createRenderer();

document.body.appendChild(renderer.domElement);


createControls(
    camera,
    renderer.domElement
);


createAxes(scene);



function animate(){

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );

}

animate();

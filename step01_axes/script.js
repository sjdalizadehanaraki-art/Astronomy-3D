import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// ---------- Z is Up ----------
camera.up.set(0,0,1);

// زاویه اولیه
camera.position.set(12,-12,10);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.target.set(0,0,0);
controls.update();

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        2
    )
);

function createAxis(color,start,end){

    const material =
        new THREE.LineBasicMaterial({
            color:color
        });

    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints([
            start,
            end
        ]);

    const line =
        new THREE.Line(
            geometry,
            material
        );

    scene.add(line);

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

function createTicks(axis,color){

    const material =
        new THREE.LineBasicMaterial({
            color:color
        });

    for(let i=-12;i<=12;i++){

        if(i===0) continue;

        let p1;
        let p2;

        if(axis==="x"){

            p1=new THREE.Vector3(
                i,
                -0.12,
                0
            );

            p2=new THREE.Vector3(
                i,
                0.12,
                0
            );

        }

        if(axis==="y"){

            p1=new THREE.Vector3(
                -0.12,
                i,
                0
            );

            p2=new THREE.Vector3(
                0.12,
                i,
                0
            );

        }

        if(axis==="z"){

            p1=new THREE.Vector3(
                -0.12,
                0,
                i
            );

            p2=new THREE.Vector3(
                0.12,
                0,
                i
            );

        }

        const geo =
            new THREE.BufferGeometry()
            .setFromPoints([
                p1,
                p2
            ]);

        scene.add(
            new THREE.Line(
                geo,
                material
            )
        );

    }

}

createTicks("x",0xff0000);
createTicks("y",0x00ff00);
createTicks("z",0x0088ff);

// ---------- Arrow X ----------

const xArrow = new THREE.ArrowHelper(
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(11.2,0,0),
    0.8,
    0xff0000,
    0.35,
    0.20
);

scene.add(xArrow);


// ---------- Arrow Y ----------

const yArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,11.2,0),
    0.8,
    0x00ff00,
    0.35,
    0.20
);

scene.add(yArrow);


// ---------- Arrow Z ----------

const zArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0,0,1),
    new THREE.Vector3(0,0,11.2),
    0.8,
    0x0088ff,
    0.35,
    0.20
);

scene.add(zArrow);




// ---------- Labels ----------

function makeLabel(text,color){

    const canvas=document.createElement("canvas");

    canvas.width=256;
    canvas.height=256;

    const ctx=canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        256,
        256
    );

    ctx.font="Bold 160px Arial";

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    ctx.fillStyle=color;

    ctx.fillText(
        text,
        128,
        128
    );

    const texture=
        new THREE.CanvasTexture(canvas);

    const material=
        new THREE.SpriteMaterial({

            map:texture,
            transparent:true

        });

    const sprite=
        new THREE.Sprite(material);

    sprite.scale.set(
        1,
        1,
        1
    );

    return sprite;

}



// ---------- X ----------

const labelX=makeLabel(
    "X",
    "red"
);

labelX.position.set(
    13,
    0,
    0
);

scene.add(labelX);



// ---------- Y ----------

const labelY=makeLabel(
    "Y",
    "lime"
);

labelY.position.set(
    0,
    13,
    0
);

scene.add(labelY);



// ---------- Z ----------

const labelZ=makeLabel(
    "Z",
    "deepskyblue"
);

labelZ.position.set(
    0,
    0,
    13
);

scene.add(labelZ);

// --------------------------------------------------
// OrbitControls تنظیمات
// --------------------------------------------------

controls.enablePan = false;

controls.enableZoom = true;

controls.minDistance = 5;
controls.maxDistance = 40;

controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1.2;

controls.enableDamping = true;
controls.dampingFactor = 0.08;

controls.target.set(0,0,0);
controls.update();


// --------------------------------------------------
// Resize
// --------------------------------------------------

window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});


// --------------------------------------------------
// یک نقطه کوچک در مرکز مختصات
// (فقط برای اینکه مرکز صحنه مشخص باشد)
// --------------------------------------------------

const originGeometry =
    new THREE.SphereGeometry(
        0.08,
        24,
        24
    );

const originMaterial =
    new THREE.MeshBasicMaterial({

        color:0xffffff

    });

const origin =
    new THREE.Mesh(
        originGeometry,
        originMaterial
    );

scene.add(origin);


// --------------------------------------------------
// Animation
// --------------------------------------------------

function animate(){

    requestAnimationFrame(
        animate
    );

    controls.update();

    renderer.render(
        scene,
        camera
    );

}

animate();

// ======================================================
// پایان مرحله ۱
// ======================================================

// نمایش مختصات فعلی دوربین در کنسول (برای توسعه)
window.addEventListener("keydown",(e)=>{

    if(e.key==="c"){

        console.log(
            "Camera Position:",
            camera.position
        );

    }

});

// فوکوس اولیه روی مرکز مختصات
controls.target.set(0,0,0);
controls.update();

// اولین رندر
renderer.render(
    scene,
    camera
);

// ------------------------------------------------------
// Stage 1 Complete
// ------------------------------------------------------

console.log("STEP 01 LOADED");

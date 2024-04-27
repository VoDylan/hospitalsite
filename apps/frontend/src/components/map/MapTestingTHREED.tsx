// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// // import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//
// const MapTestingTHREED = () => {
//   const sceneRef = useRef<HTMLDivElement>(null); // Add type assertion here
//
//   useEffect(() => {
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setClearColor("white");
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     if (sceneRef.current) {
//       document.body.appendChild(renderer.domElement);
//
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
//       camera.position.set(100, 100, 100);
//
//       // const controls = new OrbitControls(camera, renderer.domElement);
//       // controls.enableDamping = true;
//       // controls.enablePan = false;
//       // controls.minDistance = 1;
//       // controls.maxDistance = 2;
//       // controls.minPolarAngle = 0.5;
//       // controls.autoRotate = false;
//       // controls.target = new THREE.Vector3(0, 0, 0);
//       // controls.update();
//
//       const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
//       groundGeometry.rotateX(-Math.PI / 2);
//       const groundMaterial = new THREE.MeshBasicMaterial({
//         color: "grey",
//         side: THREE.DoubleSide,
//       });
//       // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//       // scene.add(groundMesh);
//
//       const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
//       spotLight.position.set(100, 100, 100);
//       scene.add(spotLight);
//
//       const loader = new GLTFLoader().setPath("/3D/");
//       loader.load("Floor2.gltf", (gltf) => {
//         const mesh = gltf.scene;
//         mesh.position.set(60, 60, 60);
//         mesh.scale.set(2, 2, 2);
//         scene.add(mesh);
//       });
//
//       const animate = () => {
//         requestAnimationFrame(animate);
//         // controls.update();
//         renderer.render(scene, camera);
//       };
//
//       animate();
//     }
//
//     return () => {
//       // Clean up Three.js resources here if needed
//     };
//   }, []);
//
//   return <div ref={sceneRef} />;
// };
//
// export default MapTestingTHREED;


// import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import {Suspense} from "react";

function MapTestingTHREED () {
  return (
    <div>hello
      <Canvas >
        <Suspense fallback={null}>
        </Suspense>
      </Canvas>
    </div>
  );
}
export default MapTestingTHREED;

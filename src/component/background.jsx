import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // Set background color to black

    const mountNode = mountRef.current;
    mountNode.appendChild(renderer.domElement);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const color = new THREE.Color();
    const size = 2;

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2000;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      color.setHSL(Math.random(), 1.0, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: size,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 1500;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      const mouseXNorm = (mouseX / window.innerWidth) * 2 - 1;
      const mouseYNorm = -(mouseY / window.innerHeight) * 2 + 1;
      particlesMaterial.color.setHSL((mouseXNorm + 1) / 2, (mouseYNorm + 1) / 2, 0.5);

      renderer.render(scene, camera);
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
      mountNode.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'black' }} />;
};

export default ParticleBackground;

// import React from 'react';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

// const ParticleBackground = () => {
//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: {
//           color: {
//             value: "#0d47a1",
//           },
//         },
//         fpsLimit: 60,
//         particles: {
//           color: {
//             value: "#ffffff",
//           },
//           links: {
//             color: "#ffffff",
//             distance: 150,
//             enable: true,
//             opacity: 0.5,
//             width: 1,
//           },
//           collisions: {
//             enable: true,
//           },
//           move: {
//             direction: "none",
//             enable: true,
//             outMode: "bounce",
//             random: false,
//             speed: 6,
//             straight: false,
//           },
//           number: {
//             density: {
//               enable: true,
//               value_area: 800,
//             },
//             value: 80,
//           },
//           opacity: {
//             value: 0.5,
//           },
//           shape: {
//             type: "circle",
//           },
//           size: {
//             random: true,
//             value: 5,
//           },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default ParticleBackground;

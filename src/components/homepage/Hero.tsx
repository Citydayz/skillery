"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Group, PerspectiveCamera } from "three";

function EarthHologram() {
    const ref = useRef<Group>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
  
    const { scene, animations, cameras } = useGLTF(
      "/assets/looking_glass_hologram_technology_meet_art.glb"
    );
    const { actions } = useAnimations(animations, ref);
  
    useEffect(() => {
      if (actions && actions[Object.keys(actions)[0]]) {
        actions[Object.keys(actions)[0]]!.play();
      }
    }, [actions]);
  
    useFrame((state) => {
      if (cameraRef.current) {
        state.camera.position.copy(cameraRef.current.position);
        state.camera.rotation.copy(cameraRef.current.rotation);
        state.camera.updateProjectionMatrix();
      }
    });
  
    return (
      <>
        <primitive ref={ref} object={scene} scale={5.0} position={[-1, -0.5, 0]} />
        {cameras.length > 0 && (
          <primitive
            object={cameras.find((c) => c.name === "View2") || cameras[0]}
            ref={cameraRef}
          />
        )}
      </>
    );
  }
  

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-white flex items-center justify-center overflow-visible">
      {/* Canvas 3D en absolute */}
      <div className="absolute right-0 top-0 h-full w-1/2 z-0">
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} />
          <Suspense fallback={null}>
            <EarthHologram />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Texte principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Skillery. <br />
            <span className="text-[#00ADB5]">Un seul hub, pour les contrôler tous.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Gagne du temps en centralisant ton flow de travail. Simplifie ta gestion et reste concentré sur l’essentiel.
          </p>
          <a
            href="/tools/image-converter"
            className="bg-[#00ADB5] hover:bg-[#00cfd9] transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            🚀 Commencer maintenant
          </a>
        </div>
      </div>
    </section>
  );
}

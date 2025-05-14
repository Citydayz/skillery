"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Group, PerspectiveCamera } from "three";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

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
      <primitive
        ref={ref}
        object={scene}
        scale={5.0}
        position={[-1, -0.5, 0]}
      />
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
  const handleToolsClick = () => {
    toast.success("Découvrez nos outils disponibles !", {
      duration: 4000,
      position: "bottom-center",
    });
  };

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
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* Texte principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Tout ce qu'il vous faut pour créer, gérer, livrer. En mieux.
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
              Skillery centralise vos outils, optimise votre flux de travail et
              booste votre productivité.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/tools/image-converter"
                className="bg-[#00ADB5] hover:bg-[#00cfd9] transition text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
              >
                Essayer gratuitement
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#tools"
                onClick={handleToolsClick}
                className="border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white transition px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ADB5]"
              >
                Voir les outils
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          ></motion.div>
        </div>
      </div>
    </section>
  );
}

import { Center, Instance, Instances, useDetectGPU } from "@react-three/drei";
import React, { useCallback, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { CustomeMaterial } from "../material";
import { useGSAP } from "@gsap/react";
import { isReducedMotion } from "../../Buttons/utils/performanceUtils";

const Item9 = () => {
  const refList = useRef([]);
  const animationsRef = useRef([]);
  const gpuTier = useDetectGPU();
  const reducedMotion = useMemo(() => isReducedMotion(), []);

  // Determine the number of instances based on GPU performance
  const instanceCount = useMemo(() => {
    // If reduced motion preference is enabled, use fewer instances
    if (reducedMotion) return 5;

    // Adjust based on GPU tier
    if (!gpuTier.tier || gpuTier.tier < 1) return 5; // Low-end device
    if (gpuTier.tier < 2) return 7; // Mid-range device
    return 10; // High-end device
  }, [gpuTier.tier, reducedMotion]);

  // Optimize geometry detail based on GPU performance
  const cylinderDetail = useMemo(() => {
    if (reducedMotion) return 16;
    if (!gpuTier.tier || gpuTier.tier < 1) return 16;
    if (gpuTier.tier < 2) return 32;
    return 64;
  }, [gpuTier.tier, reducedMotion]);

  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  // Use GSAP for high-end devices, and useFrame for low-end devices
  useGSAP(() => {
    if (refList.current.length === 0 || reducedMotion) return;

    // Clear any existing animations
    animationsRef.current.forEach(anim => anim.kill());
    animationsRef.current = [];

    refList.current.forEach((mesh, index) => {
      if (mesh) {
        // Create animation with appropriate duration based on device capability
        const animation = gsap.to(mesh.scale, {
          x: 0.3,
          z: 0.3,
          delay: 0.15 * index, // Reduced delay for better performance
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: gpuTier.tier >= 2 ? 1 : 1.5, // Slower animation for lower-end devices
        });

        // Store animation reference for cleanup
        animationsRef.current.push(animation);
      }
    });

    // Cleanup function
    return () => {
      animationsRef.current.forEach(anim => anim.kill());
      animationsRef.current = [];
    };
  }, [gpuTier.tier, reducedMotion]);

  // For reduced motion or low-end devices, use useFrame instead of GSAP
  useFrame(({ clock }) => {
    if (!reducedMotion || refList.current.length === 0) return;

    // Simple, lightweight animation using sine wave
    refList.current.forEach((mesh, index) => {
      if (mesh) {
        const offset = index * 0.5;
        const scale = 0.7 + Math.sin(clock.elapsedTime + offset) * 0.3;
        mesh.scale.x = scale;
        mesh.scale.z = scale;
      }
    });
  });
  return (
    <Center>
      <group rotation={[0, 0, Math.PI / 4]}>
        <group rotation={[0, 0, Math.PI / 2]}>
          <Instances limit={instanceCount}>
            <cylinderGeometry args={[1, 1, 0.2, cylinderDetail]}></cylinderGeometry>
            <CustomeMaterial></CustomeMaterial>
            {Array.from({ length: instanceCount }).map((_, index) => {
              return (
                <Instance
                  ref={getRef}
                  key={index}
                  position={[0, 0.5 * index, 2]}
                />
              );
            })}
          </Instances>
        </group>
      </group>
    </Center>
  );
};

export default React.memo(Item9);
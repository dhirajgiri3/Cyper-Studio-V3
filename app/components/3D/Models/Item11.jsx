import { Instance, Instances, useDetectGPU } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import * as THREE from "three";
import { CustomeMaterial } from "../material";
import { isReducedMotion } from "../../Buttons/utils/performanceUtils";

// Inspired by https://www.shadertoy.com/view/sdsXWr
const Item11 = () => {
  const refList = useRef([]);
  const positionsRef = useRef([]);
  const lastTimeRef = useRef(0);
  const gpuTier = useDetectGPU();
  const reducedMotion = useMemo(() => isReducedMotion(), []);
  const [isClient, setIsClient] = useState(false);

  // Set client-side state on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimize sphere detail based on GPU performance
  const sphereDetail = useMemo(() => {
    if (reducedMotion) return 16;
    if (!gpuTier.tier || gpuTier.tier < 1) return 16;
    if (gpuTier.tier < 2) return 24;
    return 32;
  }, [gpuTier.tier, reducedMotion]);

  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  // Memoize the rotation matrix function
  const rotate = useMemo(
    () => (a) => {
      const s = Math.sin(a);
      const c = Math.cos(a);
      return new THREE.Matrix3().set(c, -s, 0, s, c, 0, 0, 0, 1);
    },
    []
  );

  // Memoize the positions array to avoid recreating it on each frame
  useEffect(() => {
    if (refList.current.length === 0) return;

    positionsRef.current = [
      {
        sphere: refList.current[0],
        vector: new THREE.Vector3(-4, -4, 0),
        angleMultiplier: 1,
      },
      {
        sphere: refList.current[1],
        vector: new THREE.Vector3(-2, -4, 0),
        angleMultiplier: 0.05,
      },
      {
        sphere: refList.current[2],
        vector: new THREE.Vector3(0, -4, 0),
        angleMultiplier: 0.05,
      },
      {
        sphere: refList.current[3],
        vector: new THREE.Vector3(2, -4, 0),
        angleMultiplier: 0.05,
      },
      {
        sphere: refList.current[4],
        vector: new THREE.Vector3(4, -4, 0),
        angleMultiplier: 1,
      },
    ];
  }, []);

  // Optimized animation with frame skipping for low-end devices
  useFrame(({ clock }) => {
    if (refList.current.length === 0 || positionsRef.current.length === 0) return;

    const time = clock.getElapsedTime();

    // Skip frames for reduced motion or low-end devices
    if (reducedMotion || (!gpuTier.tier || gpuTier.tier < 1)) {
      // Only update every 3rd frame
      if (time - lastTimeRef.current < 0.05) return;
      lastTimeRef.current = time;
    }

    // Slower animation for reduced motion
    const animationSpeed = reducedMotion ? 2 : 4;
    const angle = Math.sin(time * animationSpeed);
    const angle1 = Math.min(0, angle * 0.5);
    const angle5 = Math.max(0, angle * 0.5);

    // Use the pre-calculated positions array
    positionsRef.current.forEach((item, index) => {
      if (!item.sphere) return;

      // Calculate angle based on position
      let calculatedAngle;
      if (index === 0) calculatedAngle = angle1;
      else if (index === 4) calculatedAngle = angle5;
      else if (index === 1) calculatedAngle = (angle + angle1) * item.angleMultiplier;
      else if (index === 3) calculatedAngle = (angle + angle5) * item.angleMultiplier;
      else calculatedAngle = angle5 * item.angleMultiplier;

      // Apply rotation with optimized matrix calculation
      const newPosition = item.vector.clone().applyMatrix3(rotate(calculatedAngle));
      newPosition.y += 3;

      // Use lerp for smoother motion on low-end devices
      if (reducedMotion || (!gpuTier.tier || gpuTier.tier < 2)) {
        item.sphere.position.lerp(newPosition, 0.6);
      } else {
        item.sphere.position.copy(newPosition);
      }
    });
  });

  return (
    <group scale={0.55}>
      <Instances>
        <sphereGeometry args={[1, sphereDetail, sphereDetail]} />
        <CustomeMaterial />
        {Array.from({ length: 5 }).map((_, index) => (
          <Instance
            ref={getRef}
            key={index}
            position={[(index - 2) * 2, 0, 0]}
          />
        ))}
      </Instances>
    </group>
  );
};

export default React.memo(Item11);
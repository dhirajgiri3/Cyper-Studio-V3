import React, { forwardRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useStore } from './useStore';

export const CustomeMaterial = forwardRef((props, ref) => {
  const matcap = useStore((x) => x.texture);
  const texture = useTexture(`/Assets/Image/textures/${matcap}`);
  return (
    <meshMatcapMaterial
      {...props}
      ref={ref}
      matcap={texture}
    ></meshMatcapMaterial>
  );
});

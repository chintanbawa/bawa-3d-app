import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { meshToPart } from './utils/meshToPart';
import ColorPanel from './compnents/ColorPanel';
import Model from './compnents/Model';
import { useColorStore } from './store';

const App = () => {
  const { carColor } = useColorStore();

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ height: '100vh' }}>
        <Canvas camera={{ position: [-4, 3, 3] }}>
          <Environment preset='apartment' />
          <Suspense
            fallback={
              <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color='gray' wireframe />
              </mesh>
            }
          >
            <Model partsColor={carColor.partsColor} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      <ColorPanel />
    </div>
  );
};

export default App;

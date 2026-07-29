import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { meshToPart } from './utils/meshToPart';
import { carColors } from './utils/carColors';
import ColorDot from './compnents/ColorDot';
import ColorPanel from './compnents/ColorPanel';
import Model from './compnents/Model';
import { useColorStore } from './store';

const App = () => {
  const { carColor, setCarColor } = useColorStore();
  console.log('carColor = ', carColor);
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ColorPanel />
      <div style={{ height: '90vh' }}>
        <Canvas camera={{ position: [3, 3, 3] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginTop: 20
        }}
      >
        {Object.keys(carColors).map(key => (
          <ColorDot
            key={key}
            backgroundColor={carColors[key].code}
            isSelected={carColor.code === carColors[key].code}
            onClick={() => setCarColor(carColors[key])}
            label={key}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

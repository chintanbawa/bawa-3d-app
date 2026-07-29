import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { meshToPart } from './utils/meshToPart';
import { carColors } from './utils/carColors';
import ColorDot from './compnents/ColorDot';
import ColorPanel from './compnents/ColorPanel';

function Model({ colors }) {
  const { scene } = useGLTF('/models/car.glb');

  useEffect(() => {
    const disposables = [];
    scene.traverse(child => {
      if (child.isMesh) {
        const part = meshToPart[child.name];
        if (part) {
          const oldMaterial = child.material;
          child.material = oldMaterial.clone();
          child.material.color.set(colors[part]);
          disposables.push(oldMaterial);
        }
      }
    });
    return () => disposables.forEach(mat => mat.dispose());
  }, [colors, scene]);

  return <primitive object={scene} />;
}

const App = () => {
  const [selectedColor, setSelectedColor] = useState(carColors['black']);

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
            <Model colors={selectedColor.colors} />
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
            backgroundColor={carColors[key].colorCode}
            isSelected={selectedColor.colorCode === carColors[key].colorCode}
            onClick={() => setSelectedColor(carColors[key])}
            label={key}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

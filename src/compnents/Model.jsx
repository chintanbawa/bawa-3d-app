import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { meshToPart } from '../utils/meshToPart';

function Model({ partsColor }) {
  const { scene } = useGLTF('/models/car.glb');

  useEffect(() => {
    const disposables = [];
    scene.traverse(child => {
      if (child.isMesh) {
        const part = meshToPart[child.name];
        if (part) {
          const oldMaterial = child.material;
          child.material = oldMaterial.clone();
          if (partsColor[part]) {
            child.material.color.set(partsColor[part]);
          }
          disposables.push(oldMaterial);
        }
      }
    });
    return () => disposables.forEach(mat => mat.dispose());
  }, [partsColor, scene]);

  return <primitive object={scene} />;
}

export default Model;

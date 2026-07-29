import { useState } from 'react';
import { useColorStore } from '../store';
import { meshToPart } from '../utils/meshToPart';
import ColorDot from './ColorDot';

const swatches = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffffff',
  '#000000',
  '#ffaa00'
];

export default function ColorPanel() {
  const setColor = useColorStore(state => state.setColor);
  const [selectedPart, setSelectedPart] = useState(
    meshToPart['mesh1643766101']
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'white',
        padding: 16,
        borderRadius: 8,
        zIndex: 10
      }}
    >
      <div style={{ marginBottom: 8 }}>
        {Object.keys(meshToPart).map(k => (
          <button key={k} onClick={() => setSelectedPart(meshToPart[k])}>
            {meshToPart[k]}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {swatches.map(color => (
          <ColorDot
            key={color}
            backgroundColor={color}
            onClick={() => setColor(selectedPart, color)}
            label={color}
          />
        ))}
      </div>

      <p>Editing: {selectedPart}</p>
    </div>
  );
}

import { useState } from 'react';
import { useColorStore } from '../store';
import { colorPanelParts } from '../utils/colorPanelParts';
import ColorDot from './ColorDot';

const swatches = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffffff',
  '#000000',
  '#ffaa00',
  '#ff69b4',
  '#8a2be2'
];

export default function CustomColorPanel() {
  const setColor = useColorStore(state => state.setColor);
  const partsColor = useColorStore(state => state.carColor.partsColor);
  const [selectedPart, setSelectedPart] = useState(colorPanelParts[0].slug);

  return (
    <div
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        padding: '16px',
        margin: '6px 24px',
        borderRadius: 8
      }}
    >
      <div
        style={{
          marginBottom: 12,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 8
        }}
      >
        {colorPanelParts.map(({ mesh, slug, label }) => {
          const isSelected = slug === selectedPart;
          return (
            <button
              key={mesh}
              onClick={() => setSelectedPart(slug)}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: isSelected
                  ? '1px solid var(--accent)'
                  : '1px solid var(--border)',
                background: isSelected ? 'var(--accent-bg)' : 'transparent',
                color: isSelected ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        {swatches.map(color => (
          <ColorDot
            key={color}
            backgroundColor={color}
            isSelected={partsColor[selectedPart] === color}
            onClick={() => setColor(selectedPart, color)}
            label={color}
          />
        ))}
      </div>
    </div>
  );
}

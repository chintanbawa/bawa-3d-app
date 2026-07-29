import { useColorStore } from '../store';
import { carColors } from '../utils/carColors';
import ColorDot from './ColorDot';
import CustomColorPanel from './CustomColorPanel';

export default function ColorPanel() {
  const { carColor, setCarColor } = useColorStore();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        width: '100%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
      }}
    >
      {carColor.code === null && <CustomColorPanel />}
      <div style={{ display: 'flex', gap: 16 }}>
        {Object.keys(carColors).map(key => (
          <ColorDot
            key={key}
            backgroundColor={carColors[key].code}
            isCustom={key === 'custom'}
            isSelected={carColor.code === carColors[key].code}
            onClick={() => setCarColor(carColors[key])}
            label={key}
          />
        ))}
      </div>
    </div>
  );
}

import react from 'react';

const ColorDot = ({
  width = 24,
  backgroundColor = '#000',
  isSelected,
  onClick,
  label
}) => (
  <div
    role='button'
    tabIndex={0}
    aria-label={label ? `Select ${label} color` : 'Select color'}
    aria-pressed={isSelected}
    style={{
      width: width,
      height: width,
      borderRadius: width,
      backgroundColor,
      borderWidth: 4,
      borderStyle: isSelected ? 'solid' : 'none',
      borderColor: '#fff',
      cursor: 'pointer'
    }}
    onClick={onClick}
  ></div>
);

export default ColorDot;

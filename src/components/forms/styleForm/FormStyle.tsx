import { Button } from 'antd';
import React, { useState } from 'react';

export default function FormStyle({ onStyleChange }: { onStyleChange: (style: string) => void }) {
  const [selectedStyle, setSelectedStyle] = useState('');

  const handleButtonClick = (style : string) => {
    setSelectedStyle(style);
    onStyleChange(style);
  };

  return (
    <div>
      <Button onClick={() => handleButtonClick('bgColor')}>Bg color</Button>
      <Button onClick={() => handleButtonClick('textColor')}>Text color</Button>
      <Button onClick={() => handleButtonClick('borderColor')}>Border color</Button>
      <Button onClick={() => handleButtonClick('padding')}>padding
      </Button>
      <Button onClick={() => handleButtonClick('margin')}>Margin</Button>
      <Button onClick={() => handleButtonClick('radius')}>Radius</Button>
    </div>
  );
}

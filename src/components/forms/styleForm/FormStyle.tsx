import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function FormStyle() {
  const [styles, setStyles] = useState({
    padding: '',
    bgColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#000000',
    margin: '',
    radius: '',
  });

  const handleStyleChange = (key: keyof typeof styles, value: string) => {
    setStyles({
      ...styles,
      [key]: value,
    });
  };

  return (
    <div>
      <div>
        <Button>Padding</Button>
        <Input
          type="text"
          value={styles.padding}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          placeholder="Enter padding"
        />
      </div>
      <div>
        <Button>Bg Color</Button>
        <SketchPicker
          color={styles.bgColor}
          onChangeComplete={(color:any) => handleStyleChange('bgColor', color.hex)}
        />
      </div>
      <div>
        <Button>Text Color</Button>
        <SketchPicker
          color={styles.textColor}
          onChangeComplete={(color:any) => handleStyleChange('textColor', color.hex)}
        />
      </div>
      <div>
        <Button>Border Color</Button>
        <SketchPicker
          color={styles.borderColor}
          onChangeComplete={(color:any) => handleStyleChange('borderColor', color.hex)}
        />
      </div>
      <div>
        <Button>Margin</Button>
        <Input
          type="text"
          value={styles.margin}
          onChange={(e) => handleStyleChange('margin', e.target.value)}
          placeholder="Enter margin"
        />
      </div>
      <div>
        <Button>Radius</Button>
        <Input
          type="text"
          value={styles.radius}
          onChange={(e) => handleStyleChange('radius', e.target.value)}
          placeholder="Enter border radius"
        />
      </div>
    </div>
  );
}

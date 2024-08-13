"use client"
import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import SketchPicker from 'react-color/lib/components/sketch/Sketch';

export default function FormStyle({
  form
}: { form: Form }) {

  const [styles, setStyles] = useState({
    padding: form.style?.padding || '',
    backgroundColor: form.style?.backgroundColor || '#ffffff',
    color: form.style?.color || '#000000',
    borderColor: form.style?.borderColor || '#000000',
    margin: form.style?.margin || '',
    borderRadius: form.style?.borderRadius || '',
  });

  useEffect(() => {
    // Update the form's style when the styles state changes
    form.style = {
      ...form.style,
      padding: styles.padding,
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      borderColor: styles.borderColor,
      margin: styles.margin,
      borderRadius: styles.borderRadius,
    };
  }, [styles, form]);

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
          color={styles.backgroundColor}
          onChangeComplete={(color: any) => handleStyleChange('backgroundColor', color.hex)}
        />
      </div>
      <div>
        <Button>Text Color</Button>
        <SketchPicker
          color={styles.color}
          onChangeComplete={(color: any) => handleStyleChange('color', color.hex)}
        />
      </div>
      <div>
        <Button>Border Color</Button>
        <SketchPicker
          color={styles.borderColor}
          onChangeComplete={(color: any) => handleStyleChange('borderColor', color.hex)}
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
          value={styles.borderRadius}
          onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
          placeholder="Enter border radius"
        />
      </div>
    </div>
  );
}

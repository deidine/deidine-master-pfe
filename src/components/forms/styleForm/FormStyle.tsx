"use client"
import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import SketchPicker from 'react-color/lib/components/sketch/Sketch';
import PreviewStyleForm from '../previews/PreviewStyleForm';

export default function FormStyle({
  form
}: { form: Form }) {
 return (
  <PreviewStyleForm form={form}/>
  );
}

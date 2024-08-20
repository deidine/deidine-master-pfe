"use client";
import React, { useEffect, useState } from "react"; 
import { tamplateForms } from "@/data/tamplateForms";
import PreviewFormsTamplates from "../forms/previews/PreviewFormsTamplates";

export default function FormTamplate() {
 
  return (
    <div>
      {tamplateForms.map((form: Form) => (
        <PreviewFormsTamplates form={form} onFinish={() => {}} />
      ))}
    </div>
  );
}

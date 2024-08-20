"use client";
import React, { useEffect, useState } from "react";
import { tamplateForms } from "@/data/tamplateForms";
import PreviewFormsTamplates from "../forms/previews/PreviewFormsTamplates";
import Image from "next/image";

export default function FormTamplate() {
  return (
    //do cpature de ecran d'image
    <div>
      {/* {tamplateForms.map((form: Form) => (
        <div key={form.id}>
          <PreviewFormsTamplates form={form} onFinish={() => {}} />
        </div>
      ))} */}
      <Image src="/formTamplateImgs/login.png" alt="image" width={500} height={500} />
    </div>
  );
}

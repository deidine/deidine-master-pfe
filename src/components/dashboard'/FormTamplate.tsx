"use client";
import React, { useEffect, useState } from "react"; 
import { tamplateForms } from "@/data/tamplateForms";
import PreviewFormsTamplates from "../forms/previews/PreviewFormsTamplates";
import { Row, Col } from "antd";

export default function FormTamplate() {
 
  return ( 
          <Row gutter={[16, 16]}>
          {tamplateForms.map((form: Form) => (
<Col key={form.id} span={8}>
<PreviewFormsTamplates form={form} onFinish={() => {}} />
</Col>
))}
        
      </Row>
     
  );
}

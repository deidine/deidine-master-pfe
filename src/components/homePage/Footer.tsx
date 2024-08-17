import Link from "next/link";
import React from "react";
 
export default function Footer() {
  return (
    <div className="border-2 py-12 px-14 bg-slate-800 text-slate-400 flex justify-around items-center md:flex-row flex-col text-center">
      
      <div className="text-center">
        <h1 className="text-4xl">Form Builder</h1>
        <p className="my-2">Follow us on</p>

        <ul>
          <li className="py-2">
            <Link href="https://twitter.com/formbuilder" />
          </li>
          <li className="py-2"> 
            <Link href="https://facebook.com/formbuilder" />
          </li>
          <li className="py-2">
            <Link href="https://instagram.com/formbuilder" />
          </li>
        </ul>
      </div>

      <div className="my-3 py-4">
        <h3 className="text-3xl font-bold">What We Offer</h3>
        <ul>
          <li className="py-1 my-1">Drag & Drop Form Builder</li>
          <li className="py-1">Real-Time Preview</li>
          <li className="py-1">Export to React or Flutter</li>
          <li className="py-1">Form Management System</li>
          <li className="py-1">Responsive Design</li>
        </ul>
      </div>

      <div>
        <h3 className="text-3xl font-bold">Contact</h3>
        <ul>
          <li className="py-1">support@formbuilder.com</li>
          <li className="py-1">+1 123 456 7890</li>
          <li className="py-1">Support Team</li>
        </ul>
      </div>

    </div>
  );
}

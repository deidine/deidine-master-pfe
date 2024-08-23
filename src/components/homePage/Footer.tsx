import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <section id="footer">
      <div className="flex bg-hoverButtonColor justify-between px-4 gap-4 pt-[25px]  w-full rounded-lg">
        <div>
          <Image src="/logo.jpg" alt="image" width={100} height={100} />
        </div>
        <div className="flex flex-col  gap-4">
          <p>Parlez-nous de votre projet.</p>
          <p>
            Que vous souhaitiez nous présenter votre projet ou simplement poser
            quelques questions sur nos services, notre équipe se fera un plaisir
            de vous assister.
          </p>
          <button>Nous contacter</button>
        </div>
      </div>
    </section>
  );
}

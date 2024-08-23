import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Footer() {
  return (
    <section className="bg-secondaryColor pb-[1.5rem] px-[4.5rem]" id="footer">
      <div className="flex justify-between p-10">
        <div className="w-[20%] flex flex-col justify-center items-center gap-4">
          <Image src="/vm-logo-purpel.svg" alt="Vector Mind Logo" width={200} height={100} />
        </div>

        <div className="flex justify-center pt-28 w-full rounded-lg">
          <div className="flex flex-col w-[60%] gap-4">
            <p className="text-black font-semibold text-lg">Mon stage chez Vector Mind</p>
            <p className="text-black text-md">
              Au cours de mon stage chez Vector Mind, j'ai eu l'opportunité de contribuer à des projets de création logicielle et de développement. L'entreprise est spécialisée dans le développement de solutions innovantes qui répondent aux besoins des clients. Que vous ayez un projet à présenter ou des questions sur nos services, notre équipe est là pour vous aider.
            </p>
            <Link href="https://vector-mind.com/" target="_blank">
              <span className="bg-buttonColor   flex gap-3 text-white rounded-xl justify-center items-center w-[70%] sm:w-[30%] md:w-[25%] z-10 border-buttonColor border p-2 transition-all duration-300">
                Visiter le site <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <span className="text-black pl-4 mb-20 font-semibold">
        © 2024 Vector Mind. Tous droits réservés.
      </span>
    </section>
  );
}

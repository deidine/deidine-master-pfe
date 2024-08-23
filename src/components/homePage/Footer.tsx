import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Footer() {
  return (
    <section className="bg-secondaryColor pb-[1.5rem] pt-[5rem] px-[4.5rem]" id="footer">
      <div className="flex flex-col lg:flex-row justify-between p-10">
        <div className="w-[20%] flex flex-col justify-center items-center gap-4">
          <Image src="/logo-vm2.svg" alt="Vector Mind Logo" width={200} height={100} />
        </div>

        <div className="flex justify-center   w-full rounded-lg">
          <div className="flex flex-col w-[60%] gap-4">
            <p className="text-black font-semibold text-lg">
              Ce projet a été réalisé dans le cadre de mon stage chez <span className="text-buttonColor font-bold">Vector Mind </span>
            </p>
            <p className="text-black text-md">
              Au cours de mon stage chez <span className="text-buttonColor font-bold">Vector Mind, </span> j'ai contribué à des projets de création logicielle et de développement. <span className="text-buttonColor font-bold">Vector Mind </span>est une entreprise spécialisée dans
               le développement de solutions innovantes, sécurisées et centrées sur l'utilisateur. Son objectif est de révolutionner le domaine des technologies de l'information en proposant des solutions évolutives qui répondent à vos besoins.
            </p>
            <Link href="https://vector-mind.com/" target="_blank">
              <span className="bg-buttonColor flex gap-3 text-white rounded-xl justify-end items-center w-[70%] sm:w-[30%] md:w-[25%] z-10 border-buttonColor border p-2 transition-all duration-300">
                Visiter le site <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <span className="text-black pl-4 mb-20 ">
        © 2024 Vector Mind. Tous droits réservés.
      </span>
    </section>
  );
}

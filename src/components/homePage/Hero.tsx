 
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex flex-col font-text lg:flex-row justify-between items-start px-[4.5rem] lg:pb-4">
      <div className="lg:w-1/2 w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <p className="text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:w-[90%] py-4">
          Simplifiez la création de formulaires avec <span className="text-buttonColor">Quick Form
</span>.
        </p>

        <p className="w-full text-justify pt-[20px] sm:w-[80%] md:w-[70%] lg:w-[85%] text-xs sm:text-sm md:text-base lg:text-lg">
          <span className="text-buttonColor font-bold">Quick Form
</span> vous offre une interface intuitive pour créer, personnaliser, et gérer vos formulaires facilement. Gagnez du temps avec nos outils performants, que vous soyez un développeur expérimenté ou une personne sans compétences techniques. La conception, l{"'"}édition, et l{"'"}exportation de formulaires se font en quelques clics seulement.
        </p>

        <p className="pt-[25px] w-full text-justify sm:w-[80%] md:w-[70%] lg:w-[85%] text-xs sm:text-sm md:text-base lg:text-lg">
          <span className="text-buttonColor font-bold">Quick Form
</span> vous aide à optimiser votre flux de travail avec des solutions innovantes. Notre mission est de vous fournir les outils nécessaires pour une gestion efficace de vos formulaires , tout en assurant une expérience utilisateur optimale.
        </p>

        <div className="pt-[25px]">
         
        </div>
      </div>

      <div className="absolute hidden lg:block right-10 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] lg:h-[500px]">
        <Image src="/logo.png" alt="Quick Form
 Logo" width={400} height={500} />
      </div>
    </div>
  );
}

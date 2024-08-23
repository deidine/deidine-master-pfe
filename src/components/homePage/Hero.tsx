import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="px-[4.5rem] relative h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col lg:flex-row justify-between items-start lg:pb-10">
      <div className="lg:w-1/2 w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <p className="text-buttonColor font-bold text-lg sm:text-xl lg:text-2xl pb-4">
          Quick Form
        </p>

        <p className="text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full lg:w-[90%] py-4">
          Simplifiez la création de formulaires pour les développeurs
        </p>

        <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[85%] text-xs sm:text-sm md:text-base lg:text-lg">
        <span className="text-buttonColor font-bold">Quick Form</span>  vous permet de créer et gérer des formulaires de manière efficace grâce à une interface intuitive et des fonctionnalités de glisser-déposer. Que vous travailliez en local ou dans une base de données, <span className="text-buttonColor font-bold">Quick Form</span>  facilite la conception, l'édition, et l'exportation de formulaires en quelques clics seulement.
       
    </p>  
     <button className="text-black mt-10 bg-transparent border-[1px] rounded-full p-2 px-4 border-gray-200  hover:bg-white hover:text-blue-800 transition ease-in-out"> <Link href="/login" className=" bg-transparent ">S'enregistrer</Link></button> 
      </div>

      <div className="absolute hidden lg:block right-10 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] lg:h-[500px]">
        <Image src="/logo.png" alt="Quick Form Logo" width={500} height={500} />
      </div>
    </div>
  );
}

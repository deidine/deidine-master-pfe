import { FaCloudArrowUp, FaLocationDot } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

export default function GiveTry() {
  return (
    <section id="about" className="px-[4.5rem] w-full flex gap-[70px] my-8 py-1 pb-10">
  
      <Link href="/login" className="bg-buttonColor flex flex-col cursor-pointer  gap-4 p-[25px] w-[30%] rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:z-10">
        <div className="flex flex-col text-white gap-2 justify-center items-center">
          <span className="text-[60px] bg-white p-4 rounded-full">
            <FaCloudArrowUp className="text-buttonColor" />
          </span>
          <p className="text-2xl font-bold">Créez sur notre serveur</p>
        </div>
        <div className="flex flex-col text-white gap-2 justify-center items-center">
          <p className="text-md font-title text-center">
            Enregistrez vos formulaires dans notre base de données en ligne. Partagez vos formulaires facilement et accédez-y à tout moment. La création d un compte est requise.
          </p>
        </div>
      </Link>   
     

      <Link href="/forms" className="bg-buttonColor flex flex-col  cursor-pointer gap-4 p-[25px] w-[30%] rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:z-10">
        <div className="flex flex-col text-white gap-2 justify-center items-center">
          <span className="text-[60px] bg-white p-4 rounded-full">
            <FaLocationDot className="text-buttonColor" />
          </span>
          <p className="text-2xl font-bold">Créez sur le stockage local</p>
        </div>
        <div className="flex flex-col text-white gap-2 justify-center items-center">
          <p className="text-md font-title text-center">
            Stockez vos formulaires sur votre machine locale avec LocalStorage. Créez des formulaires sans avoir besoin de compte.
          </p>
        </div> 
      </Link>
    </section>
  );
} 

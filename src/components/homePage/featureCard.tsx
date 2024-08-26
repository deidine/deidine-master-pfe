import { LuClipboardEdit,LuShare } from "react-icons/lu";
import { TbFileTypeHtml } from "react-icons/tb";
import { IoSave } from "react-icons/io5";
import { BiCustomize } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import React from "react";
export default function Features( ) {
  return (
    <div className="px-[4.5rem]  flex flex-wrap gap-9">
    <FeatureCard
      icon={<LuClipboardEdit />}
      title={"Édition Intuitive"}
      description={
        "Profitez d'une interface conviviale pour modifier facilement les éléments de votre formulaire. Tout le monde peut rapidement créer un formulaire sans effort."
      }
    />
         <FeatureCard
        icon={<LuShare />}
        title={"Partager le Formulaire"}
        description={
          "Partagez facilement vos formulaires avec d'autres utilisateurs ou équipes. Grâce à nos options de partage intégrées, vous pouvez envoyer un lien direct ou générer un code QR, facilitant ainsi la collaboration et la collecte de données."
        }
      />
    <FeatureCard
      icon={<TbFileTypeHtml />}
      title={"Support de Multiples Types de Champs"}
      description={
        "Intégrez une variété de champs dans vos formulaires, y compris du texte, des emails, des nombres, des dates, des heures, des sélections multiples, des boutons radio, des cases à cocher, et des téléchargements de fichiers."
      }
    />
    <FeatureCard
      icon={<IoSave />}
      title={"Sauvegarde et Récupération Intelligente"}
      description={
        "Vos formulaires sont automatiquement sauvegardés en local et dans la base de données, vous permettant de les récupérer, modifier et gérer à tout moment."
      }
    />
    <FeatureCard
      icon={<BiCustomize />}
      title={"Personnalisation Complète du Formulaire"}
      description={
        "Personnalisez chaque aspect de votre formulaire, des couleurs aux polices, en passant par les styles, afin de l'adapter parfaitement à vos besoins spécifiques."
      }
    />

    <FeatureCard
      icon={<PiExportBold />}
      title={"Exportation Multi-Format"}
      description={
        "Exportez facilement le code de vos formulaires en formats compatibles avec React et Flutter, vous permettant de les intégrer rapidement dans vos projets sans effort supplémentaire."
      }
    />
  </div>
  );
}



function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex transform    flex-col  w-[400px] py-[20px] px-[25px] justify-between items-center gap-4 border-[1px] 
    shadow-sm border-gray-200 rounded-[16px] "
    >
      <div className="flex flex-row justify-start text-buttonColor w-full items-center  gap-4">
        <span className=" text-2xl font-bold">{icon}</span>{" "}
        <div className="  font-bold  text-md text-buttonColor uppercase">
          {title}
        </div>
      </div>
      <div className="font-title w-full h-full text-md text-wrap flex items-center  text-justify  justify-start">{description}</div>
    </div>
  );
}
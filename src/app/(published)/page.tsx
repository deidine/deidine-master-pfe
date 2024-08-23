"use client";

import { CiSaveDown1 } from "react-icons/ci";
import FeatureCard from "@/components/homePage/featureCard";
import Hero from "@/components/homePage/Hero";
import GiveTry from "@/components/homePage/GiveTry";
import UnderLine from "@/components/homePage/UnderLine";
import Footer from "@/components/homePage/Footer";
 
export default function Home() {
  return (
    <>
    <div className="p-10"> 
      <div className="flex flex-row justify-between items-center gap-4">
        <Hero />
    
      </div> 
      <UnderLine title="Fonctionnalités Principales"/>

<div className="p-2 flex flex-wrap gap-9">
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Édition Intuitive"}
    description={
      "Profitez d'une interface conviviale pour modifier facilement les éléments de votre formulaire. Tout le monde peut rapidement créer un formulaire sans effort."
    }
  />
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Glisser-Déposer"}
    description={
      "Concevez vos formulaires en utilisant une fonctionnalité de glisser-déposer fluide. Ajoutez ou réorganisez les champs selon vos besoins en toute simplicité."
    }
  />
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Support de Multiples Types de Champs"}
    description={
      "Intégrez une variété de champs dans vos formulaires, y compris du texte, des emails, des nombres, des dates, des heures, des sélections multiples, des boutons radio, des cases à cocher, et des téléchargements de fichiers."
    }
  />
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Sauvegarde et Récupération Intelligente"}
    description={
      "Vos formulaires sont automatiquement sauvegardés en local et dans la base de données, vous permettant de les récupérer, modifier et gérer à tout moment."
    }
  />
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Personnalisation Complète du Formulaire"}
    description={
      "Personnalisez chaque aspect de votre formulaire, des couleurs aux polices, en passant par les styles, afin de l'adapter parfaitement à vos besoins spécifiques."
    }
  />
 
  <FeatureCard
    icon={<CiSaveDown1 />}
    title={"Exportation Multi-Format"}
    description={
      "Exportez facilement le code de vos formulaires en formats compatibles avec React et Flutter, vous permettant de les intégrer rapidement dans vos projets sans effort supplémentaire."
    }
  />
</div>

        <UnderLine title="Essayez-le vous-même"/>

      <GiveTry/>
    </div>
      <div><Footer/></div></>
  );
}

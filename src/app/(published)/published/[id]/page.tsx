'use client';

import PreviewPublished from "@/components/forms/previews/PreviewPublished";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import React, { useState, useEffect, useCallback } from "react"; 
export default function PublierPageFormulaire({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [formulaire, setFormulaire] = useState<Form | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [soumis, setSoumis] = useState(false);
  const { id } = params;

  const recupererFormulaire = useCallback(async () => { 
    try {
      const reponse = await fetch(`/api/forms/${id}`);
      if (!reponse.ok) {
        throw new Error("La réponse du réseau n'était pas correcte");
      }
      const data = await reponse.json();
      setFormulaire(data.form);
      console.log("Formulaire récupéré :", data.form);
    } catch (error) {
      console.error("Erreur lors de la récupération du formulaire :", error);
    } finally {
      setChargement(false);
    }
  }, [id]);

  useEffect(() => {
    recupererFormulaire();
  }, [recupererFormulaire]);

  const mapValuesToLabels = (values: Record<string, any>, form: Form) => {
    const mappedValues: Record<string, any> = {};
    
    form.content.forEach((element) => {
      const { name, label } = element.elementType;
      if (values.hasOwnProperty(name)) {
        mappedValues[label] = values[name];
      }
    });
    
    return mappedValues;
  };

  const terminer = async (valeurs: Record<string, any>) => {
    if (!formulaire) return;

    // Map the values to use labels instead of random field names
    const mappedValues = mapValuesToLabels(valeurs, formulaire);
    console.log("Formulaire soumis avec labels:", mappedValues);

    try {
      const reponse = await fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_id: id,
          submission_data: mappedValues, // Using the mapped values with labels
        }),
      });

      if (!reponse.ok) {
        throw new Error('Échec de la soumission du formulaire');
      }

      const resultat = await reponse.json();
      if (resultat.success) {
        setSoumis(true);
        console.log("Soumission du formulaire réussie");
      } else {
        throw new Error('La soumission du formulaire a échoué');
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  if (chargement) {
    return <div><FormSkeleton/></div>;
  }

  if (!formulaire) {
    return <div>Formulaire non trouvé</div>;
  }

  return (
    <div className="flex justify-center items-center w-full my-auto h-full">
      {soumis ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Merci pour votre soumission !</h2>
          <p>Votre formulaire a été soumis avec succès.</p>
        </div>
      ) : (
        <PreviewPublished form={formulaire} onFinish={terminer} />
      )}
    </div>
  );
}


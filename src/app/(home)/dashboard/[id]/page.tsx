'use client'

import { useEffect, useState } from 'react';
import { createClientBrowser } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sidebar } from "@/components/ui/sidebar"; 
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { redirect } from 'next/navigation';
import { exportToExcel, exportToPDF } from '@/utils/utils_export-utils';
import { Button } from 'antd';
 
interface SoumissionFormulaire {
  id: number;
  form_id: number;
  user_id: string;
  submission_data: {
    [key: string]: string | string[];
  };
  created_at: string;
}

export default function TableauDeBord({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const [soumissions, setSoumissions] = useState<SoumissionFormulaire[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const supabase = createClientBrowser();

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          setIsAuthenticated(false);
          redirect('/auth/login'); // Redirect to login page
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        setIsAuthenticated(false);
      }
    }
    
    checkAuth();
  }, [supabase.auth]);

  useEffect(() => {
    if (isAuthenticated) {
      recupererSoumissions(id);
    }
  }, [id, isAuthenticated]);

  async function recupererSoumissions(formId: string) {
    setChargement(true);
    setErreur(null);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Aucun utilisateur trouvé');

      const reponse = await fetch(`/api/form-submission?form_id=${formId}`);
      if (!reponse.ok) {
        const errorData = await reponse.json();
        throw new Error(errorData.error || 'Échec de la récupération des soumissions');
      }
      
      const { submissions } = await reponse.json();
      setSoumissions(submissions);
    } catch (error) {
      console.error("Erreur lors de la récupération des soumissions:", error);
      setErreur('Échec du chargement des soumissions. Veuillez réessayer plus tard.');
    } finally {
      setChargement(false);
    }
  }

  const handleExportPDF = () => {
    exportToPDF(soumissions);
  };

  const handleExportExcel = () => {
    exportToExcel(soumissions);
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, this will never render because of the redirect
  // But we keep it as a fallback
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2">Accès non autorisé</h2>
            <p>Veuillez vous connecter pour accéder à cette page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="pl-64">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Soumissions de Formulaires</h1>
            <p className="mt-2 text-gray-600">Voir et gérer les réponses des formulaires</p>
          </div>

          {chargement ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : erreur ? (
            <Card className="bg-red-50 border border-red-200">
              <CardContent className="p-6">
                <p className="text-red-600">{erreur}</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Soumissions pour le Formulaire ID: {id}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                
                    onClick={handleExportPDF}
                    disabled={soumissions.length === 0}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button
                     
                    onClick={handleExportExcel}
                    disabled={soumissions.length === 0}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {soumissions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Aucune soumission trouvée pour ce formulaire.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Données de Soumission</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {soumissions.map((soumission) => (
                        <TableRow key={soumission.id}>
                          <TableCell>#{soumission.id}</TableCell>
                          <TableCell className="whitespace-normal break-words max-w-md">
                            <ul className="space-y-1">
                              {Object.entries(soumission.submission_data).map(([key, value]) => (
                                <li key={key} className="text-sm">
                                  <span className="font-medium text-gray-900">{key}:</span>{' '}
                                  <span className="text-gray-600">
                                    {Array.isArray(value) ? value.join(', ') : value}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell>
                            {new Date(soumission.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}


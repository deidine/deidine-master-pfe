import { Home, FileText, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#6366F1] text-white">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/" 
                className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <Home className="w-5 h-5 mr-3" />
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                href="/forms" 
                className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <FileText className="w-5 h-5 mr-3" />
                Formulaires
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center px-4 py-2 w-full rounded-lg hover:bg-white/10">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}


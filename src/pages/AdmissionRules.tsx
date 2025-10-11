import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { FileText } from 'lucide-react';

const AdmissionRules = () => {
  const documents = [
    {
      title: 'Правила приема на обучение по образовательным программам среднего профессионального образования в ФГБОУ ВО РГУПС',
      url: 'https://ttgt.org/images/files/Postup/pravila_priema_spo_2025.pdf'
    },
    {
      title: 'Дополнения в Правила приема на обучение по образовательным программам среднего профессионального образования в ФГБОУ ВО РГУПС от 01.04.2025',
      url: 'https://ttgt.org/images/files/Postup/dopolneniia_pp_spo_2025.pdf'
    },
    {
      title: 'Условия приёма на обучение по договорам об оказании платных образовательных услуг по программам среднего профессионального образования',
      url: 'https://ttgt.org/images/files/Postup/Documenty/usloviia_priema_platno_2025.pdf'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Правила приема</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                {/* Hero image */}
                <div className="w-full aspect-[16/6] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden shadow-lg mb-8">
                  <img
                    src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
                    alt="Правила приема"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Нормативные документы</h2>
                  
                  <div className="space-y-6">
                    {documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start space-x-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                      >
                        <FileText className="w-6 h-6 text-primary group-hover:text-primary-hover transition-colors flex-shrink-0 mt-1" />
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors leading-relaxed text-lg">
                          {doc.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <aside className="w-80 bg-white border-l border-border p-6 sticky top-16 h-screen overflow-y-auto">
          <SidebarCards />
        </aside>
      </div>
    </div>
  );
};

export default AdmissionRules;
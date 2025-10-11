import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { ExternalLink } from 'lucide-react';

const Memo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Памятка</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-bold text-primary mb-6 text-center">О ПРАВИЛАХ ПОВЕДЕНИЯ И МЕРАХ БЕЗОПАСНОСТИ НА ВОДОЕМАХ В ЗИМНИЙ ПЕРИОД</h2>
                  
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      Министерство образования, науки и Молодежной политики Краснодарского края напоминает, что согласно пункту 14 Порядка обучающиеся СПО имеют право сдавать ЕГЭ, в том числе при наличии у них действующих результатов ЕГЭ прошлых лет.
                    </p>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <div className="space-y-3">
                        <a
                          href="#"
                          className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover font-medium transition-colors"
                        >
                          <span>Подробнее</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        
                        <a
                          href="#"
                          className="block text-primary hover:text-primary-hover font-medium transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span>Места регистрации на сдачу ЕГЭ</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </a>
                      </div>
                    </div>
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

export default Memo;
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { Card } from '@/components/ui/card';

const Accreditation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            {/* Info Blocks */}
            <InfoBlocks />
            
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Аккредитация</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Документ об аккредитации №1</h2>
                  <div 
                    className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open('https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg', '_blank')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg" 
                      alt="Документ об аккредитации №1"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Документ об аккредитации №2</h2>
                  <div 
                    className="aspect-[3/4] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open('https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg', '_blank')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg" 
                      alt="Документ об аккредитации №2"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Документ об аккредитации №3</h2>
                  <div 
                    className="aspect-[3/4] bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open('https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg', '_blank')}
                  >
                    <img 
                      src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg" 
                      alt="Документ об аккредитации №3"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">QR-код для проверки</h2>
                  <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div 
                        className="w-48 h-48 bg-white rounded-lg shadow-lg border border-border overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 mb-4"
                        onClick={() => window.open('https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg', '_blank')}
                      >
                        <img 
                          src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" 
                          alt="QR-код для проверки"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground max-w-xs">
                        <p className="font-semibold mb-2">Как скачать выписку из ГИС «Реестр организаций, осуществляющих образовательную деятельность по имеющим государственную аккредитацию образовательным программам»</p>
                        <ol className="text-left space-y-1">
                          <li>1. Отсканируйте код или перейдите на сайт «Сведения о выбранном свидетельстве» (размещена общая информация о свидетельстве об аккредитации.</li>
                          <li>2. Находим раздел «Скачать реестровую выписку».</li>
                          <li>3. Загружаем файл Реестровая выписка.zip</li>
                          <li>4. Открываем архивный документ и распечатываем реестровую выписку.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">О государственной аккредитации</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-foreground leading-relaxed">
                    Государственная аккредитация образовательной деятельности проводится по основным образовательным программам, 
                    реализуемым в соответствии с федеральными государственными образовательными стандартами.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Свидетельство о государственной аккредитации подтверждает соответствие качества подготовки обучающихся 
                    и выпускников требованиям федеральных государственных образовательных стандартов.
                  </p>
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

export default Accreditation;
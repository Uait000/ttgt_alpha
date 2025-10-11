import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';

const InternalRules = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Правила внутреннего распорядка</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-8">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-6">I. Студентам техникума запрещено:</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">1.</span>
                      <p className="text-foreground">Пропускать и опаздывать на занятия без уважительной причины.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">2.</span>
                      <p className="text-foreground">Употреблять спиртные напитки, наркотические и токсические средства.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">3.</span>
                      <p className="text-foreground">Курить в помещениях техникума и на его территории.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">4.</span>
                      <p className="text-foreground">Употреблять нецензурные выражения.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">5.</span>
                      <p className="text-foreground">Портить оборудование и имущество техникума.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">6.</span>
                      <p className="text-foreground">Употреблять жевательные резинки в помещении.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">7.</span>
                      <p className="text-foreground">Пользоваться переносными радиоприемниками, магнитофонами (плеерами) и сотовыми телефонами во время учебных занятий.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-green-600 mb-6">II. Студенты техникума обязаны:</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-600 font-bold">•</span>
                      <p className="text-foreground">Соблюдать частоту и порядок в помещениях и на территории техникума</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-600 font-bold">•</span>
                      <p className="text-foreground">Приходить на занятия, имея опрятный внешний вид и одежду, соответствующую учебному заведению (не допускается наличие головного убора в помещениях, одежды спортивного или пляжного стиля, в том числе шорты, спортивные брюки, пляжные тапочки и т.п.).</p>
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

export default InternalRules;
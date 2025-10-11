import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { ExternalLink } from 'lucide-react';

const NOKO = () => {
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
              <h1 className="text-3xl font-bold text-primary mb-4 text-center">НОКО</h1>
              <p className="text-center text-muted-foreground mb-8">Независимая оценка качества образования</p>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-foreground leading-relaxed mb-6">
                      Обучающиеся и их законные представители просьба пройти опрос о качестве осуществления образовательной деятельности ТТЖТ - филиала РГУПС по адресу 
                      <a 
                        href="https://a28476.webask.io/qpfrhskge" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover font-semibold ml-1"
                      >
                        https://a28476.webask.io/qpfrhskge
                      </a>. Опрос можно пройти только с одного устройства!
                    </p>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-4">Инструкция по прохождению опроса:</h3>
                      <ol className="space-y-2 text-foreground text-sm">
                        <li>1. В анкете выбрать категорию участника, нажать Далее</li>
                        <li>2. Подтвердить, что Вам больше 14 лет, нажать Далее</li>
                        <li>3. Выберите регион Краснодарский край, нажмите Далее</li>
                        <li>4. Выберите Тихорецкий техникум железнодорожного транспорта - филиал ФГБОУ ВО "Ростовский государственный университет путей сообщения"</li>
                        <li>5. Далее отвечаете на вопросы</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* PDF документы */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-6 text-center">Документы</h3>
                  <div className="space-y-4">
                    <a
                      href="#"
                      className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">📄</div>
                          <span className="text-foreground font-medium">Положение о проведении внутренней независимой оценки качества образования в ТТЖТ - филиале РГУПС</span>
                        </div>
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                    </a>

                    <a
                      href="#"
                      className="block p-4 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">📄</div>
                          <span className="text-foreground font-medium">Отчет о результатах самообследования</span>
                        </div>
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Видео ролик */}
                <div className="bg-white rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-primary mb-4">Дополнительные материалы</h3>
                  <p className="text-foreground">Ролик о проведении независимой оценки качества условий осуществления образовательной деятельности организациями</p>
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

export default NOKO;
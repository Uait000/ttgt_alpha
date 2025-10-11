import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { FileText } from 'lucide-react';

const RussiaBelarusConference = () => {
  const documents2025 = [
    {
      title: 'Положение о проведении V Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Программа работы V Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Список подавших документы для участия в V Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Протокол заседания экспертной комиссии участников очного этапа V Всероссийской студенческой конференции с международным участием "Россия и Беларусь – вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне (27-28 марта 2025 г.)',
      url: '#'
    },
    {
      title: 'Протокол итогового заседания экспертной комиссии. Результаты V Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвящённой Победе советского народа в Великой Отечественной войне (27-28 марта 2025 г.)',
      url: '#'
    },
    {
      title: 'Материалы V Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    }
  ];

  const documents2024 = [
    {
      title: 'Положение о проведении IV Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Список подавших документы для участия в IV Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Программа работы IV Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Протокол заседания экспертной комиссии участников очного этапа IV Всероссийской студенческой конференции с международным участием «Россия и Беларусь - вехи общей истории», посвящённой Победе советского народа в Великой Отечественной войне (28-29 марта 2024 г.)',
      url: '#'
    },
    {
      title: 'Протокол итогового заседания экспертной комиссии. Результаты IV Всероссийской студенческой конференции с международным участием «Россия и Беларусь - вехи общей истории», посвящённой Победе советского народа в Великой Отечественной войне (28-29 марта 2024 г.)',
      url: '#'
    },
    {
      title: 'Материалы IV Всероссийской студенческой конференции с международным участием "Россия и Беларусь - вехи общей истории", посвященной Победе советского народа в Великой Отечественной войне',
      url: '#'
    }
  ];

  const documents2023 = [
    {
      title: 'Положение о проведении III межрегиональной студенческой конференции с международным участием «Россия и Беларусь - вехи общей истории», посвящённой Победе советского народа в Великой Отечественной войне',
      url: '#'
    },
    {
      title: 'Программа конференции',
      url: '#'
    },
    {
      title: 'Список подавших документы для участия',
      url: '#'
    },
    {
      title: 'Протокол итогового заседания экспертной комиссии оценивания участников очного этапа с применением дистанционных технологий',
      url: '#'
    },
    {
      title: 'Список победителей, призёров и соискателей III межрегиональной студенческой конференции',
      url: '#'
    },
    {
      title: 'Сборник тезисов работ участников III межрегиональной студенческой конференции с международным участием «Россия и Беларусь – вехи общей истории»',
      url: '#'
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Россия и Беларусь - вехи общей истории</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                {/* Hero image */}
                <div className="w-full aspect-[16/6] bg-gradient-to-br from-red-100 to-red-200 rounded-lg overflow-hidden shadow-lg mb-8">
                  <img
                    src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
                    alt="Россия и Беларусь - вехи общей истории"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-8">
                  {/* 2025 год */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-red-600 mb-6 border-b border-red-200 pb-3">2025 год:</h2>
                    <div className="space-y-4">
                      {documents2025.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                        >
                          <FileText className="w-5 h-5 text-red-600 group-hover:text-red-700 transition-colors flex-shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium group-hover:text-red-700 transition-colors leading-relaxed">
                            {doc.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 2024 год */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b border-blue-200 pb-3">2024 год:</h2>
                    <div className="space-y-4">
                      {documents2024.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                        >
                          <FileText className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors flex-shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium group-hover:text-blue-700 transition-colors leading-relaxed">
                            {doc.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 2023 год */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-green-600 mb-6 border-b border-green-200 pb-3">2023 год:</h2>
                    <div className="space-y-4">
                      {documents2023.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                        >
                          <FileText className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors flex-shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium group-hover:text-green-700 transition-colors leading-relaxed">
                            {doc.title}
                          </span>
                        </a>
                      ))}
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

export default RussiaBelarusConference;
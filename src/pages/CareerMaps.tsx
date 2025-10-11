import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { FileText } from 'lucide-react';

const CareerMaps = () => {
  const careerMaps = [
    {
      title: 'Строительство и эксплуатация зданий и сооружений',
      url: 'https://ttgt.org/images/files/KarernKarty/08.02.01.pdf'
    },
    {
      title: 'Строительство железных дорог, путь и путевое хозяйство',
      url: 'https://ttgt.org/images/files/KarernKarty/08.02.10.pdf'
    },
    {
      title: 'Компьютерные системы и комплексы',
      url: 'https://ttgt.org/images/files/KarernKarty/09.02.01.pdf'
    },
    {
      title: 'Техническая эксплуатация транспортного радиоэлектронного оборудования (по видам транспорта)',
      url: 'https://ttgt.org/images/files/KarernKarty/11.02.06.pdf'
    },
    {
      title: 'Электроснабжение',
      url: 'https://ttgt.org/images/files/KarernKarty/13.02.07.pdf'
    },
    {
      title: 'Сварочное производство',
      url: 'https://ttgt.org/images/files/KarernKarty/22.02.06.pdf'
    },
    {
      title: 'Организация перевозок и управление на транспорте (по видам)',
      url: 'https://ttgt.org/images/files/KarernKarty/23.02.01.pdf'
    },
    {
      title: 'Техническая эксплуатация подъемно-транспортных, строительных, дорожных машин и оборудования (по отраслям)',
      url: 'https://ttgt.org/images/files/KarernKarty/23.02.04.pdf'
    },
    {
      title: 'Техническая эксплуатация подвижного состава железных дорог (электроподвижной состав)',
      url: 'https://ttgt.org/images/files/KarernKarty/23.02.06.01.pdf'
    },
    {
      title: 'Техническая эксплуатация подвижного состава железных дорог (вагоны)',
      url: 'https://ttgt.org/images/files/KarernKarty/23.02.06.03.pdf'
    },
    {
      title: 'Автоматика и телемеханика на транспорте (железнодорожном транспорте)',
      url: 'https://ttgt.org/images/files/KarernKarty/27.02.03.pdf'
    },
    {
      title: 'Экономика и бухгалтерский учет (по отраслям)',
      url: 'https://ttgt.org/images/files/KarernKarty/38.02.01.pdf'
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Карьерные карты</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                {/* Hero image */}
                <div className="w-full aspect-[16/6] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden shadow-lg mb-8">
                  <img
                    src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
                    alt="Карьерные карты"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Карьерные карты по специальностям</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {careerMaps.map((map, index) => (
                      <a
                        key={index}
                        href={map.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start space-x-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                      >
                        <FileText className="w-6 h-6 text-primary group-hover:text-primary-hover transition-colors flex-shrink-0 mt-1" />
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors leading-relaxed">
                          {map.title}
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

export default CareerMaps;
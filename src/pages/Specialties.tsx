import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';

const Specialties = () => {
  const specialties = [
    {
      name: 'Строительство и эксплуатация зданий и сооружений',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Строительство железных дорог, путь и путевое хозяйство',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 3 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Компьютерные системы и комплексы',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Техническая эксплуатация транспортного радиоэлектронного оборудования (по видам транспорта)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Электроснабжение',
      duration: 'Очная форма обучения: 2 года 10 месяцев на базе основного общего образования; 1 год 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Сварочное производство',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Организация перевозок и управление на транспорте (по видам)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Техническая эксплуатация подъемно-транспортных, строительных, дорожных машин и оборудования (по отраслям)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Техническая эксплуатация подвижного состава железных дорог (электроподвижной состав)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Техническая эксплуатация подвижного состава железных дорог (вагоны)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Строительство железных дорог, путь и путевое хозяйство',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 3 года 10 месяцев на базе среднего общего образования.'
    },
    {
      name: 'Автоматика и телемеханика на транспорте (железнодорожном транспорте)',
      duration: 'Очная форма обучения: 3 года 10 месяцев на базе основного общего образования; 2 года 10 месяцев на базе среднего общего образования.'
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Специальности обучения</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border border-primary/20 rounded-lg">
                      <thead className="bg-primary/10">
                        <tr>
                          <th className="border border-primary/20 p-4 text-left font-semibold text-primary w-1/2">Специальности</th>
                          <th className="border border-primary/20 p-4 text-left font-semibold text-primary w-1/2">Форма обучения, срок обучения</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specialties.map((specialty, index) => (
                          <tr key={index} className="hover:bg-primary/5 transition-colors">
                            <td className="border border-primary/20 p-4 font-medium text-foreground">
                              {specialty.name}
                            </td>
                            <td className="border border-primary/20 p-4 text-foreground">
                              {specialty.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Specialties;
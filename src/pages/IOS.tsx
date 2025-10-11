import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { ExternalLink } from 'lucide-react';

const IOS = () => {
  const resources = [
    {
      id: 1,
      title: 'Договор на оказание услуг по доступу к сети Интернет на 2025 г.',
      url: '#',
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Положение об электронной информационно-образовательной среде ТТЖТ - филиала РГУПС',
      url: '#',
      type: 'pdf'
    },
    {
      id: 3,
      title: 'Изменения в Положение об электронной информационно-образовательной среде ТТЖТ - филиала РГУПС',
      url: '#',
      type: 'pdf'
    },
    {
      id: 4,
      title: 'Электронная библиотека УМЦ ЖДТ',
      url: 'http://umczdt.ru/books/',
      type: 'link'
    },
    {
      id: 5,
      title: 'Электронно-библиотечная система Лань',
      url: 'https://e.lanbook.com',
      type: 'link'
    },
    {
      id: 6,
      title: 'Электронно-библиотечная система IPR SMART',
      url: 'http://www.iprbookshop.ru/',
      type: 'link'
    },
    {
      id: 7,
      title: 'Образовательная платформа Юрайт',
      url: 'https://urait.ru/',
      type: 'link'
    },
    {
      id: 8,
      title: 'Электронный архив и база данных СМИ для развития бизнеса Public.ru',
      url: 'https://rgups.public.ru/',
      type: 'link'
    },
    {
      id: 9,
      title: 'Национальная электронная библиотека',
      url: 'https://rusneb.ru/',
      type: 'link'
    },
    {
      id: 10,
      title: 'Электронно-образовательная среда ТТЖТ',
      url: 'http://tihtgt.ru/',
      type: 'link'
    },
    {
      id: 11,
      title: '"Сетевой город.Образование". Модуль ПОО',
      url: 'https://spo.rso23.ru',
      type: 'link'
    },
    {
      id: 12,
      title: 'ФГИС "Моя школа"',
      url: 'https://myschool.edu.ru',
      type: 'link'
    },
    {
      id: 13,
      title: 'Дистанционные образовательные технологии в ТТЖТ',
      url: 'http://дистанционное24.рф',
      type: 'link'
    },
    {
      id: 14,
      title: 'информационно-коммуникативная образовательная платформа «Сферум»',
      url: 'http://sferum.ru/',
      type: 'link'
    }
  ];

  const specialties = [
    '08.02.01 Строительство и эксплуатация зданий и сооружений',
    '09.02.01 Компьютерные системы и комплексы',
    '11.02.06 Техническая эксплуатация транспортного радиоэлектронного оборудования (по видам транспорта)',
    '13.02.07 Электроснабжение',
    '15.02.19 Сварочное производство',
    '23.02.01 Организация перевозок и управление на транспорте (по видам)',
    '23.02.04 Техническая эксплуатация подъемно-транспортных, строительных, дорожных машин и оборудования (по отраслям)',
    '23.02.06 Техническая эксплуатация подвижного состава железных дорог (электроподвижной состав)',
    '23.02.06 Техническая эксплуатация подвижного состава железных дорог (вагоны)',
    '23.02.08 Строительство железных дорог, путь и путевое хозяйство',
    '27.02.03 Автоматика и телемеханика на транспорте (железнодорожном транспорте)',
    '38.02.01 Экономика и бухгалтерский учет (по отраслям)'
  ];

  const federalResources = [
    { title: 'Министерства науки и высшего образования Российской Федерации', url: '#' },
    { title: 'Министерство просвещения Российской Федерации', url: '#' },
    { title: 'Федеральная служба по надзору в сфере образования и науки', url: '#' },
    { title: 'Федеральный портал «Российское образование»', url: '#' },
    { title: 'Информационная система «Единое окно доступа к образовательным ресурсам»', url: '#' },
    { title: 'Федеральный центр информационно-образовательных ресурсов', url: '#' },
    { title: 'Единая коллекция цифровых образовательных ресурсов', url: '#' }
  ];

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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Электронная ИОС</h1>
              <p className="text-center text-muted-foreground mb-8">Электронная информационно-образовательная среда</p>
              
              <div className="space-y-8">
                {/* Наличие доступа к сети Интернет */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Наличие доступа к сети Интернет в ТТЖТ - филиале РГУПС:</h2>
                  <a
                    href="#"
                    className="inline-flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  >
                    <span>Договор на оказание услуг по доступу к сети Интернет на 2025 г.</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Локальный нормативный правовой акт */}
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Локальный нормативный правовой акт об электронной информационно-образовательной среде:</h2>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Положение об электронной информационно-образовательной среде ТТЖТ - филиала РГУПС</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                    <a
                      href="#"
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>Изменения в Положение об электронной информационно-образовательной среде ТТЖТ - филиала РГУПС</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Доступ к цифровым электронным библиотекам */}
                <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к цифровым электронным библиотекам:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.slice(3, 9).map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-3 bg-white rounded-lg border border-border hover:shadow-md"
                      >
                        <span className="text-sm">{resource.title}</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Доступ к электронным образовательным ресурсам */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к электронным образовательным ресурсам и (или) профессиональным базам данных:</h2>
                  <a
                    href="http://tihtgt.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-foreground hover:text-primary transition-colors mb-6"
                  >
                    <span>Электронно-образовательная среда ТТЖТ</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {specialties.map((specialty, index) => (
                      <div key={index} className="text-sm text-foreground bg-white rounded-lg p-3 border border-border">
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Доступ к электронной системе учета */}
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к электронной системе учета обучающихся, учета и хранения их образовательных результатов</h2>
                  <div className="space-y-2">
                    <a
                      href="https://spo.rso23.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>"Сетевой город.Образование". Модуль ПОО</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                    <a
                      href="https://myschool.edu.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-foreground hover:text-primary transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>ФГИС "Моя школа"</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Доступ к дистанционным образовательным технологиям */}
                <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к дистанционным образовательным технологиям:</h2>
                  <a
                    href="http://дистанционное24.рф"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  >
                    <span>Дистанционные образовательные технологии в ТТЖТ</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Взаимодействие педагогических работников с обучающимися */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Взаимодействие педагогических работников с обучающимися (личные кабинеты обучающихся и преподавателей):</h2>
                  <a
                    href="http://sferum.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                  >
                    <span>информационно-коммуникативная образовательная платформа «Сферум»</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Доступ к учебным планам */}
                <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к учебным планам, рабочим программам учебных дисциплин (модулей), практик</h2>
                  <h2 className="text-xl font-semibold text-primary mb-4">Доступ к расписанию занятий, заменам</h2>
                </div>

                {/* Перечень электронных ресурсов */}
                <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Перечень электронных ресурсов, к которым обеспечивается доступ обучающихся</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {federalResources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors p-3 bg-white rounded-lg border border-border hover:shadow-md"
                      >
                        <span className="text-sm">{resource.title}</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
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

export default IOS;
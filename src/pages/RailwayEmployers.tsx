import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { FileText } from 'lucide-react';

const RailwayEmployers = () => {
  const employers = [
    {
      title: 'АО «Газстройпром» приглашает не просто работу, а настоящее приключение с крутым заработком.',
      url: '#',
      type: 'Подробнее'
    },
    {
      title: 'Филиал ПАО "Россети" - Кубанское предприятие магистральных электрических сетей (Кубанское ПМЭС) приглашает на практику и трудоустройство молодых специалистов',
      url: '#',
      type: 'Вакансии',
      additionalUrl: '#',
      additionalType: 'Плакат'
    },
    {
      title: 'Федеральное государственное унитарное предприятие "Крымская железная дорога" для удовлетворения потребности в квалифицированных работниках со средним профессиональным образованием предлагает в 2025 году трудоустройство выпускников Тихорецкого техникума железнодорожного транспорта',
      url: '#',
      type: 'Подробнее'
    },
    {
      title: 'Екатеринбургский центр организации работы железнодорожных станций информирует студентов о престижной работе в организации',
      url: '#',
      type: 'Подробнее'
    },
    {
      title: 'Октябрьская дирекция инфраструктуры - структурное подразделение Центральной дирекции инфраструктуры - филиала ОАО «РЖД» приглашает для трудоустройства в Волховстроевскую дистанцию сигнализации, централизации и блокировки выпускников учебного заведения на следующие должности: электромонтер по обслуживанию и ремонту устройств сигнализации, централизации и блокировки; электромеханик.',
      url: '#',
      type: 'Подробнее'
    },
    {
      title: 'Компания ЭВ-Групп, ведущий строительный холдинг страны, специализирующийся на строительстве электростанций и других промышленных объектов рада предложить рабочие места для студентов.',
      url: '#',
      type: 'Вакансии',
      additionalUrl: '#',
      additionalType: 'Презентация компании'
    }
  ];

  // Остальные работодатели для краткости показаны как массив строк
  const additionalEmployers = [
    'В эксплуатационном локомотивном депо Исакогорка Северной дирекции тяги имеются вакансии помощника машиниста локомотива. Работникам предоставляется специализированное жилье ОАО «РЖД», а так же рассматривается вопрос о частичной компенсации жилья у стороннего собственника до 70 % от стоимости найма жилого помещения.',
    'Руководство Калининградской дирекции управления движением приглашает выпускников специальности "Организация перевозок и управление на железнодорожном транспорте" на железнодорожные станции дирекции, на имеющиеся вакансии: дежурные по железнодорожной станции, приемосдатчики груза и багажа, составители поездов.',
    'Обособленное подразделение «Тихорецкая» ООО «Милорем-Сервис» приглашает выпускников Тихорецкого техникума железнодорожного транспорта на работу по профессиям: слесарь по ремонту подвижного состава, слесарь по осмотру и ремонту локомотивов на пунктах технического обслуживания, слесарь-электрик по ремонту электрооборудования, бригадир (освобожденный) предприятий железнодорожного транспорта, электрогазосварщик, дефектоскопист по магнитному и ультразвуковому контролю.',
    'Руководство Калининградской дирекции управления движением приглашает на работу выпускников специальности "Организация перевозок и управление на железнодорожном транспорте"',
    'Руководство Забайкальской дирекции тяги структурного подразделения Дирекции тяги - филиала ОАО "РЖД" приглашает выпускников на работу в Забайкальском крае и Амурской области на должность - помощник машиниста электровоза, тепловоза'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Взаимодействие с профильными работодателями железнодорожного транспорта</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                {/* Hero images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg"
                      alt="Партнерство с работодателями 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[16/10] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
                      alt="Партнерство с работодателями 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Основные работодатели */}
                  {employers.map((employer, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start space-x-4 mb-4">
                        <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground leading-relaxed">{employer.title}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={employer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <span>{employer.type}</span>
                          <FileText className="w-4 h-4" />
                        </a>
                        {employer.additionalUrl && (
                          <a
                            href={employer.additionalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <span>{employer.additionalType}</span>
                            <FileText className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Дополнительные работодатели */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-6">Дополнительные предложения о трудоустройстве</h3>
                    <div className="space-y-4">
                      {additionalEmployers.map((employer, index) => (
                        <div key={index} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-start space-x-4 mb-3">
                            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <p className="text-foreground leading-relaxed text-sm">{employer}</p>
                          </div>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-accent hover:bg-accent/80 text-accent-foreground px-3 py-1 rounded-lg font-medium transition-colors text-sm"
                          >
                            <span>Подробнее</span>
                            <FileText className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Специальные предложения */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-6">Специальные предложения</h3>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-yellow-700 mb-3">Дальневосточная дирекция тяги</h4>
                      <p className="text-foreground text-sm leading-relaxed mb-4">
                        Предлагаем трудоустройство в одно из структурных подразделений Дальневосточной дирекции тяги - эксплуатационное локомотивное депо: Облучье, Хабаровск-2, Ружино (г.Лесозаводск), Уссурийск, Смоляниново, Комсомольск-на-Амуре, Советская Гавань, Тында, Новый Ургал, Партизанск, Южно-Сахалинск.
                      </p>
                      <div className="space-y-2 text-sm text-foreground">
                        <p><strong>Заработная плата:</strong> помощник машиниста локомотива от 100 тыс.рублей, машинист локомотива от 150 тыс.рублей.</p>
                        <p><strong>Северная надбавка:</strong> к заработной плате (от 30 до 50%) с первого дня работы.</p>
                        <p><strong>Гарантируем:</strong> компенсацию понесенных расходов при переезде (билетов, провоз домашних вещей контейнером), выплату подъемных в размере тарифной ставки за месяц на работника, 1/4 часть на членов семьи.</p>
                        <p><strong>Предоставляем:</strong> Специализированный жилищный фонд или компенсацию найма жилья. Возможность компенсации авиаперелета 1 раз в год для проведения отпуска на курортах юга России и обратно, дополнительно для работников, работающих в районах Крайнего Севера 1 раз в 2 года в любой город РФ (до 49 тыс. руб на взрослого в одну сторону, до 18 тыс. руб на ребенка в одну сторону). Участие в корпоративных проектах и индивидуальный подход к карьерному росту.</p>
                      </div>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-4"
                      >
                        <span>Подробнее</span>
                        <FileText className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-6 rounded-lg">
                      <h4 className="font-bold text-purple-700 mb-3">Линейный отдел полиции на станции Тихорецкая</h4>
                      <p className="text-foreground text-sm leading-relaxed mb-4">
                        Осуществляет набор на службу в органы внутренних дел, на должности младшего начальствующего состава, граждан Российской Федерации, от 18 до 35 лет, имеющие образование не ниже среднего.
                      </p>
                      <p className="text-foreground text-sm mb-4">
                        <strong>Денежное довольствие:</strong> сотрудников младшего начальствующего состава около 25 000 рублей.
                      </p>
                      <div className="space-y-1 text-sm text-foreground">
                        <p><strong>Обращаться по адресу:</strong> г. Тихорецк, ул. Октябрьская 1. г. Кропоткин, ул. Железнодорожная 48 а.</p>
                        <p><strong>Контактные телефоны:</strong> 8-86138-9-20-14, 8-999-437-39-81, 8-961-584-50-79</p>
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

export default RailwayEmployers;
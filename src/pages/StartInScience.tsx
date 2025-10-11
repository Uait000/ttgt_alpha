import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { ExternalLink, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const StartInScience = () => {
  const documents2025 = [
    { name: 'Положение о проведении VIII региональной студенческой исследовательской конференции (с международным участием) посвящённой Десятилетию науки и технологий в Российской Федерации «Старт в науку»', url: '/science/2025/polozhenie.pdf' },
    { name: 'Список подавших документы для участия в VIII региональной студенческой исследовательской конференции (с международным участием) посвященной десятилетию науки и технологий в Российской Федерации "СТАРТ В НАУКУ"', url: '/science/2025/spisok-uchastnikov.pdf' },
    { name: 'Программа работы конференции 10 апреля 2025 г.', url: '/science/2025/programma-10-aprelya.pdf' },
    { name: 'Программа работы конференции 11 апреля 2025 г.', url: '/science/2025/programma-11-aprelya.pdf' },
    { name: 'Итоговый протокол (результаты) оценивания участников', url: '/science/2025/itogi.pdf' }
  ];

  const documents2024 = [
    { name: 'ВНИМАНИЕ! Конференция переносится на 8 - 9 апреля 2024 года', url: '/science/2024/vnimanie.pdf', isAlert: true },
    { name: 'Положение о проведении VII региональной студенческой исследовательской конференции (с международным участием) посвящённой Десятилетию науки и технологий в Российской Федерации «Старт в науку»', url: '/science/2024/polozhenie.pdf' },
    { name: 'Список подавших документы для участия', url: '/science/2024/spisok-uchastnikov.pdf' },
    { name: 'Программа работы конференции 8 апреля 2024 г.', url: '/science/2024/programma-8-aprelya.pdf' },
    { name: 'Программа работы конференции 9 апреля 2024 г.', url: '/science/2024/programma-9-aprelya.pdf' },
    { name: 'ИТОГОВЫЙ ПРОТОКОЛ (РЕЗУЛЬТАТЫ) оценивания участников', url: '/science/2024/itogi.pdf' },
    { name: 'ИТОГОВЫЕ ПРОТОКОЛЫ оценивания участников', url: '/science/2024/itogi-protokoly.pdf' },
    { name: 'Материалы VII региональной студенческой исследовательской конференции (с международным участием) посвящённой Десятилетию науки и технологий в Российской Федерации «СТАРТ В НАУКУ»', url: '/science/2024/materialy.pdf' }
  ];

  const documents2023Main = [
    { name: 'Положение о проведении VI региональной студенческой исследовательской конференции (с международным участием) посвящённой Десятилетию науки и технологий в Российской Федерации «Старт в науку»', url: '/science/2023/polozhenie.pdf' },
    { name: 'СПИСОК ПОДАВШИХ ДОКУМЕНТЫ ДЛЯ УЧАСТИЯ', url: '/science/2023/spisok-uchastnikov.pdf' },
    { name: 'Программа работы конференции', url: '/science/2023/programma.pdf' }
  ];

  const nominations2023 = [
    {
      name: 'Система управления качеством, повышение производительности труда и экономической эффективности железнодорожного трансорта. Интеллектуальные системы управления',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom1-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom1-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom1-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom1-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom1-final.pdf'
    },
    {
      name: 'Научно-популярный туризм (развитие туристической индустрии/внутренний туризм',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom2-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom2-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom2-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom2-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom2-final.pdf'
    },
    {
      name: 'Повышение престижа рабочих профессий. Техническое творчество в образовательном процессе',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom3-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom3-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom3-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom3-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom3-final.pdf'
    },
    {
      name: 'Повышение надежности работы и увеличение эксплуатационного ресурса технических средств железнодорожного транспорта',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom4-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom4-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom4-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom4-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom4-final.pdf'
    },
    {
      name: 'Безопасность и охрана окружающей среды на железнодорожном транспорте, на объектах транспортной инфраструктуры и при выполнении работ',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom5-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom5-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom5-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom5-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom5-final.pdf'
    },
    {
      name: 'История науки и технологий. Научные юбилеи',
      experts: [
        { name: 'член Экспертного совета В.Н. Власова', url: '/science/2023/protocols/nom6-vlasova.pdf' },
        { name: 'член Экспертного совета С.А. Вялов', url: '/science/2023/protocols/nom6-vyalov.pdf' },
        { name: 'член Экспертного совета Т.А. Коробейников', url: '/science/2023/protocols/nom6-korobeynikov.pdf' },
        { name: 'член Экспертного совета В.И. Лещинская', url: '/science/2023/protocols/nom6-leshchinskaya.pdf' }
      ],
      finalUrl: '/science/2023/finals/nom6-final.pdf'
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
              <h1 className="text-3xl font-bold text-primary mb-4 text-center">
                Региональная студенческая исследовательская конференция "Старт в науку"
              </h1>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-8">
                <p className="text-center text-foreground leading-relaxed">
                  Ежегодная региональная студенческая исследовательская конференция (с международным участием), посвящённая Десятилетию науки и технологий в Российской Федерации
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {/* 2025 год */}
                <AccordionItem value="year-2025" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h2 className="text-2xl font-bold text-primary">2025 год</h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      {documents2025.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="text-foreground font-medium text-sm">{doc.name}</span>
                            </div>
                            <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 ml-3" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 2024 год */}
                <AccordionItem value="year-2024" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h2 className="text-2xl font-bold text-primary">2024 год</h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      {documents2024.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block p-4 rounded-lg border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${
                            doc.isAlert
                              ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                              : 'bg-gradient-to-r from-secondary/5 to-accent/5 border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <FileText className={`w-5 h-5 flex-shrink-0 ${doc.isAlert ? 'text-red-600' : 'text-primary'}`} />
                              <span className={`font-medium text-sm ${doc.isAlert ? 'text-red-800' : 'text-foreground'}`}>
                                {doc.name}
                              </span>
                            </div>
                            <ExternalLink className={`w-5 h-5 flex-shrink-0 ml-3 ${doc.isAlert ? 'text-red-600' : 'text-primary'}`} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* 2023 год */}
                <AccordionItem value="year-2023" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <h2 className="text-2xl font-bold text-primary">2023 год</h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      {/* Основные документы */}
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Основные документы</h3>
                        <div className="space-y-3">
                          {documents2023Main.map((doc, index) => (
                            <a
                              key={index}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                  <span className="text-foreground font-medium text-sm">{doc.name}</span>
                                </div>
                                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 ml-3" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Протоколы оценивания по номинациям */}
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Протоколы оценивания участников</h3>
                        <div className="space-y-4">
                          {nominations2023.map((nomination, nomIndex) => (
                            <div key={nomIndex} className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-5 border border-border">
                              <h4 className="font-semibold text-foreground mb-3 text-sm">{nomination.name}</h4>
                              <div className="space-y-2 mb-3">
                                {nomination.experts.map((expert, expertIndex) => (
                                  <a
                                    key={expertIndex}
                                    href={expert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 pl-4 bg-white rounded border border-border hover:shadow-md hover:border-primary/50 transition-all duration-200"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-foreground text-sm">{expert.name}</span>
                                      <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                                    </div>
                                  </a>
                                ))}
                              </div>
                              <a
                                href={nomination.finalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 bg-primary/10 rounded border border-primary/30 hover:bg-primary/20 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-primary font-medium text-sm">Итоговый протокол</span>
                                  <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

export default StartInScience;

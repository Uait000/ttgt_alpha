import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { ExternalLink } from 'lucide-react';

const StateExam = () => {
  const programs = [
    { name: 'Автоматика и телемеханика на транспорте (железнодорожном транспорте)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_27_02_03.pdf' },
    { name: 'Компьютерные системы и комплексы', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_09_02_01.pdf' },
    { name: 'Организация перевозок и управление на транспорте (по видам)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_23_02_01.pdf' },
    { name: 'Сварочное производство', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_15_02_19.pdf' },
    { name: 'Строительство железных дорог, путь и путевое хозяйство', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_23_02_08.pdf' },
    { name: 'Строительство и эксплуатация зданий и сооружений', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_08_02_01.pdf' },
    { name: 'Техническая эксплуатация подъемно-транспортных , строительных , дорожных машин и оборудования (по отраслям)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_23_02_04.pdf' },
    { name: 'Техническая эксплуатация подвижного состава железных дорог (электроподвижной состав)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_23_02_06_01.pdf' },
    { name: 'Техническая эксплуатация подвижного состава железных дорог (вагоны)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_23_02_06_03.pdf' },
    { name: 'Техническая эксплуатация транспортного радиоэлектронного оборудования (по видам траснпорта)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_11_02_06.pdf' },
    { name: 'Экономика и бухгалтерский учет (по отраслям)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_38_02_01.pdf' },
    { name: 'Электроснабжение', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/GIA_13_02_07.pdf' }
  ];

  const methodicalRecommendations = [
    { name: 'Методические рекомендации (указания) по оформлению дипломных проектов (работ)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Ukaz_Oforml_KP_DP_07.04.2021.pdf' },
    { name: 'Методические указания по оформлению курсового и дипломного проекта (работ) (Н.А. Рашевская)', url: '/gia/metodicheskie-rashevskaya.pdf' },
    { name: 'Методические рекомендации к выполнению экономической части дипломной работы для студентов специальности 08.02.10 (Т.Г. Кочеткова)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Rek_Ekonomika_DR_080210_Kochetkova_11012021.pdf' },
    { name: 'Методические рекомендации по оформлению дипломного проекта для студентов специальности 08.02.10 (Т.Г. Кочеткова)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Ukaz_Oforml_DP_080210_Kochetkova_12032021.pdf' },
    { name: 'Методические рекомендации по дипломному проектированию по теме: Организация и технология строительства новой железной дороги (С.В. Малыхина)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Ukaz_Oforml_DP_080210_Org_i_Tehn_stroit_now_gd_Malyhina_12032021.pdf' },
    { name: 'Методические рекомендации по дипломному проектированию по теме: Проектирование участка новой железнодорожной линии (С.В. Малыхина)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Ukaz_Oforml_DP_080210_Proektir_uchastka_now_gd_linii_Malyhina_12032021.pdf' },
    { name: 'Методические указания по дипломному проектированию для специальности 08.02.10 (А.Н. Орищенко)', url: 'https://ttgt.org/images/raspisanie/Pr_GIA/Metod_Ukaz_Oforml_DP_080210_Orishhenko_12032021.pdf' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">ГИА</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-8">
                {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */}
                {/* Оборачиваем весь блок в тег `<a>` */}
                <a
                  href="https://ttgt.org/images/raspisanie/Pr_GIA/Grafik_GIA_2025.pdf" // <-- ЗАМЕНИТЕ НА ВАШУ ССЫЛКУ НА PDF
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-6 border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-primary mb-0 text-center">
                    График проведения государственной итоговой аттестации выпускников ТТЖТ - филиала РГУПС с 15.06.2025 г. по 28.06.2025
                  </h2>
                </a>

                {/* Программы ГИА */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-6 text-center">Программы государственной итоговой аттестации</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.map((program, index) => (
                      <a
                        key={index}
                        href={program.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                      >
                        <p className="text-foreground text-sm font-medium">{program.name}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Методические рекомендации */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-6 text-center">Методические рекомендации (указания) по оформлению дипломных проектов (работ)</h2>
                  <div className="space-y-4">
                    {methodicalRecommendations.map((recommendation, index) => (
                      <a
                        key={index}
                        href={recommendation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">📄</div>
                            <span className="text-foreground font-medium text-sm">{recommendation.name}</span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                        </div>
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

export default StateExam;
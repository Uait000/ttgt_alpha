import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { ExternalLink, CalendarDays, FileText, BookOpen } from 'lucide-react';

// --- Импорт файлов GIA ---
import gia08_02_01 from '@/assets/file/gia/GIA_08_02_01.pdf';
import gia09_02_01 from '@/assets/file/gia/GIA_09_02_01.pdf';
import gia11_02_06 from '@/assets/file/gia/GIA_11_02_06.pdf';
import gia13_02_07 from '@/assets/file/gia/GIA_13_02_07.pdf';
import gia15_02_19 from '@/assets/file/gia/GIA_15_02_19.pdf';
import gia23_02_01 from '@/assets/file/gia/GIA_23_02_01.pdf';
import gia23_02_04 from '@/assets/file/gia/GIA_23_02_04.pdf';
import gia23_02_06_01 from '@/assets/file/gia/GIA_23_02_06_01.pdf';
import gia23_02_06_03 from '@/assets/file/gia/GIA_23_02_06_03.pdf';
import gia23_02_08 from '@/assets/file/gia/GIA_23_02_08.pdf';
import gia27_02_03 from '@/assets/file/gia/GIA_27_02_03.pdf';
import gia38_02_01 from '@/assets/file/gia/GIA_38_02_01.pdf';

// --- Импорт методических рекомендаций ---
import metodRekEkonomika from '@/assets/file/gia/Metod_Rek_Ekonomika_DR_080210_Kochetkova_11012021.pdf';
import metodUkazOformlDP080210Kochetkova from '@/assets/file/gia/Metod_Ukaz_Oforml_DP_080210_Kochetkova_12032021.pdf';
import metodUkazOformlDP080210OrgTehnStroit from '@/assets/file/gia/Metod_Ukaz_Oforml_DP_080210_Org_i_Tehn_stroit_now_gd_Malyhina_12032021.pdf';
import metodUkazOformlDP080210Orishhenko from '@/assets/file/gia/Metod_Ukaz_Oforml_DP_080210_Orishhenko_12032021.pdf';
import metodUkazOformlDP080210Proektir from '@/assets/file/gia/Metod_Ukaz_Oforml_DP_080210_Proektir_uchastka_now_gd_linii_Malyhina_12032021.pdf';
import metodUkazOformlKPDP from '@/assets/file/gia/Metod_Ukaz_Oforml_KP_DP_07.04.2021.pdf';
import metodrek from '@/assets/file/gia/Metod_Rek_Ekonomika_DR_080210_Kochetkova_11012021.pdf';

const StateExam = () => {
  const programs = [
    { name: 'Автоматика и телемеханика на транспорте (железнодорожном транспорте)', url: gia27_02_03 },
    { name: 'Компьютерные системы и комплексы', url: gia09_02_01 },
    { name: 'Организация перевозок и управление на транспорте (по видам)', url: gia23_02_01 },
    { name: 'Сварочное производство', url: gia15_02_19 },
    { name: 'Строительство железных дорог, путь и путевое хозяйство', url: gia23_02_08 },
    { name: 'Строительство и эксплуатация зданий и сооружений', url: gia08_02_01 },
    { name: 'Техническая эксплуатация подъемно-транспортных , строительных , дорожных машин и оборудования (по отраслям)', url: gia23_02_04 },
    { name: 'Техническая эксплуатация подвижного состава железных дорог (электроподвижной состав)', url: gia23_02_06_01 },
    { name: 'Техническая эксплуатация подвижного состава железных дорог (вагоны)', url: gia23_02_06_03 },
    { name: 'Техническая эксплуатация транспортного радиоэлектронного оборудования (по видам траснпорта)', url: gia11_02_06 },
    { name: 'Экономика и бухгалтерский учет (по отраслям)', url: gia38_02_01 },
    { name: 'Электроснабжение', url: gia13_02_07 }
  ];

  const methodicalRecommendations = [
    { name: 'Методические рекомендации (указания) по оформлению дипломных проектов (работ)', url: metodUkazOformlKPDP },
    { name: 'Методические указания по оформлению курсового и дипломного проекта (работ) (Н.А. Рашевская)', url: metodrek },
    { name: 'Методические рекомендации к выполнению экономической части дипломной работы для студентов специальности 08.02.10 (Т.Г. Кочеткова)', url: metodRekEkonomika },
    { name: 'Методические рекомендации по оформлению дипломного проекта для студентов специальности 08.02.10 (Т.Г. Кочеткова)', url: metodUkazOformlDP080210Kochetkova },
    { name: 'Методические рекомендации по дипломному проектированию по теме: Организация и технология строительства новой железной дороги (С.В. Малыхина)', url: metodUkazOformlDP080210OrgTehnStroit },
    { name: 'Методические рекомендации по дипломному проектированию по теме: Проектирование участка новой железнодорожной линии (С.В. Малыхина)', url: metodUkazOformlDP080210Proektir },
    { name: 'Методические указания по дипломному проектированию для специальности 08.02.10 (А.Н. Орищенко)', url: metodUkazOformlDP080210Orishhenko }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
     

        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-border/80 p-6 md:p-10 transition-all duration-300">
              
              {/* --- Заголовок --- */}
              <div className="flex items-center justify-center mb-10">
                <span className="text-5xl mr-4">🎓</span>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Государственная Итоговая Аттестация
                </h1>
              </div>
              
              {/* --- Контейнер с контентом --- */}
              <div className="bg-gradient-to-tl from-primary/5 via-white to-secondary/5 rounded-xl border border-border/50 p-6 md:p-8 space-y-10 shadow-inner">
                
                {/* --- График --- */}
                <a
                  href="https://ttgt.org/images/raspisanie/Pr_GIA/Grafik_GIA_2025.pdf" // <-- Оставляю внешнюю ссылку, т.к. файла нет в assets
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="w-10 h-10 mr-5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium opacity-80 mb-1">ГЛАВНЫЙ ДОКУМЕНТ</div>
                        <h2 className="text-xl font-bold text-white mb-0">
                          График проведения ГИА с 15.06.2025 г. по 28.06.2025
                        </h2>
                      </div>
                    </div>
                    <ExternalLink className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>

                {/* --- Программы ГИА --- */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-border/50">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center">
                    <BookOpen className="w-7 h-7 mr-3" />
                    Программы государственной итоговой аттестации
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.map((program, index) => (
                      <a
                        key={index}
                        href={program.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-background/50 rounded-lg p-4 border border-border/70 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <FileText className="w-5 h-5 mr-3 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                        <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">
                          {program.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* --- Методические рекомендации --- */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-border/50">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                    Методические рекомендации
                  </h2>
                  <div className="space-y-3">
                    {methodicalRecommendations.map((recommendation, index) => (
                      <a
                        key={index}
                        href={recommendation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 bg-background/50 rounded-lg border border-border/70 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 pr-4">
                            <FileText className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                            <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                              {recommendation.name}
                            </span>
                          </div>
                          <ExternalLink className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0" />
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
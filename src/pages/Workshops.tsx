import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const Workshops = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { id: 1, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_442.jpg', alt: 'Мастерские 1' },
    { id: 2, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_443.jpg', alt: 'Мастерские 2' },
    { id: 3, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_444.jpg', alt: 'Мастерские 3' },
    { id: 4, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_445.jpg', alt: 'Мастерские 4' },
    { id: 5, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_446.jpg', alt: 'Мастерские 5' },
    { id: 6, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_447.jpg', alt: 'Мастерские 6' },
    { id: 7, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_448.jpg', alt: 'Мастерские 7' },
    { id: 8, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_449.jpg', alt: 'Мастерские 8' },
    { id: 9, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_450.jpg', alt: 'Мастерские 9' },
    { id: 10, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_451.jpg', alt: 'Мастерские 10' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Мастерские</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                {/* Карусель изображений */}
                <div className="relative max-w-4xl mx-auto mb-8">
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={images[currentSlide].src}
                      alt={images[currentSlide].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Стрелки навигации */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </button>

                  {/* Индикаторы */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide
                            ? 'bg-primary scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Основной текст */}
                <div className="bg-white rounded-lg p-8 space-y-6">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-foreground leading-relaxed mb-6">
                      Учебно-производственные мастерские являются учебной базой Тихорецкого техникума железнодорожного транспорта – филиала РГУПС, обеспечивающей формирование у обучающихся умений, а также приобретения первоначального практического опыта в процессе производственного труда.
                    </p>

                    <p className="text-foreground leading-relaxed mb-6">
                      Производственная деятельность учебных мастерских во многом зависит от материально-технической базы, оснащенности оборудованием, обеспеченности материалами и инструментом. Все цеха и лаборатории мастерских оснащены современным оборудованием, инструментом и программным обеспечением, необходимым для выполнения практических работ.
                    </p>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <h3 className="font-semibold text-primary mb-4">Учебно-производственные мастерские включают в себя цеха и лаборатории:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-foreground text-sm">
                          <li>• Слесарные. Слесарно-механические. Слесарно-монтажные;</li>
                          <li>• Механообрабатывающие. Токарные;</li>
                          <li>• Цифровая передача информации;</li>
                          <li>• Сварочные. Сварочная;</li>
                          <li>• Газосварочные;</li>
                          <li>• Электросварочные;</li>
                        </ul>
                        <ul className="space-y-2 text-foreground text-sm">
                          <li>• Технические средства информации дистанционных обучающих технологий. Информационных технологий в профессиональной деятельности.</li>
                          <li>• Каменных работ. Штукатурных и облицовочных работ. Малярных работ. Испытания строительных материалов и конструкций.</li>
                          <li>• Лаборатория неразрушающего контроля рельсов, машин механизмов. Ремонтно- строительных работ.</li>
                          <li>• Электромонтажные. Монтажа электронных устройств. Монтажа устройств систем СЦБ и ЖАТ. Монтажа и регулировки устройств связи.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
                      <p className="text-foreground leading-relaxed">
                        Здание учебно-производственных мастерских адаптировано для инвалидов и лиц с ограниченными возможностями здоровья.
                      </p>
                    </div>

                    {/* Кнопка для скачивания графика */}
                    <div className="text-center">
                      <a
                        href="https://ttgt.org/images/files/grafik_UPM_25_26.pdf"
                        className="inline-flex items-center space-x-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <FileText className="w-5 h-5" />
                        <span>График учебной практики по видам специальности на 2025-2026 учебный год</span>
                      </a>
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

export default Workshops;
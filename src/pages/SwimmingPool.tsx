import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SwimmingPool = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bottomCarouselSlide, setBottomCarouselSlide] = useState(0);

  const images = [
    { id: 1, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_321.jpg', alt: 'Бассейн 1' },
    { id: 2, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_322.jpg', alt: 'Бассейн 2' },
    { id: 3, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_323.jpg', alt: 'Бассейн 3' },
    { id: 4, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_324.jpg', alt: 'Бассейн 4' },
    { id: 5, src: 'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_325.jpg', alt: 'Бассейн 5' },
    { id: 6, src: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg', alt: 'Бассейн 6' },
    { id: 7, src: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg', alt: 'Бассейн 7' },
    { id: 8, src: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg', alt: 'Бассейн 8' },
    { id: 9, src: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg', alt: 'Бассейн 9' },
    { id: 10, src: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg', alt: 'Бассейн 10' }
  ];

  const bottomImages = [
    { id: 1, src: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg', alt: 'Дополнительное фото 1' },
    { id: 2, src: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg', alt: 'Дополнительное фото 2' },
    { id: 3, src: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg', alt: 'Дополнительное фото 3' },
    { id: 4, src: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg', alt: 'Дополнительное фото 4' },
    { id: 5, src: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg', alt: 'Дополнительное фото 5' },
    { id: 6, src: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg', alt: 'Дополнительное фото 6' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextBottomSlide = () => {
    setBottomCarouselSlide((prev) => (prev + 1) % bottomImages.length);
  };

  const prevBottomSlide = () => {
    setBottomCarouselSlide((prev) => (prev - 1 + bottomImages.length) % bottomImages.length);
  };

  // НОВЫЙ КОД: Массив объектов с ссылками (url)
  const pdfDocuments = [
    {
      title: 'Приказ "Об установлении стоимости физкультурно-оздоровительных услуг плавательного бассенйа с 01.01.2025 г.',
      // ВНИМАНИЕ: Замените '/path/to/...' на реальный путь к вашему файлу!
      url: 'https://ttgt.org/images/files/basseyn/Prikaz_Stoim_01012025.pdf' 
    },
    {
      title: 'Приказ "Об установлении стоимости услуг по обучению спортивному плаванию и первичным навыкам плавания" с 06.07.2024 года',
      url: 'https://ttgt.org/images/files/Prikaz_Stoim_05072024.pdf'
    },
    {
      title: 'Правила пользования бассейном ТТЖТ - филиала РГУПС',
      url: 'https://ttgt.org/images/files/Pravila_polz_bass_30122021.pdf'
    },
    {
      title: 'Положение о плавательном бассейне ТТЖТ - филиала РГУПС',
      url: 'https://ttgt.org/images/files/Polog_bas_30122021.pdf'
    },
    {
      title: 'Расписание занятий с 01 августа по 31 августа 2025 года в плавательном бассейне ТТЖТ - филиале РГУПС (обучениепервичным навыкам плавания (72ч), по обучение спортивному плаванию (108ч), физкультурно-оздоровительное плавание)',
      url: 'https://ttgt.org/images/files/basseyn/RaspRab_Bass_august_2025.pdf'
    },
    {
      title: 'Расписание занятий с 01 сентября по 30 сентября 2025 года в плавательном бассейне ТТЖТ - филиале РГУПС (обучениепервичным навыкам плавания (72ч), по обучение спортивному плаванию (108ч), физкультурно-оздоровительное плавание)',
      url: 'https://ttgt.org/images/files/basseyn/RaspRab_Bass_sent_2025.pdf'
    }
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Бассейн</h1>
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8 space-y-8">
                {/* Карусель изображений */}
                <div className="relative max-w-4xl mx-auto">
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

                {/* Вводный текст */}
                <div className="bg-white rounded-lg p-6 text-center">
                  <p className="text-foreground leading-relaxed mb-4">
                    <strong>Заведующая бассейном Г.А. Лапова</strong>, Плавать рекомендуется с детства и до глубокой старости.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Во время плавания увеличивается объем легких, ускоряется процесс насыщения кислородом организма. Вода обладает массирующим и расслабляющим эффектом, что благотворно влияет на нервную систему. Люди, посещающие бассейн, меньше подвержены нервным расстройствам, бессонницам, реже болеют и дольше живут.
                  </p>
                  <p className="text-foreground leading-relaxed mb-4">
                    Возможность плавать в любое время года без ограничений по возрасту и состоянию здоровья – вот, что по-настоящему ценно!
                  </p>
                  <p className="text-primary text-xl font-bold">
                    Приглашаем всех желающих посетить бассейн Тихорецкого техникума железнодорожного транспорта!
                  </p>
                </div>

                {/* Таблица 1 - Групповые занятия для детей */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-bold text-primary mb-4 text-center">ПРЕЙСКУРАНТ ЦЕН</h2>
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">на оказание услуг по дополнительным общеобразовательным (общеразвивающим) программам:</h3>
                  <h4 className="text-md font-semibold text-foreground mb-4 text-center">ГРУППОВЫЕ ЗАНЯТИЯ ДЛЯ ДЕТЕЙ с 7 лет</h4>
                  
                  <Table className="mb-6">
                    <TableHeader>
                      <TableRow className="bg-primary/10 border-b-2 border-primary/20">
                        <TableHead className="font-bold text-primary border-r border-primary/20">Наименование услуги</TableHead>
                        <TableHead className="font-bold text-primary border-r border-primary/20">Количество занятий</TableHead>
                        <TableHead className="font-bold text-primary">Стоимость абонемента (руб.)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение спортивному плаванию</TableCell>
                        <TableCell className="border-r border-primary/10">4 (1 раз в неделю)</TableCell>
                        <TableCell>2000</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение первичным навыкам плавания</TableCell>
                        <TableCell className="border-r border-primary/10">4 (1 раз в неделю)</TableCell>
                        <TableCell>2000</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение спортивному плаванию</TableCell>
                        <TableCell className="border-r border-primary/10">8 (2 раза в неделю)</TableCell>
                        <TableCell>4000</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение первичным навыкам плавания</TableCell>
                        <TableCell className="border-r border-primary/10">8 (2 раза в неделю)</TableCell>
                        <TableCell>4000</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение спортивному плаванию</TableCell>
                        <TableCell className="border-r border-primary/10">12 (3 раза в неделю)</TableCell>
                        <TableCell>6000</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Обучение первичным навыкам плавания</TableCell>
                        <TableCell className="border-r border-primary/10">12 (3 раза в неделю)</TableCell>
                        <TableCell>6000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Преподаватели:</h4>
                    <ul className="text-foreground text-sm space-y-1">
                      <li>• Шароглазов Константин Леонидович (призер Чемпионата России на открытой воде, кандидат в мастера спорта по плаванию)</li>
                      <li>• Фастова Маргарита Витальевна (преподаватель физической культуры, отличник ГТО)</li>
                      <li>• Бердыч Светлана Александровна (преподаватель физической культуры, КМС по спортивному ориентированию)</li>
                    </ul>
                  </div>
                </div>

                {/* Таблица 2 - Для взрослых и детей старше 14 лет */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-bold text-primary mb-4 text-center">ПРЕЙСКУРАНТ ЦЕН</h2>
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">на оказание услуг по плаванию с 01.01.2025 г.</h3>
                  <h4 className="text-md font-semibold text-foreground mb-4 text-center">ДЛЯ ВЗРОСЛЫХ и ДЕТЕЙ старше 14 лет:</h4>
                  
                  <Table className="mb-6">
                    <TableHeader>
                      <TableRow className="bg-primary/10 border-b-2 border-primary/20">
                        <TableHead className="font-bold text-primary border-r border-primary/20">Наименование услуги</TableHead>
                        <TableHead className="font-bold text-primary border-r border-primary/20">Количество занятий</TableHead>
                        <TableHead className="font-bold text-primary">Стоимость услуги (руб.)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Разовое посещение</TableCell>
                        <TableCell className="border-r border-primary/10">1</TableCell>
                        <TableCell>450</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Абонемент</TableCell>
                        <TableCell className="border-r border-primary/10">4 в месяц</TableCell>
                        <TableCell>1 600</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Абонемент</TableCell>
                        <TableCell className="border-r border-primary/10">8 в месяц</TableCell>
                        <TableCell>3 200</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Преподаватели:</h4>
                    <ul className="text-foreground text-sm space-y-1">
                      <li>• Буров Андрей Викторович (преподаватель физической культуры, КМС по легкой атлетики, Чемпион России по легкой атлетике)</li>
                      <li>• Фастова Маргарита Витальевна (преподаватель физической культуры, отличник ГТО)</li>
                    </ul>
                  </div>
                </div>

                {/* Таблица 3 - Для работников и студентов */}
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-bold text-primary mb-4 text-center">ПРЕЙСКУРАНТ ЦЕН</h2>
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">на оказание услуг по плаванию с 01.01.2025 г.</h3>
                  <h4 className="text-md font-semibold text-foreground mb-4 text-center">ДЛЯ РАБОТНИКОВ И СТУДЕНТОВ ТТЖТ – филиала РГУПС:</h4>
                  
                  <Table className="mb-6">
                    <TableHeader>
                      <TableRow className="bg-primary/10 border-b-2 border-primary/20">
                        <TableHead className="font-bold text-primary border-r border-primary/20">Наименование услуги</TableHead>
                        <TableHead className="font-bold text-primary border-r border-primary/20">Количество занятий</TableHead>
                        <TableHead className="font-bold text-primary">Стоимость услуги (руб.)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Разовое посещение для работников техникума</TableCell>
                        <TableCell className="border-r border-primary/10">1</TableCell>
                        <TableCell>бесплатно</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Абонемент для работников техникума</TableCell>
                        <TableCell className="border-r border-primary/10">2 (в неделю)</TableCell>
                        <TableCell>1600/месяц</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-primary/5">
                        <TableCell className="border-r border-primary/10">Разовое посещение для студентов техникума (во внеурочное время)</TableCell>
                        <TableCell className="border-r border-primary/10">1</TableCell>
                        <TableCell>200</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* PDF документы */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-6 text-center">Документы для скачивания</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pdfDocuments.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">📄</div>
                          <span className="text-sm text-foreground font-medium">{doc.title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Информация о преподавателях */}
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-4 text-center">
                    <p className="text-foreground">Шароглазов Константин Леонидович (призер Чемпионата России на открытой воде, кандидат в мастера спорта по плаванию)</p>
                    <p className="text-foreground">Фастова Маргарита Витальевна (преподаватель физической культуры, отличник ГТО)</p>
                    <p className="text-foreground">Буров Андрей Викторович (преподаватель физической культуры, КМС по легкой атлетики, Чемпион России по легкой атлетике)</p>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mt-6">
                      <p className="text-foreground font-semibold">Подробности по телефону: (86196) 6-20-03, доб. 134</p>
                      <p className="text-muted-foreground text-sm mt-2">Реклама</p>
                    </div>
                  </div>
                </div>

                {/* Нижняя карусель */}
                <div className="relative max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold text-primary mb-4 text-center">Галерея</h3>
                  <div className="aspect-[16/10] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={bottomImages[bottomCarouselSlide].src}
                      alt={bottomImages[bottomCarouselSlide].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Стрелки навигации для нижней карусели */}
                  <button
                    onClick={prevBottomSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>
                  
                  <button
                    onClick={nextBottomSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </button>

                  {/* Индикаторы для нижней карусели */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {bottomImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setBottomCarouselSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === bottomCarouselSlide
                            ? 'bg-primary scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
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

export default SwimmingPool;
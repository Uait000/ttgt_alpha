import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Cafeteria = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { id: 1, src: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg', alt: 'Столовая 1' },
    { id: 2, src: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg', alt: 'Столовая 2' },
    { id: 3, src: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg', alt: 'Столовая 3' },
    { id: 4, src: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg', alt: 'Столовая 4' },
    { id: 5, src: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg', alt: 'Столовая 5' },
    { id: 6, src: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg', alt: 'Столовая 6' },
    { id: 7, src: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg', alt: 'Столовая 7' }
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Столовая</h1>
              
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
                    <p className="text-foreground leading-relaxed mb-6 text-lg">
                      Правильное питание – основа здоровья, а вкусная еда – залог хорошего настроения. Столовая Тихорецкого техникума железнодорожного транспорта предлагает обеды на выбор посетителей – широкий ассортимент первых горячих блюд, холодных закусок, мясных и рыбных изделий. Аппетитная выпечка порадует каждого, кто наведается в нашу просторную столовую. Меню ежедневно пополняется разнообразными блюдами. Возможность размещения посетителей - 150 посадочных мест.
                    </p>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <p className="text-foreground leading-relaxed">
                        Входные двери столовой предусмотрены для инвалидов и лиц с ограниченными возможностями здоровья. Над дверями имеются навесы. В столовой стоит стол для обслуживания инвалидов.
                      </p>
                    </div>

                    <div className="text-center bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
                      <p className="text-foreground leading-relaxed text-lg font-medium mb-4">
                        Столовая ТТЖТ – это уютная обстановка, доброжелательное отношение персонала, доступные цены и очень вкусные обеды!
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-foreground font-semibold">
                          Мы ждем Вас с 11.00 ч. до 16.00 ч. каждый день, кроме субботы и воскресенья.
                        </p>
                        <p className="text-primary text-xl font-bold">Приятного аппетита!</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6 text-center">
                      <p className="text-foreground font-semibold">
                        Телефон: 8 (86196) 6-20-03 доб. 146
                      </p>
                      <p className="text-foreground font-semibold">
                        Заведующая столовой: Филатова Марина Ивановна
                      </p>
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

export default Cafeteria;
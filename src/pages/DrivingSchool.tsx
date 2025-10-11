import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';
import { Card } from '@/components/ui/card';

const DrivingSchool = () => {
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Автошкола</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg" 
                      alt="Автодром"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg" 
                      alt="Учебные автомобили"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h2 className="text-xl font-semibold text-primary mb-4">О нашей автошколе</h2>
                    <p className="text-foreground leading-relaxed text-sm">
                      Автошкола по подготовке водителей транспортных средств категории «В» с механической и автоматической трансмиссией открыта на отделении дополнительного профессионального образования ТТЖТ - филиала РГУПС и работает на рынке образовательных услуг с октября 2010 года.
                    </p>
                  </Card>
                  
                  <Card className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5">
                    <h3 className="text-lg font-semibold text-primary mb-3">Стоимость обучения</h3>
                    <p className="text-2xl font-bold text-primary">60 000 рублей</p>
                    <p className="text-sm text-muted-foreground">с 1 сентября 2025 г.</p>
                  </Card>
                </div>
              </div>

              <div className="prose prose-gray max-w-none space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Цели обучения</h2>
                  <p className="text-foreground leading-relaxed">
                    Основная цель работы автошколы – обучение основам безопасного управления, практическая отработка наиболее важных элементов управления автомобилем, преодоление психологического барьера непонимания между действиями новичка-водителя и поведением автомобиля на дороге.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">Материально-техническая база</h3>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• 2 учебных класса с методическими материалами</li>
                      <li>• Компьютерный класс на 15 мест</li>
                      <li>• Автодром площадью 3 га</li>
                      <li>• Учебные автомобили с двойным управлением</li>
                      <li>• Современное оборудование и тренажеры</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">Автопарк</h3>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Шевролет-Авео</li>
                      <li>• Рено Логан</li>
                      <li>• Педали дополнительного управления</li>
                      <li>• Камеры видеонаблюдения</li>
                      <li>• Современное техническое оснащение</li>
                    </ul>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Преимущества обучения в нашей автошколе</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>✓ Качественная подготовка водителей категории «В»</li>
                      <li>✓ Поэтапная оплата за обучение</li>
                      <li>✓ Вечернее время обучения теории</li>
                      <li>✓ Индивидуальный график практического вождения</li>
                      <li>✓ Обучение с 08:00 до 17:00, включая выходные</li>
                    </ul>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>✓ Широкий выбор учебных автомобилей</li>
                      <li>✓ Свидетельство государственного образца</li>
                      <li>✓ Организованная сдача экзаменов в ГИБДД</li>
                      <li>✓ Сопровождение до получения прав</li>
                      <li>✓ Профессиональные инструкторы</li>
                    </ul>
                  </div>
                </div>

                <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h2 className="text-xl font-semibold text-primary mb-4">Контакты и запись</h2>
                  <div className="space-y-3 text-sm">
                    <p><strong>Адрес:</strong> ТТЖТ – филиал РГУПС, ул. Красноармейская, 57, каб. 116, 106а</p>
                    <p><strong>Телефон:</strong> 8(86196) 6-20-03, доб. 125, 135</p>
                    <p><strong>Мобильный:</strong> 89884728160</p>
                    <p><strong>Заведующий отделом:</strong> Токарев Максим Викторович</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-border/50">
                    <h3 className="font-semibold text-primary mb-2">Документы для зачисления:</h3>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• Паспорт</li>
                      <li>• Действующая медицинская справка</li>
                      <li>• Фотография 3×4 см (1 шт.)</li>
                    </ul>
                  </div>
                </Card>

                <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">До встречи в нашем техникуме!</h2>
                  <p className="text-foreground font-medium">
                    Уметь качественно управлять транспортным средством – нелегкая задача.<br/>
                    Так не лучше ли учиться этому у профессионалов?!
                  </p>
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

export default DrivingSchool;
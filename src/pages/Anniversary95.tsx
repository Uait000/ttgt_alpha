import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Anniversary95 = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlidePost1, setCurrentSlidePost1] = useState(0);
  const [currentSlidePost2, setCurrentSlidePost2] = useState(0);
  const [currentSlidePost3, setCurrentSlidePost3] = useState(0);
  const [currentSlidePost4, setCurrentSlidePost4] = useState(0);

  const post1Images = [
    'https://ttgt.org/images/phocagallery/thumbs/phoca_thumb_l_8603.jpg',
    '/anniversary/history-2.jpg',
    '/anniversary/history-3.jpg',
    '/anniversary/history-4.jpg',
    '/anniversary/history-5.jpg',
    '/anniversary/history-6.jpg'
  ];

  const post2Images = [
    '/anniversary/plotnikov-1.jpg',
    '/anniversary/plotnikov-2.jpg',
    '/anniversary/plotnikov-3.jpg',
    '/anniversary/plotnikov-4.jpg'
  ];

  const post3Images = [
    '/anniversary/butov-1.jpg',
    '/anniversary/butov-2.jpg',
    '/anniversary/butov-3.jpg',
    '/anniversary/butov-4.jpg',
    '/anniversary/butov-5.jpg',
    '/anniversary/butov-6.jpg'
  ];

  const post4Images = [
    '/anniversary/women-1.jpg',
    '/anniversary/women-2.jpg',
    '/anniversary/women-3.jpg',
    '/anniversary/women-4.jpg',
    '/anniversary/women-5.jpg',
    '/anniversary/women-6.jpg'
  ];

  const nextSlide = (postNumber: number) => {
    if (postNumber === 1) {
      setCurrentSlidePost1((prev) => (prev + 1) % post1Images.length);
    } else if (postNumber === 2) {
      setCurrentSlidePost2((prev) => (prev + 1) % post2Images.length);
    } else if (postNumber === 3) {
      setCurrentSlidePost3((prev) => (prev + 1) % post3Images.length);
    } else if (postNumber === 4) {
      setCurrentSlidePost4((prev) => (prev + 1) % post4Images.length);
    }
  };

  const prevSlide = (postNumber: number) => {
    if (postNumber === 1) {
      setCurrentSlidePost1((prev) => (prev - 1 + post1Images.length) % post1Images.length);
    } else if (postNumber === 2) {
      setCurrentSlidePost2((prev) => (prev - 1 + post2Images.length) % post2Images.length);
    } else if (postNumber === 3) {
      setCurrentSlidePost3((prev) => (prev - 1 + post3Images.length) % post3Images.length);
    } else if (postNumber === 4) {
      setCurrentSlidePost4((prev) => (prev - 1 + post4Images.length) % post4Images.length);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">95 лет Тихорецкому техникуму железнодорожного транспорта</h1>

              <div className="space-y-12">
                {/* Пост 1: Этапы нашей истории */}
                <article className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Этапы нашей истории</h2>

                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-4">
                      <p><strong>Автор:</strong> Воярж Е.В.</p>
                      <p><strong>Создано:</strong> 04 марта 2025</p>
                    </div>
                  </div>

                  <div className="relative max-w-4xl mx-auto mb-6">
                    <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                         onClick={() => setSelectedImage(post1Images[currentSlidePost1])}>
                      <img
                        src={post1Images[currentSlidePost1]}
                        alt="Этапы истории техникума"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <button
                      onClick={() => prevSlide(1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                    >
                      <ChevronLeft className="w-6 h-6 text-primary" />
                    </button>

                    <button
                      onClick={() => nextSlide(1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                    >
                      <ChevronRight className="w-6 h-6 text-primary" />
                    </button>

                    <div className="flex justify-center space-x-2 mt-4">
                      {post1Images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlidePost1(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentSlidePost1 ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="prose max-w-none text-foreground leading-relaxed">
                    <h3 className="text-lg font-semibold mb-3">ИЗ ВОСПОМИНАНИЙ ВИКТОРА ФЁДОРОВИЧА ИВАНОВА, ВЫПУСКНИКА 1933 ГОДА</h3>

                    <p className="mb-4">
                      В Экспозиционном центре техникума бережно хранятся документы и фотографии далёких 30-х годов, первых лет работы нашего техникума. Смотря на них, попадаешь в эпоху тех лет. Среди воспоминаний первых выпускников, есть и воспоминания В.Ф. Иванова.
                    </p>

                    <p className="mb-4">
                      Виктор Фёдорович Иванов поступил в наш техникум в 1933 году. К этому времени он окончил семь классов общеобразовательной школы № 35 имени Октябрьской революции (ныне это корпус №1 ТТЖТ-филиала РГУПС). И успешно сдав экзамены, был зачислен на специальность Техник – механик паровозного хозяйства. Иванов В.Ф. вспоминал: «… в октябре 1930 года в Тихорецке, на базе фабричного заводского училища, был открыт техникум для подготовки техников-механиков паровозного и вагонного хозяйства. Он располагался на углу улиц Красноармейской и Угольной. В одном здании шли занятия, в другом было общежитие для иногородних студентов».
                    </p>

                    <p className="mb-4">
                      Рассказывая о своих преподавателях, Виктор Фёдорович с теплом о них отзывался: «Нам студентам того времени, очень повезло с преподавателями. Это были замечательные люди, обладающие огромным запасом знаний, умевшие заинтересовать своих учеников, привить им чувство гордости за выбранную профессию и ответственность. Начальником Тихорецкого техникума был М.А. Сакварелидзе, опытный наставник молодёжи, прекрасный руководитель. Заместителем по учебной части был Всеволод Вишневский, который преподавал русский язык и литературу. Он привил любовь к этому предмету, за что мы ему благодарны. Преподаватель Аркадий Волошин доходчиво разъяснял нам законы физики, без знания которых невозможно создания машин и механизмов, в том числе и паровоза. Преподаватели учили нас разбираться в конструкции паровоза, ремонтировать его, правильно эксплуатировать. Все они были настоящими профессионалами в своём деле. И мы, выйдя в «большую жизнь», были благодарны им за всё, что они для нас сделали».
                    </p>

                    <div className="bg-white/50 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold mb-2">Фотографии из архива Экспоцентра ТТЖТ-филиала РГУПС:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>удостоверение Иванова В.Ф. «Почётный ветеран железнодорожного транспорта»</li>
                        <li>учащиеся Тихорецкого механического техникума, 1933 г.</li>
                        <li>здание Тихорецкого механического техникума</li>
                        <li>портреты Иванова В.Ф. разных лет</li>
                      </ul>
                    </div>
                  </div>
                </article>

                {/* Пост 2: Ими гордимся */}
                <article className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-border/50 p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Ими гордимся</h2>

                  {/* Блок 1: Плотников Василий Петрович */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-primary mb-4">Плотников Василий Петрович</h3>

                    <div className="mb-6">
                      <div className="text-sm text-muted-foreground mb-4">
                        <p><strong>Автор:</strong> Воярж Е.В.</p>
                        <p><strong>Создано:</strong> 05 мая 2025</p>
                      </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto mb-6">
                      <div className="aspect-[16/10] bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                           onClick={() => setSelectedImage(post2Images[currentSlidePost2])}>
                        <img
                          src={post2Images[currentSlidePost2]}
                          alt="Плотников Василий Петрович"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <button
                        onClick={() => prevSlide(2)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                      </button>

                      <button
                        onClick={() => nextSlide(2)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-primary" />
                      </button>

                      <div className="flex justify-center space-x-2 mt-4">
                        {post2Images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlidePost2(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentSlidePost2 ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="prose max-w-none text-foreground leading-relaxed">
                      <p className="mb-4">
                        Во время войны он воевал, а в мирное время 35 лет преподавал математику. Имя этого человека, воина и педагога - Плотников Василий Петрович.
                      </p>

                      <p className="mb-4">
                        Василий Плотников родился 27 марта 1919 года в ст. Фастовецкая Тихорецкого района Краснодарского края. В 1937 году окончил 10 классов средней школы №35 г. Тихорецка (ныне это 1-й корпус техникума). Затем поступил в Ростовский педагогический институт на физико-математический факультет и окончил его в суровом 1941 году. С августа 1941 года по направлению работал учителем математики и физики в Заветинском районе, Ростовской области.
                      </p>

                      <p className="mb-4">
                        В сентябре 1942 года Плотников В.П. был призван в армию, служил в восьмой отдельной лыжной бригаде третьего Украинского фронта. Участвовал в боях за освобождение г. Харькова, в феврале 1943 года был ранен и находился на излечении в госпитале. Василий Петрович в ходе ожесточённых боёв на передовой, горел, после чего остались шрамы на всю жизнь. Плотников В.П. награждён Орденом Отечественной войны II степени и многими медалями.
                      </p>

                      <p className="mb-4">
                        В мае 1946 года Плотников В.П. был демобилизован. В сентябре 1948 года поступил на работу в Тихорецкий техникум железнодорожного транспорта преподавателем математики. В газете Тихорецкого района «Ленинский путь» от 24 декабря 1976 года написано: «Более четверти века работает преподавателем математики в железнодорожном техникуме В.П. Плотников. За эти годы с его участием подготовлено для железнодорожного транспорта и промышленных предприятий около трёх тысяч молодых специалистов». Василий Петрович за работу в техникуме был награждён медалью «За трудовую доблесть», выдвигался на звание Заслуженного учителя РСФСР, о чём свидетельствует Выписка из протокола заседания педагогического совета ТТЖТ от 28 сентября 1967 года, находящаяся в личном деле. В сентябре 1983 года Плотников В.П. ушёл на заслуженный отдых и прожил до 2007 года.
                      </p>

                      <p className="mb-4">
                        Бывшие его воспитанники добрым словом вспоминают своего учителя. Так, годы студенчества Кустова И.В., ныне преподавателя техникума, выпали на 1980-1984 гг. Кустов И.В. поделился воспоминаниями: «Василий Петрович умел доносить знания до студента. Столько лет прошло, а я до сих пор помню формулы, уравнения, которые решали тогда на занятиях математики…».
                      </p>

                      <p>
                        Татарян Артур, студент 4-го курса, группы Р-4-1, правнук Плотникова В.П., хранит память о прадеде и гордится тем, что в техникуме многие знают и помнят Плотникова Василия Петровича.
                      </p>
                    </div>
                  </div>

                  {/* Блок 2: Бутов Николай Васильевич */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Бутов Николай Васильевич</h3>

                    <div className="mb-6">
                      <div className="text-sm text-muted-foreground mb-4">
                        <p><strong>Автор:</strong> Воярж Е.В.</p>
                        <p><strong>Создано:</strong> 05 мая 2025</p>
                      </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto mb-6">
                      <div className="aspect-[16/10] bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                           onClick={() => setSelectedImage(post3Images[currentSlidePost3])}>
                        <img
                          src={post3Images[currentSlidePost3]}
                          alt="Бутов Николай Васильевич"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <button
                        onClick={() => prevSlide(3)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                      </button>

                      <button
                        onClick={() => nextSlide(3)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-primary" />
                      </button>

                      <div className="flex justify-center space-x-2 mt-4">
                        {post3Images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlidePost3(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentSlidePost3 ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="prose max-w-none text-foreground leading-relaxed">
                      <p className="mb-4">
                        Жизненный путь Николая Васильевича Бутова - гордость Тихорецкого техникума железнодорожного транспорта, так как он всю свою жизнь был связан с нашим учебным заведением, и очень много сделал для него!
                      </p>

                      <p className="mb-4">
                        Родился Николай Бутов в 1916 году в г. Тихорецке. В 1933 году окончил Тихорецкое фабрично-заводское училище (ФЗУ), а в 1936 году ТТЖТ по специальности «Вагоны и вагонное хозяйство». По окончанию учёбы работал на заводе «Красный Молот». В 1939 году он поступил в РИИЖТ и со студенческой скамьи был призван в Советскую армию.
                      </p>

                      <p className="mb-4">
                        Всю войну прослужил в войсках НКВД (МВД), которые сопровождали эшелоны с военной техникой, боеприпасами, оружием на фронт. Характерной особенностью боевого использования войск НКВД являлось то, что они, как правило, вступали в бой в местах своей дислокации — там, где их заставала война. В последующем, переходя в подчинение общевойскового командования, они использовались по его усмотрению, а также по указаниям Наркомата внутренних дел СССР. Часто направлялись в те места, где вместе с частями Красной армии нужно было любой ценой задержать врага.
                      </p>

                      <p className="mb-4">
                        В 1946 году Николай Васильевич демобилизовался из армии и вернулся в РИИЖТ, который окончил в 1949 году. После окончания Ростовского института инженеров железнодорожного транспорта по путёвке Министерства путей сообщения и управления Северо-Кавказской железной дороги Бутов Н.В. был направлен на работу в Тихорецкий техникум железнодорожного транспорта. За годы работы занимал должности заведующего отделением, заместителя директора по учебно-воспитательной работе, с мая 1966 года по 1977 год – директор техникума.
                      </p>

                      <p className="mb-4">
                        Бутов Николай Васильевич был членом КПСС с июля 1941 года. С 1951 по 1966 гг. неоднократно избирался секретарём партийной организации техникума, член горкома КПСС, депутат городского Совета с 1967 по 1985 гг.
                      </p>

                      <p className="mb-4">
                        Николай Васильевич обладал организаторским способностям, под его руководством в 70-х годах осуществлена пристройка к основному корпусу 19-и аудиторий, актового и спортивного залов, построены учебные мастерские, студенческое пятиэтажное общежитие, сдан в эксплуатацию закрытый плавательный бассейн.
                      </p>

                      <p className="mb-4">
                        С июля 1977 года - перешёл на преподавательскую работу. Бутов Н.В., проработал в техникуме без перерыва 65 лет. Сколько выпускников с благодарностью и уважением вспоминают его, потому что он дал им знания, а главное, любовь к профессии железнодорожника!
                      </p>

                      <p>
                        За свои заслуги Бутов Николай Васильевич награждён орденом «Трудового Красного Знамени», знаком «Почётному железнодорожнику», медалями: «В ознаменование 100-летия со дня рождения В.И. Ленина»; «За оборону Кавказа»; «За победу над Германией в Великой Отечественной войне 1941-1945 гг.».
                      </p>
                    </div>
                  </div>

                  {/* Блок 3: Первый выпуск женщин-помощников машинистов */}
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-primary mb-4">В 1939 ГОДУ В НАШЕМ ТЕХНИКУМЕ СОСТОЯЛСЯ ПЕРВЫЙ ВЫПУСК ЖЕНЩИН-ПОМОЩНИКОВ МАШИНИСТОВ</h3>

                    <div className="mb-6">
                      <div className="text-sm text-muted-foreground mb-4">
                        <p><strong>Автор:</strong> Воярж Е.В.</p>
                        <p><strong>Создано:</strong> 04 марта 2025</p>
                      </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto mb-6">
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                           onClick={() => setSelectedImage(post4Images[currentSlidePost4])}>
                        <img
                          src={post4Images[currentSlidePost4]}
                          alt="Первый выпуск женщин-помощников машинистов"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <button
                        onClick={() => prevSlide(4)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-primary" />
                      </button>

                      <button
                        onClick={() => nextSlide(4)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-primary" />
                      </button>

                      <div className="flex justify-center space-x-2 mt-4">
                        {post4Images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlidePost4(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === currentSlidePost4 ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="prose max-w-none text-foreground leading-relaxed">
                      <p className="mb-4">
                        Тихорецкий техникум железнодорожного транспорта – филиал ФГБОУ ВО РГУПС был основан в октябре 1930 года. В то время техникум назывался - Тихорецкий механический техникум Азово-Черноморской железной дороги дирекции Народного комиссариата путей сообщения СССР.
                      </p>

                      <p className="mb-4">
                        В стране быстрыми темпами шла индустриализация, не хватало технических кадров среднего звена. В Советском Союзе развивалось стахановское движение и возникло массовое движение женщин по освоению мужских профессий. Женщины осваивали профессии машинистов паровозов, помощников машинистов, слесарей-ремонтников, связистов.
                      </p>

                      <p className="mb-4">
                        В годы Великой Отечественной войны многие женщины в Тихорецком паровозном депо, прошедшие обучение на курсах, заменили ушедших на фронт мужчин. Работали на паровозах машинистами и помощниками - Анна Подгорная, Вера Студеникина, З.Лялина, М.Трембач, О. Ганиенко.
                      </p>

                      <p className="mb-4">
                        На общем фото 1-го выпуска женщин помощников машинистов при Тихорецком механическом техникуме, сделанном 6 мая 1939 года, Анна Подгорная в первом ряду вторая справа.
                      </p>

                      <p>
                        Ветеран труда Тихорецкого локомотивного депо Анна Кузьминична Подгорная всю свою трудовую жизнь посвятила выбранной профессии, отмечена Государственными премиями и наградами.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-80 bg-white border-l border-border p-6 sticky top-16 h-screen overflow-y-auto">
          <SidebarCards />
        </aside>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0">
          <DialogTitle className="sr-only">Изображение</DialogTitle>
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Увеличенное изображение"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Anniversary95;

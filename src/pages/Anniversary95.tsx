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

    // --- История ---
    const post1Images = [
       
    ];

    // --- Плотников (Пост 2) ---
    const post2Images = [
       
    ];

    // --- Бутов (Пост 3) ---
    const post3Images = [
       
    ];

    // --- Женщины (Пост 4) ---
    const post4Images = [
       
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

    const renderPostContent = (postNumber: number, title: string, content: JSX.Element, author: string, date: string, images: string[], currentSlide: number) => {
        const hasMultipleSlides = images.length > 1;

        return (
            <article className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">{title}</h2>

                <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-4">
                        <p><strong>Автор:</strong> {author}</p>
                        <p><strong>Создано:</strong> {date}</p>
                    </div>
                </div>

                <div className="relative max-w-4xl mx-auto mb-6">
                    <div 
                        className={`w-full h-auto max-h-[600px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden shadow-lg cursor-pointer flex justify-center items-center`}
                        onClick={() => setSelectedImage(images[currentSlide])}
                    >
                        <img
                            src={images[currentSlide]}
                            alt={title}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {hasMultipleSlides && (
                        <>
                            <button
                                onClick={() => prevSlide(postNumber)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200 z-10"
                            >
                                <ChevronLeft className="w-6 h-6 text-primary" />
                            </button>

                            <button
                                onClick={() => nextSlide(postNumber)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-border rounded-full p-3 hover:shadow-lg transition-all duration-200 z-10"
                            >
                                <ChevronRight className="w-6 h-6 text-primary" />
                            </button>

                            <div className="flex justify-center space-x-2 mt-4">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (postNumber === 1) setCurrentSlidePost1(index);
                                            else if (postNumber === 2) setCurrentSlidePost2(index);
                                            else if (postNumber === 3) setCurrentSlidePost3(index);
                                            else if (postNumber === 4) setCurrentSlidePost4(index);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                            index === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="prose max-w-none text-foreground leading-relaxed">
                    {content}
                </div>
            </article>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 min-h-screen">
                    <div className="container mx-auto px-6 py-8">
                        <div className="bg-white rounded-lg shadow-xl border border-border/50 p-8">
                            <h1 className="text-4xl font-extrabold text-primary mb-10 text-center tracking-tight">95 лет Тихорецкому техникуму железнодорожного транспорта</h1>

                            <div className="space-y-16">
                                {/* Пост 1: Этапы нашей истории */}
                                {renderPostContent(1, "Этапы нашей истории", 
                                    <>
                                        <h3 className="text-lg font-semibold mb-3">ИЗ ВОСПОМИНАНИЙ ВИКТОРА ФЁДОРОВИЧА ИВАНОВА, ВЫПУСКНИКА 1933 ГОДА</h3>
                                        <p className="mb-4">В Экспозиционном центре техникума бережно хранятся документы и фотографии далёких 30-х годов... (полный текст)</p>
                                        <p className="mb-4">Виктор Фёдорович Иванов поступил в наш техникум в 1933 году. К этому времени он окончил семь классов общеобразовательной школы № 35 имени Октябрьской революции (ныне это корпус №1 ТТЖТ-филиала РГУПС)...</p>
                                        <p className="mb-4">Рассказывая о своих преподавателях, Виктор Фёдорович с теплом о них отзывался: «Нам студентам того времени, очень повезло с преподавателями. Это были замечательные люди, обладающие огромным запасом знаний...</p>
                                        <div className="bg-gray-100 rounded-lg p-4 mt-6">
                                            <h4 className="font-semibold mb-2">Фотографии из архива Экспоцентра ТТЖТ-филиала РГУПС:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                <li>удостоверение Иванова В.Ф. «Почётный ветеран железнодорожного транспорта»</li>
                                                <li>учащиеся Тихорецкого механического техникума, 1933 г.</li>
                                                <li>здание Тихорецкого механического техникума</li>
                                                <li>портреты Иванова В.Ф. разных лет</li>
                                            </ul>
                                        </div>
                                    </>,
                                    'Воярж Е.В.', '04 марта 2025', post1Images, currentSlidePost1
                                )}

                                {/* Пост 2: Ими гордимся (Плотников) */}
                                {renderPostContent(2, "Ими гордимся: Плотников Василий Петрович", 
                                    <>
                                        <h3 className="text-xl font-bold text-primary mb-4">Плотников Василий Петрович</h3>
                                        <p className="mb-4">Во время войны он воевал, а в мирное время 35 лет преподавал математику. Имя этого человека, воина и педагога - Плотников Василий Петрович.</p>
                                        <p className="mb-4">Василий Плотников родился 27 марта 1919 года в ст. Фастовецкая Тихорецкого района Краснодарского края... (полный текст)</p>
                                        <p className="mb-4">В сентябре 1942 года Плотников В.П. был призван в армию, служил в восьмой отдельной лыжной бригаде третьего Украинского фронта...</p>
                                        <p className="mb-4">В мае 1946 года Плотников В.П. был демобилизован. В сентябре 1948 года поступил на работу в Тихорецкий техникум железнодорожного транспорта преподавателем математики...</p>
                                        <p className="mb-4">Бывшие его воспитанники добрым словом вспоминают своего учителя...</p>
                                        <p>Татарян Артур, студент 4-го курса, группы Р-4-1, правнук Плотникова В.П., хранит память о прадеде и гордится тем, что в техникуме многие знают и помнят Плотникова Василия Петровича.</p>
                                    </>,
                                    'Воярж Е.В.', '05 мая 2025', post2Images, currentSlidePost2
                                )}

                                {/* Пост 3: Ими гордимся (Бутов) */}
                                {renderPostContent(3, "Ими гордимся: Бутов Николай Васильевич", 
                                    <>
                                        <h3 className="text-xl font-bold text-primary mb-4">Бутов Николай Васильевич</h3>
                                        <p className="mb-4">Жизненный путь Николая Васильевича Бутова - гордость Тихорецкого техникума железнодорожного транспорта, так как он всю свою жизнь был связан с нашим учебным заведением, и очень много сделал для него!</p>
                                        <p className="mb-4">Родился Николай Бутов в 1916 году в г. Тихорецке. В 1933 году окончил Тихорецкое фабрично-заводское училище (ФЗУ), а в 1936 году ТТЖТ...</p>
                                        <p className="mb-4">Всю войну прослужил в войсках НКВД (МВД), которые сопровождали эшелоны...</p>
                                        <p className="mb-4">В 1946 году Николай Васильевич демобилизовался из армии и вернулся в РИИЖТ...</p>
                                        <p className="mb-4">Николай Васильевич обладал организаторским способностям, под его руководством в 70-х годах осуществлена пристройка...</p>
                                        <p className="mb-4">С июля 1977 года - перешёл на преподавательскую работу...</p>
                                        <p>За свои заслуги Бутов Николай Васильевич награждён орденом «Трудового Красного Знамени»...</p>
                                    </>,
                                    'Воярж Е.В.', '05 мая 2025', post3Images, currentSlidePost3
                                )}
                                
                                {/* Пост 4: Первый выпуск женщин-помощников машинистов */}
                                {renderPostContent(4, "Первый выпуск женщин-помощников машинистов", 
                                    <>
                                        <h3 className="text-xl font-bold text-primary mb-4">В 1939 ГОДУ В НАШЕМ ТЕХНИКУМЕ СОСТОЯЛСЯ ПЕРВЫЙ ВЫПУСК ЖЕНЩИН-ПОМОЩНИКОВ МАШИНИСТОВ</h3>
                                        <p className="mb-4">Тихорецкий техникум железнодорожного транспорта – филиал ФГБОУ ВО РГУПС был основан в октябре 1930 года...</p>
                                        <p className="mb-4">В стране быстрыми темпами шла индустриализация...</p>
                                        <p className="mb-4">В годы Великой Отечественной войны многие женщины в Тихорецком паровозном депо...</p>
                                        <p className="mb-4">На общем фото 1-го выпуска женщин помощников машинистов при Тихорецком механическом техникуме, сделанном 6 мая 1939 года...</p>
                                        <p>Ветеран труда Тихорецкого локомотивного депо Анна Кузьминична Подгорная всю свою трудовую жизнь посвятила выбранной профессии...</p>
                                    </>,
                                    'Воярж Е.В.', '04 марта 2025', post4Images, currentSlidePost4
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="w-80 bg-white border-l border-border p-6 sticky top-16 h-screen overflow-y-auto hidden lg:block">
                    <SidebarCards />
                </aside>
            </div>

            {/* Модальное окно для увеличения */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 flex justify-center items-center">
                    <DialogTitle className="sr-only">Увеличенное изображение</DialogTitle>
                    <div className="relative w-full h-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Увеличенное изображение"
                                className="w-full h-full max-w-[90vw] max-h-[90vh] object-contain"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Anniversary95;
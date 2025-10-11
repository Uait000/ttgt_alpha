import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarCards from '@/components/SidebarCards';
import InfoBlocks from '@/components/InfoBlocks';

const Administration = () => {
  const staff = [
    {
      id: 1,
      name: 'Завьялов Андрей Александрович',
      position: 'Директор техникума',
      phone: '6-20-03',
      email: 'director@ttgt.org',
      schedule: 'ежедневно четверг 14.00 - 15.00 час.',
      photo: 'https://s2.radikal.cloud/2025/09/22/snapedit_1758485254218-KOPIYe8b14b1ca6e6da35.png'
    },
    {
      id: 2,
      name: 'Штикова Наталья Юрьевна',
      position: 'Зам. директора техникума по УР:',
      phone: '6-20-03 доб.112',
      email: 'zamus@ttgt.org',
      schedule: 'ежедневно среда 14.00 - 15.00 час.',
      photo: 'https://s3.radikal.cloud/2025/09/21/shitikova-pica-no-bg-preview-carve.photos3f8b44688444fab9.png'
    },
    {
      id: 3,
      name: 'Жестеров Сергей Валентинович',
      position: 'Зам. директора техникума по УПР:',
      phone: '6-20-03 доб.132',
      email: 'zamupr@ttgt.org',
      schedule: 'ежедневно среда 14.00 - 15.00 час.',
      photo: 'https://s1.radikal.cloud/2025/09/21/Airbrush-Image-Enhancer-1758322085807-no-bg-preview-carve.photoscf4659f73688a8b7.png'
    },
    {
      id: 4,
      name: 'Ярошевская Ольга Николаевна',
      position: 'Зам.директора техникума по ВР:',
      phone: '6-20-03 доб.127',
      email: 'zamuvr@ttgt.org',
      schedule: 'ежедневно пятница 14.00 - 15.00 час.',
      photo: 'https://s2.radikal.cloud/2025/09/21/Airbrush-Image-Enhancer-1758322892710-no-bg-preview-carve.photos-KOPIYb0791d061e58713b.png'
    },
    {
      id: 5,
      name: 'Лисиченко Дмитрий Владимирович',
      position: 'Зам. директора по информатизации',
      phone: '6-20-03 доб.118',
      email: 'lic@ttgt.org',
      schedule: '-',
      photo: 'https://radika1.link/2025/09/21/Airbrush-Image-Enhancer-1758322805524-no-bg-preview-carve.photos9fa0a454785671cc.png'
    },
    {
      id: 6,
      name: 'Буйная Юлия Анатольевна',
      position: 'Главный бухгалтер',
      phone: '6-20-03 доб.112',
      email: 'buh@ttgt.org',
      schedule: '-',
      photo: 'https://s2.radikal.cloud/2025/09/21/Airbrush-Image-Enhancer-1758322892710-no-bg-preview-carve.photosb13a47491f3c8e82.png'
    },
    {
      id: 7,
      name: 'Чикида Иван Иванович',
      position: 'Зам. директора по АХЧ:',
      phone: '6-20-03 доб.117',
      email: 'axch@ttgt.org',
      schedule: '-',
      photo: 'https://s1.radikal.cloud/2025/09/21/snapedit_17584852542185626bf3121159cb1.png'
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
              <h1 className="text-3xl font-bold text-primary mb-8 text-center">Администрация</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((person) => (
                  <div 
                    key={person.id} 
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src={person.photo} 
                        alt={person.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="bg-primary/10 rounded-lg p-3 mb-3">
                        <h3 className="font-semibold text-primary text-center text-sm">
                          {person.position}
                        </h3>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-foreground text-center">{person.name}</p>
                        <p className="text-muted-foreground">
                          <strong>телефон:</strong> {person.phone}
                        </p>
                        <p className="text-muted-foreground">
                          <strong>e-mail:</strong> {person.email}
                        </p>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <strong>ГРАФИК ПРИЕМА ГРАЖДАН:</strong>
                          </p>
                          <p className="text-xs text-muted-foreground">{person.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default Administration;
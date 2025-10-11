import { Link } from 'react-router-dom';
import {
  History,
  Users,
  MapPin,
  Award,
  FileCheck,
  BookOpen,
  Briefcase,
  Monitor,
  BarChart,
  Building,
  Car,
  UtensilsCrossed,
  Waves,
  Wrench
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const sidebarItems: SidebarItem[] = [
    { label: 'История', href: '/history', icon: <History className="w-4 h-4" /> },
    { label: 'Администрация', href: '/administration', icon: <Users className="w-4 h-4" /> },
    { label: 'Наши отделения', href: '/departments', icon: <MapPin className="w-4 h-4" /> },
    { label: 'Наша гордость', href: '/pride', icon: <Award className="w-4 h-4" /> },
    { label: 'Аккредитация', href: '/accreditation', icon: <FileCheck className="w-4 h-4" /> },
    { label: 'Лицензия', href: '/license', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Воспитательная работа', href: '/educational-work', icon: <Users className="w-4 h-4" /> },
    { label: 'Библиотека', href: '/library', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Электронная библиотека', href: '/e-library', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Вакансии', href: '/vacancies', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Электронная ИОС', href: '/ios', icon: <Monitor className="w-4 h-4" /> },
    { label: 'НОКО', href: '/noko', icon: <BarChart className="w-4 h-4" /> },
    { label: 'Общежитие', href: '/dormitory', icon: <Building className="w-4 h-4" /> },
    { label: 'Автошкола', href: '/driving-school', icon: <Car className="w-4 h-4" /> },
    { label: 'Столовая', href: '/cafeteria', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { label: 'Бассейн', href: '/swimming-pool', icon: <Waves className="w-4 h-4" /> },
    { label: 'Мастерские', href: '/workshops', icon: <Wrench className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border h-screen sticky top-16 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">Навигация</h2>
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="sidebar-item"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
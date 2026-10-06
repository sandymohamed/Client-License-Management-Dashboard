import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  UserCheck, 
  Bell, 
  BarChart3,
  Settings,
  Globe
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const menuItems = [
    { id: 'dashboard', label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', icon: Home },
    { id: 'clients', label: language === 'ar' ? 'العملاء' : 'Clients', icon: Users },
    { id: 'licenses', label: language === 'ar' ? 'التراخيص' : 'Licenses', icon: FileText },
    { id: 'workers', label: language === 'ar' ? 'العمال' : 'Workers', icon: UserCheck },
    { id: 'notifications', label: language === 'ar' ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'reports', label: language === 'ar' ? 'التقارير' : 'Reports', icon: BarChart3 },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          {language === 'ar' ? 'إدارة التراخيص' : 'License Manager'}
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Globe size={20} />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
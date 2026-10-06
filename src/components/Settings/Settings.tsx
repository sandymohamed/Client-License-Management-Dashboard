import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Mail, MessageSquare, Smartphone, Globe, Shield, Save } from 'lucide-react';

interface SettingsProps {
  language: string;
}

const Settings: React.FC<SettingsProps> = ({ language }) => {
  const [activeSection, setActiveSection] = useState<string>('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      whatsapp: true,
      push: true,
      reminderDays: [30, 7, 1]
    },
    general: {
      language: 'en',
      timezone: 'Asia/Dubai',
      dateFormat: 'dd/mm/yyyy'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  });

  const sections = [
    {
      id: 'notifications',
      name: language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings',
      icon: Bell
    },
    {
      id: 'general',
      name: language === 'ar' ? 'الإعدادات العامة' : 'General Settings',
      icon: SettingsIcon
    },
    {
      id: 'security',
      name: language === 'ar' ? 'الأمان' : 'Security',
      icon: Shield
    }
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleReminderDaysChange = (days: number, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        reminderDays: checked
          ? [...prev.notifications.reminderDays, days].sort((a, b) => b - a)
          : prev.notifications.reminderDays.filter(d => d !== days)
      }
    }));
  };

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'قنوات الإشعار' : 'Notification Channels'}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span className="font-medium text-gray-900">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Notifications'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-gray-400" />
              <span className="font-medium text-gray-900">
                {language === 'ar' ? 'الرسائل النصية' : 'SMS Notifications'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-green-500" />
              <span className="font-medium text-gray-900">
                {language === 'ar' ? 'واتساب' : 'WhatsApp'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.whatsapp}
                onChange={(e) => handleSettingChange('notifications', 'whatsapp', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-gray-400" />
              <span className="font-medium text-gray-900">
                {language === 'ar' ? 'الإشعارات الفورية' : 'Push Notifications'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'أيام التذكير' : 'Reminder Days'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 7, 15, 30, 60, 90].map((days) => (
            <label key={days} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.reminderDays.includes(days)}
                onChange={(e) => handleReminderDaysChange(days, e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-900">
                {days} {language === 'ar' ? (days === 1 ? 'يوم' : 'أيام') : (days === 1 ? 'day' : 'days')}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'تفضيلات النظام' : 'System Preferences'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'اللغة' : 'Language'}
            </label>
            <select
              value={settings.general.language}
              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'المنطقة الزمنية' : 'Timezone'}
            </label>
            <select
              value={settings.general.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Dubai">Dubai (UTC+4)</option>
              <option value="Asia/Riyadh">Riyadh (UTC+3)</option>
              <option value="UTC">UTC (UTC+0)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'تنسيق التاريخ' : 'Date Format'}
            </label>
            <select
              value={settings.general.dateFormat}
              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-gray-900">
                {language === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
              </span>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'حماية إضافية لحسابك' : 'Extra security for your account'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'انتهاء الجلسة (بالدقائق)' : 'Session Timeout (minutes)'}
            </label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={15}>15 {language === 'ar' ? 'دقيقة' : 'minutes'}</option>
              <option value={30}>30 {language === 'ar' ? 'دقيقة' : 'minutes'}</option>
              <option value={60}>60 {language === 'ar' ? 'دقيقة' : 'minutes'}</option>
              <option value={120}>120 {language === 'ar' ? 'دقيقة' : 'minutes'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'انتهاء كلمة المرور (بالأيام)' : 'Password Expiry (days)'}
            </label>
            <select
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={30}>30 {language === 'ar' ? 'يوم' : 'days'}</option>
              <option value={60}>60 {language === 'ar' ? 'يوم' : 'days'}</option>
              <option value={90}>90 {language === 'ar' ? 'يوم' : 'days'}</option>
              <option value={0}>{language === 'ar' ? 'لا تنتهي' : 'Never expires'}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotificationSettings();
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderNotificationSettings();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إدارة تفضيلات النظام والإشعارات' 
                : 'Manage system preferences and notifications'
              }
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save size={20} />
            {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon size={18} />
                {section.name}
              </button>
            );
          })}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Settings;
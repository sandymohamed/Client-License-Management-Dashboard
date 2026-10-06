import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, FileText, UserCheck } from 'lucide-react';
import { mockServices, mockWorkers, mockClients, mockNotifications } from '../../data/mockData';
import { getDaysUntilExpiry } from '../../utils/dateUtils';

interface ReportsProps {
  language: string;
}

const Reports: React.FC<ReportsProps> = ({ language }) => {
  const [activeReport, setActiveReport] = useState<string>('overview');
  const [dateRange, setDateRange] = useState<string>('30');

  const getExpiringItems = (days: number) => {
    const expiringServices = mockServices.filter(service => {
      const daysUntil = getDaysUntilExpiry(service.expiryDate);
      return daysUntil <= days && daysUntil > 0;
    });

    const expiringWorkers = mockWorkers.filter(worker => {
      const daysUntil = getDaysUntilExpiry(worker.expiryDate);
      return daysUntil <= days && daysUntil > 0;
    });

    return { services: expiringServices, workers: expiringWorkers };
  };

  const getExpiredItems = () => {
    const expiredServices = mockServices.filter(service => getDaysUntilExpiry(service.expiryDate) < 0);
    const expiredWorkers = mockWorkers.filter(worker => getDaysUntilExpiry(worker.expiryDate) < 0);
    return { services: expiredServices, workers: expiredWorkers };
  };

  const reportSections = [
    { 
      id: 'overview', 
      name: language === 'ar' ? 'نظرة عامة' : 'Overview',
      icon: BarChart3
    },
    { 
      id: 'expiring', 
      name: language === 'ar' ? 'ينتهي قريباً' : 'Expiring Soon',
      icon: Calendar
    },
    { 
      id: 'expired', 
      name: language === 'ar' ? 'منتهية الصلاحية' : 'Expired',
      icon: Filter
    },
    { 
      id: 'notifications', 
      name: language === 'ar' ? 'إحصائيات الإشعارات' : 'Notification Stats',
      icon: TrendingUp
    }
  ];

  const renderOverviewReport = () => {
    const activeClients = mockClients.filter(c => c.status === 'active').length;
    const activeLicenses = mockServices.filter(s => s.status === 'active').length;
    const activeWorkers = mockWorkers.filter(w => w.status === 'active').length;
    const { services: expiring7, workers: expiringWorkers7 } = getExpiringItems(7);
    const { services: expired } = getExpiredItems();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'العملاء النشطون' : 'Active Clients'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'التراخيص النشطة' : 'Active Licenses'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{activeLicenses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCheck size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'العمال النشطون' : 'Active Workers'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{activeWorkers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Calendar size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'منتهية الصلاحية' : 'Expired Items'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{expired.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'ar' ? 'التنبيهات العاجلة (7 أيام)' : 'Urgent Alerts (7 days)'}
          </h3>
          <div className="space-y-3">
            {expiring7.map((service) => {
              const client = mockClients.find(c => c.id === service.clientId);
              return (
                <div key={service.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">
                      {service.serviceType.replace('_', ' ').toUpperCase()} - {service.licenseNumber}
                    </p>
                    <p className="text-sm text-gray-600">{client?.name}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {getDaysUntilExpiry(service.expiryDate)} {language === 'ar' ? 'أيام' : 'days'}
                  </span>
                </div>
              );
            })}
            {expiringWorkers7.map((worker) => {
              const client = mockClients.find(c => c.id === worker.clientId);
              return (
                <div key={worker.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{worker.name} - {worker.position}</p>
                    <p className="text-sm text-gray-600">{client?.name}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {getDaysUntilExpiry(worker.expiryDate)} {language === 'ar' ? 'أيام' : 'days'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderExpiringReport = () => {
    const { services, workers } = getExpiringItems(parseInt(dateRange));
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? `العناصر التي تنتهي خلال ${dateRange} أيام` : `Items expiring within ${dateRange} days`}
          </h3>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">7 {language === 'ar' ? 'أيام' : 'days'}</option>
            <option value="30">30 {language === 'ar' ? 'يوم' : 'days'}</option>
            <option value="60">60 {language === 'ar' ? 'يوم' : 'days'}</option>
            <option value="90">90 {language === 'ar' ? 'يوم' : 'days'}</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">
              {language === 'ar' ? 'التراخيص' : 'Licenses'} ({services.length})
            </h4>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map((service) => {
              const client = mockClients.find(c => c.id === service.clientId);
              const daysLeft = getDaysUntilExpiry(service.expiryDate);
              return (
                <div key={service.id} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{service.licenseNumber}</p>
                    <p className="text-sm text-gray-600">{client?.name}</p>
                    <p className="text-sm text-gray-500">{service.serviceType.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{new Date(service.expiryDate).toLocaleDateString()}</p>
                    <p className={`text-sm ${daysLeft <= 7 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {daysLeft} {language === 'ar' ? 'أيام متبقية' : 'days left'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">
              {language === 'ar' ? 'العمال' : 'Workers'} ({workers.length})
            </h4>
          </div>
          <div className="divide-y divide-gray-200">
            {workers.map((worker) => {
              const client = mockClients.find(c => c.id === worker.clientId);
              const daysLeft = getDaysUntilExpiry(worker.expiryDate);
              return (
                <div key={worker.id} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{worker.name}</p>
                    <p className="text-sm text-gray-600">{client?.name}</p>
                    <p className="text-sm text-gray-500">{worker.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{new Date(worker.expiryDate).toLocaleDateString()}</p>
                    <p className={`text-sm ${daysLeft <= 7 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {daysLeft} {language === 'ar' ? 'أيام متبقية' : 'days left'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeReport) {
      case 'overview':
        return renderOverviewReport();
      case 'expiring':
        return renderExpiringReport();
      case 'expired':
        const { services: expiredServices, workers: expiredWorkers } = getExpiredItems();
        return (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? `${expiredServices.length + expiredWorkers.length} عنصر منتهي الصلاحية` : `${expiredServices.length + expiredWorkers.length} expired items`}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'تحتاج للتجديد الفوري' : 'Require immediate renewal'}
            </p>
          </div>
        );
      case 'notifications':
        const sentNotifications = mockNotifications.filter(n => n.status === 'sent').length;
        const pendingNotifications = mockNotifications.filter(n => n.status === 'pending').length;
        const failedNotifications = mockNotifications.filter(n => n.status === 'failed').length;
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{sentNotifications}</div>
              <p className="text-gray-600">{language === 'ar' ? 'إشعارات مُرسلة' : 'Notifications Sent'}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingNotifications}</div>
              <p className="text-gray-600">{language === 'ar' ? 'في الانتظار' : 'Pending'}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{failedNotifications}</div>
              <p className="text-gray-600">{language === 'ar' ? 'فشل الإرسال' : 'Failed'}</p>
            </div>
          </div>
        );
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'التقارير والإحصائيات' : 'Reports & Analytics'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'تحليل شامل لحالة التراخيص والعمال' 
                : 'Comprehensive analysis of licenses and workers status'
              }
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download size={20} />
            {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {reportSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveReport(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeReport === section.id
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

export default Reports;
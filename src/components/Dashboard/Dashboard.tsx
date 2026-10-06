import React from 'react';
import { Users, FileText, UserCheck, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockDashboardStats, mockServices, mockWorkers, mockClients } from '../../data/mockData';
import { getDaysUntilExpiry } from '../../utils/dateUtils';

interface DashboardProps {
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const stats = [
    {
      title: language === 'ar' ? 'إجمالي العملاء' : 'Total Clients',
      value: mockDashboardStats.totalClients,
      icon: Users,
      color: 'bg-blue-500',
      trend: { value: 12, isPositive: true }
    },
    {
      title: language === 'ar' ? 'إجمالي التراخيص' : 'Total Licenses',
      value: mockDashboardStats.totalLicenses,
      icon: FileText,
      color: 'bg-teal-500',
      trend: { value: 8, isPositive: true }
    },
    {
      title: language === 'ar' ? 'إجمالي العمال' : 'Total Workers',
      value: mockDashboardStats.totalWorkers,
      icon: UserCheck,
      color: 'bg-purple-500',
      trend: { value: 3, isPositive: false }
    },
    {
      title: language === 'ar' ? 'تنتهي قريباً' : 'Expiring Soon',
      value: mockDashboardStats.expiringSoon,
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      title: language === 'ar' ? 'منتهية الصلاحية' : 'Expired',
      value: mockDashboardStats.expired,
      icon: XCircle,
      color: 'bg-red-500'
    },
    {
      title: language === 'ar' ? 'تراخيص نشطة' : 'Active Licenses',
      value: mockDashboardStats.activeLicenses,
      icon: CheckCircle,
      color: 'bg-green-500'
    }
  ];

  const upcomingExpirations = [
    ...mockServices.filter(service => {
      const days = getDaysUntilExpiry(service.expiryDate);
      return days <= 30 && days > 0;
    }).map(service => ({
      type: 'license',
      name: `${service.serviceType.replace('_', ' ').toUpperCase()} - ${service.licenseNumber}`,
      client: mockClients.find(c => c.id === service.clientId)?.name || 'Unknown Client',
      expiryDate: service.expiryDate,
      days: getDaysUntilExpiry(service.expiryDate)
    })),
    ...mockWorkers.filter(worker => {
      const days = getDaysUntilExpiry(worker.expiryDate);
      return days <= 30 && days > 0;
    }).map(worker => ({
      type: 'worker',
      name: `${worker.name} (${worker.position})`,
      client: mockClients.find(c => c.id === worker.clientId)?.name || 'Unknown Client',
      expiryDate: worker.expiryDate,
      days: getDaysUntilExpiry(worker.expiryDate)
    }))
  ].sort((a, b) => a.days - b.days);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'نظرة عامة على حالة التراخيص والعمال' 
            : 'Overview of your licenses and workers status'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Expirations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'انتهاء الصلاحية القادم' : 'Upcoming Expirations'}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingExpirations.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.client}</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'ينتهي في' : 'Expires in'} {item.days} {language === 'ar' ? 'أيام' : 'days'}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.days <= 7 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.days <= 7 ? (language === 'ar' ? 'عاجل' : 'Urgent') : (language === 'ar' ? 'قريباً' : 'Soon')}
                  </div>
                </div>
              ))}
              {upcomingExpirations.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  {language === 'ar' ? 'لا توجد انتهاءات قادمة' : 'No upcoming expirations'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">New client registered</p>
                  <p className="text-sm text-gray-600">Al-Manara Trading LLC</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">License renewed</p>
                  <p className="text-sm text-gray-600">Health permit - HLTH-2024-001</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Expiry notification sent</p>
                  <p className="text-sm text-gray-600">3 notifications sent via WhatsApp</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Worker added</p>
                  <p className="text-sm text-gray-600">Maria Santos - Emirates Construction</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
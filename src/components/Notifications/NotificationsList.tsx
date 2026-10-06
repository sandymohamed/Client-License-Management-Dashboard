import React, { useState } from 'react';
import { Bell, Search, Mail, MessageSquare, Smartphone, Send, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockNotifications, mockClients } from '../../data/mockData';
import { NotificationLog } from '../../types';

interface NotificationsListProps {
  language: string;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ language }) => {
  const [notifications, setNotifications] = useState<NotificationLog[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getClientName = (clientId?: string) => {
    if (!clientId) return language === 'ar' ? 'غير محدد' : 'Not specified';
    const client = mockClients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      case 'push':
        return <Smartphone size={16} />;
      case 'whatsapp':
        return <Send size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      email: language === 'ar' ? 'بريد إلكتروني' : 'Email',
      sms: language === 'ar' ? 'رسالة نصية' : 'SMS',
      push: language === 'ar' ? 'إشعار فوري' : 'Push Notification',
      whatsapp: language === 'ar' ? 'واتساب' : 'WhatsApp'
    };
    return types[type as keyof typeof types] || type;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(notification.clientId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة الإشعارات' : 'Notification Management'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'تتبع جميع الإشعارات المُرسلة وحالة التسليم' 
                : 'Track all sent notifications and delivery status'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Send size={20} />
              {language === 'ar' ? 'إرسال إشعار' : 'Send Notification'}
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Bell size={20} />
              {language === 'ar' ? 'إعدادات التنبيهات' : 'Alert Settings'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'البحث في الإشعارات...' : 'Search notifications...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{language === 'ar' ? 'جميع الأنواع' : 'All Types'}</option>
            <option value="email">{language === 'ar' ? 'بريد إلكتروني' : 'Email'}</option>
            <option value="sms">{language === 'ar' ? 'رسالة نصية' : 'SMS'}</option>
            <option value="push">{language === 'ar' ? 'إشعار فوري' : 'Push'}</option>
            <option value="whatsapp">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
            <option value="sent">{language === 'ar' ? 'مُرسل' : 'Sent'}</option>
            <option value="pending">{language === 'ar' ? 'في الانتظار' : 'Pending'}</option>
            <option value="failed">{language === 'ar' ? 'فشل' : 'Failed'}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  {language === 'ar' ? 'النوع' : 'Type'}
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  {language === 'ar' ? 'العميل' : 'Client'}
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  {language === 'ar' ? 'الرسالة' : 'Message'}
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-900">
                  {language === 'ar' ? 'تاريخ الإرسال' : 'Sent At'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        {getTypeIcon(notification.type)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {getTypeLabel(notification.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{getClientName(notification.clientId)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 max-w-md truncate" title={notification.message}>
                      {notification.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(notification.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status === 'sent' && (language === 'ar' ? 'مُرسل' : 'Sent')}
                        {notification.status === 'failed' && (language === 'ar' ? 'فشل' : 'Failed')}
                        {notification.status === 'pending' && (language === 'ar' ? 'في الانتظار' : 'Pending')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">
                      {new Date(notification.sentAt).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'لم يتم العثور على إشعارات' : 'No notifications found'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'جرب البحث بكلمات مختلفة أو قم بتغيير المرشحات' 
                : 'Try searching with different terms or adjust filters'
              }
            </p>
          </div>
        )}
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي الإشعارات' : 'Total Notifications'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'مُرسلة بنجاح' : 'Successfully Sent'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'في الانتظار' : 'Pending'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'فشل الإرسال' : 'Failed'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
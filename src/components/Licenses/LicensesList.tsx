import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Building, AlertCircle } from 'lucide-react';
import { mockServices, mockClients } from '../../data/mockData';
import { Service } from '../../types';
import { getStatusColor, formatDate, getDaysUntilExpiry } from '../../utils/dateUtils';

interface LicensesListProps {
  language: string;
}

const LicensesList: React.FC<LicensesListProps> = ({ language }) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getServiceTypeLabel = (type: string) => {
    const types = {
      commercial: language === 'ar' ? 'تجاري' : 'Commercial',
      health: language === 'ar' ? 'صحي' : 'Health',
      fire_safety: language === 'ar' ? 'سلامة من الحريق' : 'Fire Safety',
      advertisement: language === 'ar' ? 'إعلان' : 'Advertisement',
      building: language === 'ar' ? 'مبنى' : 'Building'
    };
    return types[type as keyof typeof types] || type;
  };

  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getServiceTypeLabel(service.serviceType).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(service.clientId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    const matchesType = filterType === 'all' || service.serviceType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة التراخيص' : 'License Management'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إدارة جميع التراخيص والتصاريح ومراقبة تواريخ انتهاء الصلاحية' 
                : 'Manage all licenses and permits, monitor expiry dates'
              }
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            {language === 'ar' ? 'إضافة ترخيص' : 'Add License'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'البحث في التراخيص...' : 'Search licenses...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
            <option value="active">{language === 'ar' ? 'نشط' : 'Active'}</option>
            <option value="expiring_soon">{language === 'ar' ? 'ينتهي قريباً' : 'Expiring Soon'}</option>
            <option value="expired">{language === 'ar' ? 'منتهي' : 'Expired'}</option>
            <option value="pending">{language === 'ar' ? 'في الانتظار' : 'Pending'}</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{language === 'ar' ? 'جميع الأنواع' : 'All Types'}</option>
            <option value="commercial">{language === 'ar' ? 'تجاري' : 'Commercial'}</option>
            <option value="health">{language === 'ar' ? 'صحي' : 'Health'}</option>
            <option value="fire_safety">{language === 'ar' ? 'سلامة من الحريق' : 'Fire Safety'}</option>
            <option value="advertisement">{language === 'ar' ? 'إعلان' : 'Advertisement'}</option>
            <option value="building">{language === 'ar' ? 'مبنى' : 'Building'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const daysUntilExpiry = getDaysUntilExpiry(service.expiryDate);
          return (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building size={20} className="text-gray-400" />
                      <span className="text-lg font-semibold text-gray-900">
                        {getServiceTypeLabel(service.serviceType)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{service.licenseNumber}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status === 'active' && (language === 'ar' ? 'نشط' : 'Active')}
                      {service.status === 'expiring_soon' && (language === 'ar' ? 'ينتهي قريباً' : 'Expiring Soon')}
                      {service.status === 'expired' && (language === 'ar' ? 'منتهي' : 'Expired')}
                      {service.status === 'pending' && (language === 'ar' ? 'في الانتظار' : 'Pending')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {language === 'ar' ? 'العميل' : 'Client'}
                    </label>
                    <p className="text-gray-900">{getClientName(service.clientId)}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'ar' ? 'تاريخ الإصدار' : 'Issue Date'}
                      </label>
                      <p className="text-gray-900 text-sm">{formatDate(service.issueDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'}
                      </label>
                      <p className="text-gray-900 text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(service.expiryDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {language === 'ar' ? 'الجهة المُصدرة' : 'Issuing Authority'}
                    </label>
                    <p className="text-gray-900 text-sm">{service.issuingAuthority}</p>
                  </div>
                </div>

                {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle size={16} className="text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      {language === 'ar' ? `ينتهي في ${daysUntilExpiry} أيام` : `Expires in ${daysUntilExpiry} days`}
                    </span>
                  </div>
                )}

                {daysUntilExpiry < 0 && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="text-sm text-red-800">
                      {language === 'ar' ? `انتهى منذ ${Math.abs(daysUntilExpiry)} أيام` : `Expired ${Math.abs(daysUntilExpiry)} days ago`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'ar' ? 'لم يتم العثور على تراخيص' : 'No licenses found'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'جرب البحث بكلمات مختلفة أو أضف ترخيص جديد' 
              : 'Try searching with different terms or add a new license'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default LicensesList;
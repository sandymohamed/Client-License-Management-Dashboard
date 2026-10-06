import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, Calendar, Globe, Briefcase, CreditCard, AlertCircle } from 'lucide-react';
import { mockWorkers, mockClients } from '../../data/mockData';
import { Worker } from '../../types';
import { getStatusColor, formatDate, getDaysUntilExpiry } from '../../utils/dateUtils';

interface WorkersListProps {
  language: string;
}

const WorkersList: React.FC<WorkersListProps> = ({ language }) => {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = 
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.residencyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClientName(worker.clientId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة العمال' : 'Worker Management'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إدارة معلومات العمال وتتبع تصاريح الإقامة' 
                : 'Manage worker information and track residency permits'
              }
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            {language === 'ar' ? 'إضافة عامل' : 'Add Worker'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'البحث في العمال...' : 'Search workers...'}
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
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => {
          const daysUntilExpiry = getDaysUntilExpiry(worker.expiryDate);
          return (
            <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                        {worker.status === 'active' && (language === 'ar' ? 'نشط' : 'Active')}
                        {worker.status === 'expiring_soon' && (language === 'ar' ? 'ينتهي قريباً' : 'Expiring Soon')}
                        {worker.status === 'expired' && (language === 'ar' ? 'منتهي' : 'Expired')}
                      </span>
                    </div>
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
                    <p className="text-gray-900">{getClientName(worker.clientId)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Globe size={14} />
                        {language === 'ar' ? 'الجنسية' : 'Nationality'}
                      </label>
                      <p className="text-gray-900 text-sm">{worker.nationality}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Briefcase size={14} />
                        {language === 'ar' ? 'المنصب' : 'Position'}
                      </label>
                      <p className="text-gray-900 text-sm">{worker.position}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {language === 'ar' ? 'رقم الإقامة' : 'Residency Number'}
                    </label>
                    <p className="text-gray-900 text-sm font-mono">{worker.residencyNumber}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <CreditCard size={14} />
                        {language === 'ar' ? 'رقم الهوية' : 'ID Number'}
                      </label>
                      <p className="text-gray-900 text-sm font-mono">{worker.idNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        {language === 'ar' ? 'رقم الجواز' : 'Passport'}
                      </label>
                      <p className="text-gray-900 text-sm font-mono">{worker.passportNumber}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {language === 'ar' ? 'تاريخ انتهاء الإقامة' : 'Residency Expiry'}
                    </label>
                    <p className="text-gray-900 text-sm">{formatDate(worker.expiryDate)}</p>
                  </div>
                </div>

                {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle size={16} className="text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      {language === 'ar' ? `تنتهي الإقامة في ${daysUntilExpiry} أيام` : `Residency expires in ${daysUntilExpiry} days`}
                    </span>
                  </div>
                )}

                {daysUntilExpiry < 0 && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="text-sm text-red-800">
                      {language === 'ar' ? `انتهت الإقامة منذ ${Math.abs(daysUntilExpiry)} أيام` : `Residency expired ${Math.abs(daysUntilExpiry)} days ago`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'ar' ? 'لم يتم العثور على عمال' : 'No workers found'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'جرب البحث بكلمات مختلفة أو أضف عامل جديد' 
              : 'Try searching with different terms or add a new worker'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkersList;
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { mockClients } from '../../data/mockData';
import { Client } from '../../types';
import { getStatusColor } from '../../utils/dateUtils';

interface ClientsListProps {
  language: string;
}

const ClientsList: React.FC<ClientsListProps> = ({ language }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'إدارة العملاء' : 'Client Management'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إدارة معلومات العملاء وحالة حساباتهم' 
                : 'Manage client information and account status'
              }
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            {language === 'ar' ? 'إضافة عميل' : 'Add Client'}
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={language === 'ar' ? 'البحث عن العملاء...' : 'Search clients...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{client.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status === 'active' 
                      ? (language === 'ar' ? 'نشط' : 'Active')
                      : (language === 'ar' ? 'غير نشط' : 'Inactive')
                    }
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

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{client.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} />
                  <span className="text-sm">{client.contactInfo.email}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin size={16} className="mt-0.5" />
                  <span className="text-sm">{client.contactInfo.address}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'} {new Date(client.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'ar' ? 'لم يتم العثور على عملاء' : 'No clients found'}
          </h3>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'جرب البحث بكلمات مختلفة أو أضف عميل جديد' 
              : 'Try searching with different terms or add a new client'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
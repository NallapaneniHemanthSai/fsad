import React, { useState } from 'react';
import { Search, IndianRupee, Calendar, User, Building2, AlertCircle } from 'lucide-react';
import { Payment, Tenant, Property } from '../types';

interface PaymentsProps {
  tenants: Tenant[];
  properties: Property[];
}

// Mock payments data
const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    amount: 65000,
    date: '2024-03-01',
    status: 'paid'
  },
  {
    id: '2',
    tenantId: '1',
    amount: 65000,
    date: '2024-02-01',
    status: 'paid'
  },
  {
    id: '3',
    tenantId: '1',
    amount: 65000,
    date: '2024-01-01',
    status: 'overdue'
  }
];

export function Payments({ tenants, properties }: PaymentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const getTenantDetails = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    const property = properties.find(p => p.id === tenant?.propertyId);
    return { tenant, property };
  };

  const filteredPayments = MOCK_PAYMENTS.filter(payment => {
    const { tenant, property } = getTenantDetails(payment.tenantId);
    const matchesSearch = tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by tenant or property..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Collected</p>
              <h3 className="text-2xl font-bold">₹1,95,000</h3>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Amount</p>
              <h3 className="text-2xl font-bold">₹65,000</h3>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overdue Amount</p>
              <h3 className="text-2xl font-bold">₹65,000</h3>
            </div>
            <div className="bg-red-500 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant/Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const { tenant, property } = getTenantDetails(payment.tenantId);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{tenant?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Building2 className="w-4 h-4" />
                          <span>{property?.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {payment.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
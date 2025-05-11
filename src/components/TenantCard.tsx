import React from 'react';
import { User, Phone, Calendar, Home } from 'lucide-react';
import { Tenant } from '../types';

interface TenantCardProps {
  tenant: Tenant;
  propertyTitle: string;
}

export function TenantCard({ tenant, propertyTitle }: TenantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{tenant.name}</h3>
          <p className="text-gray-500">{tenant.type}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Home className="w-4 h-4" />
          <span>{propertyTitle}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{tenant.phone}</span>
        </div>
        <a href={`mailto:${tenant.email}`} className="text-blue-600 hover:underline block">
          {tenant.email}
        </a>
        {tenant.type === 'Tenant' && (
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Lease: {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
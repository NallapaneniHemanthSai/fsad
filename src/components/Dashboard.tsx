import React from 'react';
import { Building2, Users, CreditCard, PieChart } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface DashboardProps {
  properties: Property[];
}

export function Dashboard({ properties }: DashboardProps) {
  const stats = [
    { title: 'Total Properties', value: properties.length.toString(), icon: Building2, color: 'bg-blue-500' },
    { title: 'Active Tenants', value: '8', icon: Users, color: 'bg-green-500' },
    { title: 'Pending Payments', value: '₹12,45,000', icon: CreditCard, color: 'bg-yellow-500' },
    { title: 'Monthly Revenue', value: '₹24,50,000', icon: PieChart, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property}
            onSelect={(p) => console.log('Selected property:', p)}
          />
        ))}
      </div>
    </div>
  );
}
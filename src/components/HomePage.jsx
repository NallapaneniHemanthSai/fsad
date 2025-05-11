import React from 'react';
import PropTypes from 'prop-types';
import { Building2, Key, Users, Shield } from 'lucide-react';

export function HomePage({ onGetStarted }) {
  const features = [
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Efficiently manage multiple properties from a single dashboard.'
    },
    {
      icon: Key,
      title: 'Tenant Portal',
      description: 'Provide tenants with a dedicated portal for rent payments and maintenance requests.'
    },
    {
      icon: Users,
      title: 'Owner Access',
      description: 'Give property owners real-time access to their property performance and financials.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your data and transactions.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simplify Your Property Management
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              The all-in-one solution for property managers, landlords, and tenants.
              Streamline operations, improve communication, and boost efficiency.
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Manage Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Happy Tenants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
};
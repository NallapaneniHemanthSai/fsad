import React, { useState } from 'react';
import { Building2, Users, CreditCard, Menu, Facebook, Instagram, Twitter, Youtube, Mail, LogOut } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { Tenants } from './components/Tenants';
import { Payments } from './components/Payments';
import { HomePage } from './components/HomePage';
import { AuthModal } from './components/AuthModal';

const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment in the heart of downtown with modern amenities, premium finishes, and stunning city views. The apartment features an open-concept living area, fully equipped kitchen with stainless steel appliances, and a private balcony.',
    address: 'Bandra West, Mumbai',
    price: 45000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
    status: 'available',
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    description: 'Spacious family home with large backyard, perfect for families. Features include a modern kitchen, separate dining area, family room, and covered parking. Located in a quiet, family-friendly neighborhood close to schools and parks.',
    address: 'HSR Layout, Bangalore',
    price: 65000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80',
    status: 'rented',
  },
  {
    id: '3',
    title: 'Luxury Villa',
    description: 'Premium villa with modern amenities including a private pool, landscaped garden, and smart home features. This exclusive property offers high-end finishes, a gourmet kitchen, home theater, and staff quarters.',
    address: 'DLF Phase 1, Gurgaon',
    price: 125000,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    status: 'available',
  }
];

const MOCK_TENANTS = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    type: 'Tenant',
    propertyId: '2',
    leaseStart: '2023-01-01',
    leaseEnd: '2024-01-01',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    type: 'Owner',
    propertyId: '1',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 98765 43212',
    type: 'Owner',
    propertyId: '3',
  }
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('signin');
  const [currentUser, setCurrentUser] = useState(null);

  const handleAuth = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const getNavItems = () => {
    if (currentUser?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Building2 },
        { id: 'properties', label: 'Properties', icon: Building2 },
        { id: 'tenants', label: 'Tenants', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
      ];
    }
    return [
      { id: 'dashboard', label: 'Dashboard', icon: Building2 },
      { id: 'properties', label: 'Properties', icon: Building2 },
      { id: 'payments', label: 'My Payments', icon: CreditCard },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">PropManager</span>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <span className="text-gray-600">
                  Welcome, {currentUser.name} ({currentUser.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleAuth('signin')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuth('signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {!currentUser || activeTab === 'home' ? (
          <HomePage onGetStarted={() => handleAuth('signup')} />
        ) : (
          <div className="flex">
            {/* Sidebar */}
            <div className={`bg-white shadow-md ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
              <div className="p-4 flex items-center justify-between">
                <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>PropManager</h1>
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={24} />
                </button>
              </div>
              <nav className="mt-8">
                {getNavItems().map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center p-3 ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                  </button>
                ))}
              </nav>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8">
              {activeTab === 'dashboard' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                  <Dashboard properties={MOCK_PROPERTIES} />
                </>
              )}
              
              {activeTab === 'properties' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Properties</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_PROPERTIES.map((property) => (
                      <PropertyCard 
                        key={property.id} 
                        property={property}
                        onSelect={setSelectedProperty}
                      />
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'tenants' && currentUser?.role === 'admin' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Tenants & Owners</h2>
                  <Tenants tenants={MOCK_TENANTS} properties={MOCK_PROPERTIES} />
                </>
              )}

              {activeTab === 'payments' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    {currentUser?.role === 'admin' ? 'All Payments' : 'My Payments'}
                  </h2>
                  <Payments tenants={MOCK_TENANTS} properties={MOCK_PROPERTIES} />
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8" />
                <span className="text-2xl font-bold">PropManager</span>
              </div>
              <p className="text-gray-400">
                Streamline your property management with our comprehensive solution.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>support@propmanager.com</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropManager. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          tenants={MOCK_TENANTS}
          onClose={() => setSelectedProperty(null)}
        />
      )}
      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
          onSwitch={(type) => setAuthType(type)}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            setShowAuthModal(false);
            setActiveTab('dashboard');
          }}
        />
      )}
    </div>
  );
}

export default App;
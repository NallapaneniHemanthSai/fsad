import React from 'react';
import { X, Bed, Bath, Move, MapPin, IndianRupee, User } from 'lucide-react';
import { Property, Tenant } from '../types';

interface PropertyModalProps {
  property: Property;
  tenants: Tenant[];
  onClose: () => void;
}

export function PropertyModal({ property, tenants, onClose }: PropertyModalProps) {
  const propertyTenants = tenants.filter(tenant => tenant.propertyId === property.id);
  const owner = propertyTenants.find(tenant => tenant.type === 'Owner');
  const currentTenant = propertyTenants.find(tenant => tenant.type === 'Tenant');

  // Additional property images (interior/exterior views)
  const additionalImages = [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
      title: 'Living Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80',
      title: 'Kitchen'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80',
      title: 'Master Bedroom'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Main Property Image */}
          <div className="aspect-video w-full mb-6">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Property Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Property Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-lg font-semibold">₹{property.price.toLocaleString('en-IN')}/month</span>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-600" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-600" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Move className="w-5 h-5 text-gray-600" />
                    <span>{property.squareFeet} sq ft</span>
                  </div>
                </div>
                <p className="text-gray-600">{property.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium capitalize
                    ${property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
                  >
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Owner/Tenant Information */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Property Contacts</h3>
                {owner && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Owner</span>
                    </div>
                    <p className="font-medium">{owner.name}</p>
                    <p className="text-gray-600">{owner.phone}</p>
                    <a href={`mailto:${owner.email}`} className="text-blue-600 hover:underline">
                      {owner.email}
                    </a>
                  </div>
                )}
                {currentTenant && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">Current Tenant</span>
                    </div>
                    <p className="font-medium">{currentTenant.name}</p>
                    <p className="text-gray-600">{currentTenant.phone}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Lease: {new Date(currentTenant.leaseStart!).toLocaleDateString()} - {new Date(currentTenant.leaseEnd!).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interior/Exterior Images */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Interior & Exterior Views</h3>
              <div className="grid gap-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="aspect-video">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <p className="mt-1 text-sm text-gray-600">{image.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
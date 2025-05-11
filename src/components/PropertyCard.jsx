import React from 'react';
import PropTypes from 'prop-types';
import { Building2, Bed, Bath, Move } from 'lucide-react';

export function PropertyCard({ property, onSelect }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(property)}
    >
      <img 
        src={property.imageUrl} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
          <span className="text-green-600 font-semibold">₹{property.price.toLocaleString('en-IN')}/mo</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{property.address}</p>
        <div className="flex justify-between text-gray-500">
          <div className="flex items-center gap-1">
            <Bed size={18} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Move size={18} />
            <span>{property.squareFeet} sq ft</span>
          </div>
        </div>
        <div className={`mt-4 text-sm font-semibold ${
          property.status === 'available' ? 'text-green-600' : 'text-red-600'
        }`}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </div>
      </div>
    </div>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    squareFeet: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['available', 'rented']).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
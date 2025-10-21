import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCardPreview: React.FC = () => {
  const { customization } = useCustomization();
  const { productCardSettings } = customization;

  const getHoverEffectClass = () => {
    return `hover:shadow-2xl transition-all duration-300`;
  };

  const getHoverEffectStyle = () => {
    return {
      filter: 'drop-shadow(0 0 20px ' + productCardSettings.glowColor + '40)',
    };
  };

  const getShadowClass = () => {
    switch (productCardSettings.shadowIntensity) {
      case 'light':
        return 'shadow-sm';
      case 'medium':
        return 'shadow-md';
      case 'strong':
        return 'shadow-lg';
      default:
        return 'shadow-sm';
    }
  };

  const products = [
    {
      id: 1,
      name: 'Smart Fitness Watch',
      category: 'Tech',
      price: '£199.99',
      originalPrice: '£249.99',
      discount: '-20%',
      rating: 4,
      reviews: 312,
      image: 'https://images.pexels.com/photos/5625005/pexels-photo-5625005.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      fastShipping: true,
    },
    {
      id: 2,
      name: 'Organic Night Cream',
      category: 'Health & Beauty',
      price: '£28.99',
      originalPrice: '£42.99',
      discount: '-33%',
      rating: 4,
      reviews: 198,
      image: 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      fastShipping: true,
    },
    {
      id: 3,
      name: 'Designer Leather Tote',
      category: 'Accessories',
      price: '£79.99',
      originalPrice: '£119.99',
      discount: '-33%',
      rating: 4,
      reviews: 145,
      image: 'https://images.pexels.com/photos/5632366/pexels-photo-5632366.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      fastShipping: false,
    },
    {
      id: 4,
      name: 'Hand-painted Wall Art',
      category: 'Homeware',
      price: '£89.99',
      originalPrice: '£129.99',
      discount: '-31%',
      rating: 5,
      reviews: 76,
      image: 'https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      fastShipping: false,
    },
  ];

  const getImageHeight = () => {
    // Calculate image height based on what's hidden
    const hiddenElements = [
      !productCardSettings.showRating,
      !productCardSettings.showPriceChange,
      !productCardSettings.showInStock
    ].filter(Boolean).length;
    
    // Base height + extra height for each hidden element
    return 48 + (hiddenElements * 8); // 192px base + 32px per hidden element
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white rounded-lg overflow-hidden ${getShadowClass()} ${getHoverEffectClass()} cursor-pointer group`}
          style={{ 
            fontFamily: productCardSettings.fontFamily,
            ...getHoverEffectStyle()
          }}
        >
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ height: `${getImageHeight() * 4}px` }}
            />
            
            {/* Discount Badge */}
            <div 
              className="absolute top-2 left-2 px-2 py-1 rounded-full text-white text-xs font-bold"
              style={{ backgroundColor: productCardSettings.accentColor }}
            >
              {product.discount}
            </div>
            
            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart size={16} className="text-gray-600" />
            </button>
            
            {/* Quick Add to Cart */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="w-full py-2 rounded-md text-white text-sm font-medium transition-colors"
                style={{ backgroundColor: productCardSettings.accentColor }}
              >
                <ShoppingCart size={16} className="inline mr-1" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4">
            {/* Category */}
            <div className="mb-1">
              <span 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: productCardSettings.accentColor }}
              >
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            {productCardSettings.showRating && (
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center mb-3">
              <span 
                className="text-lg font-bold"
                style={{ color: productCardSettings.accentColor }}
              >
                {product.price}
              </span>
              {productCardSettings.showPriceChange && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Status Indicators */}
            {productCardSettings.showInStock && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: product.inStock ? '#10B981' : '#EF4444' }}
                  />
                  <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                {product.fastShipping && (
                  <div className="flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: productCardSettings.accentColor }}
                    />
                    <span style={{ color: productCardSettings.accentColor }}>
                      Fast
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardPreview;
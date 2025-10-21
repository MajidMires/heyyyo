import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { X, ShoppingCart, Store, Shield, Truck, Gift } from 'lucide-react';

const ProductModal: React.FC = () => {
  const { customization } = useCustomization();
  const { modalSettings } = customization;

  const getButtonStyle = () => {
    const { style, color } = modalSettings.visitStoreButton;
    
    switch (style) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: color,
          border: `2px solid ${color}`,
        };
      case 'ghost':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: color,
          border: 'none',
        };
      case 'filled':
      default:
        return {
          backgroundColor: color,
          color: 'white',
          border: 'none',
        };
    }
  };

  const getBackgroundPattern = () => {
    switch (modalSettings.backgroundPattern) {
      case 'dots':
        return {
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        };
      case 'stripes':
        return {
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
        };
      case 'gradient':
        return {
          background: modalSettings.backgroundGradient || `linear-gradient(135deg, ${modalSettings.backgroundColor} 0%, ${modalSettings.backgroundColor}dd 100%)`,
        };
      case 'abstract':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
        };
      default:
        return {};
    }
  };

  const backgroundStyle = {
    backgroundColor: modalSettings.backgroundColor,
    ...getBackgroundPattern(),
  };

  const isImageLeft = modalSettings.imagePosition === 'left';

  return (
    <div 
      className="max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl relative"
      style={backgroundStyle}
    >
      <button className="absolute top-4 right-4 text-white hover:text-gray-200 z-10">
        <X size={24} />
      </button>

      <div className={`flex flex-col md:flex-row ${!isImageLeft ? 'md:flex-row-reverse' : ''}`}>
        {/* Product Image */}
        <div className="md:w-1/2 bg-white">
          <img
            src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Casino T-Shirt - White"
            className="w-full h-64 md:h-full object-cover"
          />
          
          {/* Thumbnail Images */}
          <div className="flex p-4 space-x-2 bg-white">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/570966${i}/pexels-photo-570966${i}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt={`Product view ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 text-white">
          <div className="mb-2">
            <span className="text-sm opacity-80">CLOTHING</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">CASINO T-SHIRT - WHITE</h2>
          
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold">$45.99</span>
            <span className="text-lg line-through opacity-60 ml-2">$55.19</span>
          </div>

          {/* Features */}
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <Shield className="mx-auto mb-1" size={20} />
              <span className="text-xs">Premium Materials</span>
            </div>
            <div className="text-center">
              <Truck className="mx-auto mb-1" size={20} />
              <span className="text-xs">Express Shipping</span>
            </div>
            <div className="text-center">
              <Gift className="mx-auto mb-1" size={20} />
              <span className="text-xs">Gift Wrapping</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full bg-white text-purple-800 py-3 rounded-md font-medium flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            
            <button
              style={getButtonStyle()}
              className="w-full py-3 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              <Store size={20} className="mr-2" />
              {modalSettings.visitStoreButton.text}
            </button>
          </div>

          {/* Customer Reviews */}
          {modalSettings.showReviews && (
            <div>
              <h3 className="font-medium mb-3">Customer Reviews</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Sarah M."
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium">Sarah M.</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      The quality and style are absolutely divine! Perfect for any occasion.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Emma W."
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium">Emma W.</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      Exceeded my expectations. The fit is perfect!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
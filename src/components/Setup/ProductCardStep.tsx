import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';

const ProductCardStep: React.FC = () => {
  const { 
    customization, 
    updateProductCardSettings, 
    setCurrentSetupStep, 
    setCustomizationMode 
  } = useCustomization();
  const { productCardSettings } = customization;

  const handleNext = () => {
    setCurrentSetupStep('productModal');
    setCustomizationMode('productModal');
  };

  const handleBack = () => {
    setCurrentSetupStep('welcome');
    setCustomizationMode('welcome');
  };

  const sampleProducts = [
    {
      name: 'Premium Wireless Headphones',
      price: '$199.99',
      originalPrice: '$249.99',
      image: 'https://images.pexels.com/photos/5625005/pexels-photo-5625005.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4,
    },
    {
      name: 'Smart Fitness Watch',
      price: '$299.99',
      originalPrice: '$399.99',
      image: 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Settings Panel */}
      <div className="w-96 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Welcome
          </button>
          <div className="flex items-center mb-2">
            <Palette className="text-blue-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Product Card Style</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Customize how your products appear across the platform
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 1 of 3</span>
            <span>33%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Brand Glow Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productCardSettings.glowColor}
                onChange={(e) => updateProductCardSettings({ glowColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productCardSettings.glowColor}
                </div>
                <div className="text-xs text-gray-500">
                  Hover glow effect color
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Button Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productCardSettings.buttonColor}
                onChange={(e) => updateProductCardSettings({ buttonColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productCardSettings.buttonColor}
                </div>
                <div className="text-xs text-gray-500">
                  Add to Cart & View Store buttons
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Why This Matters</h4>
            <p className="text-xs text-blue-700">
              These colors will represent your brand across all product displays on OraSpot, 
              ensuring consistent brand recognition while maintaining platform quality.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Continue to Product Modal
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Live Preview</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {sampleProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                style={{
                  filter: `drop-shadow(0 0 20px ${productCardSettings.glowColor}40)`,
                }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -20%
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="w-full py-2 rounded-md text-white text-sm font-medium transition-colors"
                      style={{ backgroundColor: productCardSettings.buttonColor }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-1">
                    <span 
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: productCardSettings.buttonColor }}
                    >
                      Electronics
                    </span>
                  </div>

                  <h3 className="font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>

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
                    <span className="text-xs text-gray-500 ml-1">(124)</span>
                  </div>

                  <div className="flex items-center">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: productCardSettings.buttonColor }}
                    >
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Preview Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Hover over cards to see the glow effect in action</li>
              <li>• Button colors will appear on "Add to Cart" and category labels</li>
              <li>• These styles will be consistent across all your products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardStep;
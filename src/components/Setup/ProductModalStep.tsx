import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ArrowLeft, ArrowRight, Layout, X, ShoppingCart, Store } from 'lucide-react';

const ProductModalStep: React.FC = () => {
  const { 
    customization, 
    updateProductModalSettings, 
    setCurrentSetupStep, 
    setCustomizationMode 
  } = useCustomization();
  const { productModalSettings } = customization;

  const handleNext = () => {
    setCurrentSetupStep('storefront');
    setCustomizationMode('storefront');
  };

  const handleBack = () => {
    setCurrentSetupStep('productCard');
    setCustomizationMode('productCard');
  };

  const getBackgroundPattern = () => {
    switch (productModalSettings.backgroundPattern) {
      case 'signature':
        return {
          backgroundImage: `
            radial-gradient(circle at 20% 80%, ${productModalSettings.accentColor}10 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${productModalSettings.accentColor}15 0%, transparent 50%)
          `,
        };
      case 'minimal':
        return {
          backgroundImage: `linear-gradient(135deg, ${productModalSettings.backgroundColor} 0%, ${productModalSettings.accentColor}05 100%)`,
        };
      default:
        return {};
    }
  };

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
            Back to Product Cards
          </button>
          <div className="flex items-center mb-2">
            <Layout className="text-indigo-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Product Modal Design</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Style your product detail modals
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 2 of 3</span>
            <span>67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Accent Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productModalSettings.accentColor}
                onChange={(e) => updateProductModalSettings({ accentColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productModalSettings.accentColor}
                </div>
                <div className="text-xs text-gray-500">
                  Highlights and buttons
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Border Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productModalSettings.borderColor}
                onChange={(e) => updateProductModalSettings({ borderColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productModalSettings.borderColor}
                </div>
                <div className="text-xs text-gray-500">
                  Modal border and dividers
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productModalSettings.backgroundColor}
                onChange={(e) => updateProductModalSettings({ backgroundColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productModalSettings.backgroundColor}
                </div>
                <div className="text-xs text-gray-500">
                  Modal background
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Text Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={productModalSettings.textColor}
                onChange={(e) => updateProductModalSettings({ textColor: e.target.value })}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {productModalSettings.textColor}
                </div>
                <div className="text-xs text-gray-500">
                  Main text color
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background Pattern
            </label>
            <div className="space-y-2">
              {[
                { value: 'none', label: 'None' },
                { value: 'signature', label: 'Signature Style' },
                { value: 'minimal', label: 'Minimal Gradient' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProductModalSettings({ backgroundPattern: option.value as any })}
                  className={`w-full p-3 text-left border rounded-lg transition-colors ${
                    productModalSettings.backgroundPattern === option.value
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Continue to Storefront
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 p-8 bg-gray-900 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <h3 className="text-xl font-semibold text-white mb-6">Live Preview</h3>
          
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-3xl mx-auto"
            style={{ 
              backgroundColor: productModalSettings.backgroundColor,
              border: `2px solid ${productModalSettings.borderColor}`,
              ...getBackgroundPattern()
            }}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Product"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6" style={{ color: productModalSettings.textColor }}>
                <div className="mb-2">
                  <span 
                    className="text-sm font-medium uppercase tracking-wide"
                    style={{ color: productModalSettings.accentColor }}
                  >
                    ELECTRONICS
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Premium Wireless Headphones</h2>
                
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold" style={{ color: productModalSettings.accentColor }}>
                    $199.99
                  </span>
                  <span className="text-lg line-through opacity-60 ml-2">$249.99</span>
                </div>

                <div className="space-y-3 mb-6">
                  <button 
                    className="w-full py-3 rounded-md text-white font-medium flex items-center justify-center"
                    style={{ backgroundColor: productModalSettings.accentColor }}
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    className="w-full py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                    style={{ 
                      border: `2px solid ${productModalSettings.accentColor}`,
                      color: productModalSettings.accentColor,
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Store size={20} className="mr-2" />
                    Visit Store
                  </button>
                </div>

                <div className="text-sm opacity-75">
                  <p>High-quality wireless headphones with premium sound and comfort.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h4 className="font-medium text-white mb-2">Preview Notes:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• This modal appears when customers click on your products</li>
              <li>• "Visit Store" button automatically links to your OraSpot store</li>
              <li>• Clean, minimal design maintains platform consistency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalStep;
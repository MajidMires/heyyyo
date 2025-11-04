import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { Store, Palette, LayoutGrid as Layout, CheckCircle } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const { setCustomizationMode, setCurrentSetupStep } = useCustomization();

  const handleStartSetup = () => {
    setCurrentSetupStep('productCard');
    setCustomizationMode('productCard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
          <Store className="mx-auto mb-4 text-white" size={64} />
          <h1 className="text-4xl font-bold text-white mb-4">Your OraSpot Store Journey</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Create a stunning storefront that showcases your brand. Shoppers see you, not OraSpot.
          </p>
        </div>

        {/* Setup Steps */}
        <div className="px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">3 Simple Setup Phases</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Product Card Style</h3>
              <p className="text-gray-600">
                Customize your brand's glow color and button style for product cards across the platform.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Product Modal Design</h3>
              <p className="text-gray-600">
                Style your product modals with custom colors, borders, and background patterns.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Build Storefront</h3>
              <p className="text-gray-600">
                Create your homepage with up to 5 customizable sections, images, and videos.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              What You'll Get
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                A fully customized storefront that reflects your brand
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                Consistent brand colors across all product displays
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                Professional product modals and cards
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                Mobile-optimized design for all devices
              </li>
            </ul>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleStartSetup}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Store Setup
            </button>
            <p className="text-gray-500 text-sm mt-4">Takes about 5-10 minutes to complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
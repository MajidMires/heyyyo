import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { getTemplateById } from '../../data/templates';
import StorefrontHeader from './StorefrontHeader';
import ImageWithText from './elements/ImageWithText';
import Slideshow from './elements/Slideshow';
import Collection from './elements/Collection';
import Banner from './elements/Banner';
import Featured from './elements/Featured';
import ProductModal from './ProductModal';
import ProductCardPreview from './ProductCardPreview';
import { Home, Smartphone, Monitor } from 'lucide-react';

const Preview: React.FC = () => {
  const { 
    customization, 
    customizationMode, 
    setCustomizationMode, 
    isMobileView, 
    setIsMobileView 
  } = useCustomization();
  const { elements, globalSettings } = customization;

  const renderElement = (element: any) => {
    const template = getTemplateById(element.templateId);
    if (!template) return null;

    const props = {
      key: element.id,
      settings: element.settings || {},
      templateId: element.templateId,
      buttons: element.buttons || [],
      sectionStyle: element.sectionStyle,
    };

    switch (template.type) {
      case 'imageWithText':
        return <ImageWithText {...props} />;
      case 'slideshow':
        return <Slideshow {...props} />;
      case 'collection':
        return <Collection {...props} />;
      case 'banner':
        return <Banner {...props} />;
      case 'featured':
        return <Featured {...props} />;
      default:
        return null;
    }
  };

  const handleModeChange = (mode: 'modal' | 'productCard') => {
    setCustomizationMode(mode);
  };

  const handleBackToStorefront = () => {
    setCustomizationMode('storefront');
  };

  const getPreviewContainerClass = () => {
    if (customizationMode === 'modal') {
      return 'w-full h-full overflow-auto flex items-center justify-center bg-gray-900 p-4';
    }
    if (customizationMode === 'productCard') {
      return 'w-full h-full overflow-auto flex flex-col bg-gray-50';
    }
    
    // Storefront mode with mobile/desktop toggle
    if (isMobileView) {
      return 'w-full h-full flex items-center justify-center bg-gray-100 p-4';
    }
    return 'w-full h-full overflow-auto flex flex-col';
  };

  const getContentContainerClass = () => {
    if (isMobileView && customizationMode === 'storefront') {
      return 'w-[375px] h-[667px] bg-white rounded-lg shadow-xl overflow-auto';
    }
    return 'w-full h-full';
  };

  if (customizationMode === 'modal') {
    return (
      <div className={getPreviewContainerClass()}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBackToStorefront}
              className="flex items-center px-3 py-2 text-sm bg-white hover:bg-gray-100 rounded-md transition-colors"
            >
              <Home size={16} className="mr-1" />
              Back to Storefront
            </button>
            <h2 className="text-lg font-semibold text-white">Modal Preview</h2>
          </div>
          <ProductModal />
        </div>
      </div>
    );
  }

  if (customizationMode === 'productCard') {
    return (
      <div className={getPreviewContainerClass()}>
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Product Card Preview</h2>
            <button
              onClick={handleBackToStorefront}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Home size={16} className="mr-1" />
              Back to Storefront
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <ProductCardPreview />
        </div>
      </div>
    );
  }

  return (
    <div className={getPreviewContainerClass()}>
      <div className={getContentContainerClass()}>
        <div
          className="w-full h-full overflow-auto flex flex-col"
          style={{
            backgroundColor: globalSettings.backgroundColor,
            fontFamily: globalSettings.fontFamily,
          }}
        >
          {/* Mobile/Desktop Toggle */}
          {customizationMode === 'storefront' && !isMobileView && (
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-white rounded-lg shadow-md p-2">
              <button
                onClick={() => setIsMobileView(false)}
                className={`p-2 rounded-md transition-colors ${
                  !isMobileView ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setIsMobileView(true)}
                className={`p-2 rounded-md transition-colors ${
                  isMobileView ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Mobile View"
              >
                <Smartphone size={16} />
              </button>
            </div>
          )}

          {/* Mobile view back button */}
          {isMobileView && (
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => setIsMobileView(false)}
                className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-100"
                title="Exit Mobile View"
              >
                <Monitor size={16} />
              </button>
            </div>
          )}

          <StorefrontHeader
            logo={globalSettings.logo}
            banner={globalSettings.banner}
            primaryColor={globalSettings.primaryColor}
          />
          
          {elements.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <p className="text-gray-500 mb-2">
                  Your storefront preview will appear here.
                </p>
                <p className="text-gray-400 text-sm">
                  Add sections from the sidebar to customize your store.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              {elements
                .sort((a, b) => a.order - b.order)
                .map(renderElement)}
            </div>
          )}
          
          {elements.length > 0 && (
            <footer className="py-8 px-4 bg-gray-100 text-center text-gray-500 text-sm">
              <div className="container mx-auto">
                <div className="flex items-center justify-center space-x-4">
                  <span>© 2025 Your Store. All rights reserved.</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleModeChange('modal')}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Modal
                    </button>
                    <button
                      onClick={() => handleModeChange('productCard')}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                      Product Card
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
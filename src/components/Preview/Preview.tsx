import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { getTemplateById } from '../../data/templates';
import WelcomeStep from '../Setup/WelcomeStep';
import ProductCardStep from '../Setup/ProductCardStep';
import ProductModalStep from '../Setup/ProductModalStep';
import StorefrontHeader from './StorefrontHeader';
import ImageWithText from './elements/ImageWithText';
import Slideshow from './elements/Slideshow';
import Collection from './elements/Collection';
import Banner from './elements/Banner';
import Featured from './elements/Featured';
import { Home, Smartphone, Monitor } from 'lucide-react';

const Preview: React.FC = () => {
  const { 
    customization, 
    customizationMode, 
    isMobileView, 
    setIsMobileView 
  } = useCustomization();
  const { elements, globalSettings } = customization;

  // Show setup steps based on customization mode
  if (customizationMode === 'welcome') {
    return <WelcomeStep />;
  }

  if (customizationMode === 'productCard') {
    return <ProductCardStep />;
  }

  if (customizationMode === 'productModal') {
    return <ProductModalStep />;
  }

  const renderElement = (element: any) => {
    const template = getTemplateById(element.templateId);
    if (!template) return null;

    const props = {
      key: element.id,
      settings: element.settings || {},
      templateId: element.templateId,
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

  const getPreviewContainerClass = () => {
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
          {!isMobileView && (
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
        </div>
      </div>
    </div>
  );
};

export default Preview;
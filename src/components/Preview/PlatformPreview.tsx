import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { Search, Home, Play, User, Grid3X3, Store } from 'lucide-react';
import StorefrontHeader from './StorefrontHeader';
import ImageWithText from './elements/ImageWithText';
import Slideshow from './elements/Slideshow';
import Collection from './elements/Collection';
import Banner from './elements/Banner';
import Featured from './elements/Featured';
import { getTemplateById } from '../../data/templates';

const PlatformPreview: React.FC = () => {
  const { customization } = useCustomization();
  const { elements, globalSettings } = customization;

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

  return (
    <div className="w-full h-full bg-gray-900 flex">
      {/* Left Sidebar */}
      <div className="w-52 h-full bg-[#2A2A2A] flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="w-8 h-8 bg-[#f55c94] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 rounded-full bg-[#f55c94] text-white">
              <Home size={16} className="mr-3" />
              <span className="text-sm font-medium">Home</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors">
              <Play size={16} className="mr-3" />
              <span className="text-sm font-medium">Discover Videos</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors">
              <User size={16} className="mr-3" />
              <span className="text-sm font-medium">UGC Profile</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors">
              <Grid3X3 size={16} className="mr-3" />
              <span className="text-sm font-medium">Shop Categories</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors">
              <Store size={16} className="mr-3" />
              <span className="text-sm font-medium">Sell on OraSpot</span>
            </div>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-gray-600">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors">
              <div className="w-4 h-4 mr-3 border border-white rounded"></div>
              <span className="text-sm font-medium">Settings</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-full text-red-400 hover:bg-gray-700 transition-colors">
              <div className="w-4 h-4 mr-3">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 3h10v1H3V3zm0 2h10v1H3V5zm0 2h7v1H3V7z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full flex flex-col">
        {/* Top Header */}
        <div className="h-16 bg-[#2A2A2A] flex items-center justify-center px-6">
          <div className="relative max-w-md w-full">
            <div className="h-[57px] bg-[#3A3A3A] rounded-full flex items-center px-4 pr-12">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              />
              <button className="absolute right-2 w-10 h-10 bg-[#f55c94] rounded-full flex items-center justify-center">
                <Search size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Store Content Area */}
        <div className="flex-1 bg-black overflow-auto">
          <div
            className="w-full h-full"
            style={{
              backgroundColor: globalSettings.backgroundColor,
              fontFamily: globalSettings.fontFamily,
            }}
          >
            <StorefrontHeader
              logo={globalSettings.logo}
              banner={globalSettings.banner}
              primaryColor={globalSettings.primaryColor}
            />
            
            {elements.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <p className="text-gray-500 mb-2">
                    Your store preview will appear here.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Add sections to see how your store looks on the platform.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {elements
                  .sort((a, b) => a.order - b.order)
                  .map(renderElement)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformPreview;
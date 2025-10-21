import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ElementType } from '../../types';
import ElementSelector from './ElementSelector';
import ElementSettings from './ElementSettings';
import GlobalSettings from './GlobalSettings';
import SectionsList from './SectionsList';
import ModalSettings from './ModalSettings';
import ProductCardSettings from './ProductCardSettings';
import MenuSettings from './MenuSettings';
import { Settings, Palette, Layers, Plus, ArrowLeft } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { 
    selectedElementId, 
    customization, 
    customizationMode, 
    sidebarView, 
    setSidebarView,
    setSelectedElementId 
  } = useCustomization();
  
  const [activeTab, setActiveTab] = useState<'add' | 'sections' | 'settings'>('add');
  const [settingsTab, setSettingsTab] = useState<'theme' | 'menu'>('theme');
  const [elementTypeFilter, setElementTypeFilter] = useState<ElementType | null>(null);

  const elementCount = customization.elements.length;
  const maxReached = elementCount >= 5;

  const handleBackToSections = () => {
    setSidebarView('sections');
    setSelectedElementId(null);
  };

  const getSidebarTitle = () => {
    switch (customizationMode) {
      case 'modal':
        return 'Modal Customization';
      case 'productCard':
        return 'Product Card Customization';
      default:
        return 'Storefront Customization';
    }
  };

  const renderStorefrontContent = () => {
    if (sidebarView === 'sectionSettings' && selectedElementId) {
      return (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleBackToSections}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Sections
            </button>
            <h3 className="text-lg font-medium text-gray-800">Section Settings</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ElementSettings elementId={selectedElementId} />
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'add' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('add')}
          >
            <div className="flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              Add Sections
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'sections' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('sections')}
          >
            <div className="flex items-center justify-center">
              <Layers size={16} className="mr-1" />
              Sections
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <div className="flex items-center justify-center">
              <Palette size={16} className="mr-1" />
              Theme
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'add' && (
            <div className="p-4">
              {maxReached ? (
                <div className="bg-yellow-50 p-4 rounded-md mb-4">
                  <p className="text-yellow-700 text-sm">
                    You've reached the maximum of 5 sections. Remove a section to add a new one.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === null
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter(null)}
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === 'imageWithText'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter('imageWithText')}
                    >
                      Image with Text
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === 'slideshow'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter('slideshow')}
                    >
                      Slideshow
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === 'collection'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter('collection')}
                    >
                      Collections
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === 'banner'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter('banner')}
                    >
                      Banners
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                        elementTypeFilter === 'featured'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setElementTypeFilter('featured')}
                    >
                      Featured
                    </button>
                  </div>
                  <ElementSelector typeFilter={elementTypeFilter} />
                </>
              )}
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="p-4">
              <SectionsList />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSettingsTab('theme')}
                    className={`px-3 py-2 text-xs rounded-md ${
                      settingsTab === 'theme'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Theme
                  </button>
                  <button
                    onClick={() => setSettingsTab('menu')}
                    className={`px-3 py-2 text-xs rounded-md ${
                      settingsTab === 'menu'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Menu
                  </button>
                </div>
                
                {settingsTab === 'theme' && <GlobalSettings />}
                {settingsTab === 'menu' && <MenuSettings />}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{getSidebarTitle()}</h2>
        {customizationMode === 'storefront' && (
          <p className="text-sm text-gray-500">
            {elementCount}/5 sections added
          </p>
        )}
      </div>

      {customizationMode === 'storefront' && renderStorefrontContent()}
      
      {customizationMode === 'modal' && (
        <div className="flex-1 overflow-y-auto p-4">
          <ModalSettings />
        </div>
      )}
      
      {customizationMode === 'productCard' && (
        <div className="flex-1 overflow-y-auto p-4">
          <ProductCardSettings />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
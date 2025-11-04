import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ElementType } from '../../types';
import ElementSelector from './ElementSelector';
import ElementSettings from './ElementSettings';
import GlobalSettings from './GlobalSettings';
import SectionsList from './SectionsList';
import { Settings, Palette, Layers, Plus, ArrowLeft, CheckCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { 
    selectedElementId, 
    customization, 
    customizationMode, 
    sidebarView, 
    setSidebarView,
    setSelectedElementId,
    completeSetupStep,
    setCustomizationMode
  } = useCustomization();
  
  const [activeTab, setActiveTab] = useState<'add' | 'sections' | 'settings'>('add');
  const [elementTypeFilter, setElementTypeFilter] = useState<ElementType | null>(null);

  const elementCount = customization.elements.length;
  const maxReached = elementCount >= 5;

  const handleBackToSections = () => {
    setSidebarView('sections');
    setSelectedElementId(null);
  };

  const handleCompleteSetup = () => {
    completeSetupStep('complete');
    // Could redirect to a success page or dashboard
    alert('Store setup complete! Your storefront is ready.');
  };

  // Only show sidebar for storefront mode
  if (customizationMode !== 'storefront') {
    return null;
  }

  const renderContent = () => {
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
              <GlobalSettings />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Build Your Storefront</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {elementCount}/5 sections added
          </p>
          {elementCount > 0 && (
            <button
              onClick={handleCompleteSetup}
              className="flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
            >
              <CheckCircle size={14} className="mr-1" />
              Complete Setup
            </button>
          )}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';

const GlobalSettings: React.FC = () => {
  const { customization, updateGlobalSettings } = useCustomization();
  const { globalSettings } = customization;

  const handleColorChange = (key: keyof typeof globalSettings, value: string) => {
    updateGlobalSettings({ [key]: value });
  };

  const handleFontChange = (value: string) => {
    updateGlobalSettings({ fontFamily: value });
  };

  const handleLogoChange = (value: string) => {
    updateGlobalSettings({ logo: value });
  };

  const handleBannerChange = (value: string) => {
    updateGlobalSettings({ banner: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Colors</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={globalSettings.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{globalSettings.backgroundColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Primary Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={globalSettings.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{globalSettings.primaryColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Secondary Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={globalSettings.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{globalSettings.secondaryColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Typography</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Font Family</label>
            <select
              value={globalSettings.fontFamily}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Branding</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Logo URL</label>
            <input
              type="text"
              value={globalSettings.logo || ''}
              onChange={(e) => handleLogoChange(e.target.value)}
              placeholder="Enter logo image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            {globalSettings.logo && (
              <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                <img
                  src={globalSettings.logo}
                  alt="Logo Preview"
                  className="h-10 object-contain mx-auto"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Banner URL</label>
            <input
              type="text"
              value={globalSettings.banner || ''}
              onChange={(e) => handleBannerChange(e.target.value)}
              placeholder="Enter banner image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            {globalSettings.banner && (
              <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                <img
                  src={globalSettings.banner}
                  alt="Banner Preview"
                  className="w-full h-20 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
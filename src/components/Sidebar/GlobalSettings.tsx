import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import ImageInput from './ImageInput';

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
              style={{ fontFamily: globalSettings.fontFamily }}
            >
              <optgroup label="Sans Serif">
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Nunito', sans-serif">Nunito</option>
                <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Raleway', sans-serif">Raleway</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Work Sans', sans-serif">Work Sans</option>
                <option value="'Fira Sans', sans-serif">Fira Sans</option>
                <option value="'IBM Plex Sans', sans-serif">IBM Plex Sans</option>
                <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                <option value="'Rubik', sans-serif">Rubik</option>
                <option value="'Karla', sans-serif">Karla</option>
                <option value="'PT Sans', sans-serif">PT Sans</option>
                <option value="'Ubuntu', sans-serif">Ubuntu</option>
                <option value="'Mukta', sans-serif">Mukta</option>
                <option value="'Barlow', sans-serif">Barlow</option>
                <option value="'Quicksand', sans-serif">Quicksand</option>
                <option value="'Comfortaa', sans-serif">Comfortaa</option>
              </optgroup>
              <optgroup label="Serif">
                <option value="'Merriweather', serif">Merriweather</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="'Crimson Text', serif">Crimson Text</option>
                <option value="'Libre Baskerville', serif">Libre Baskerville</option>
              </optgroup>
              <optgroup label="Display">
                <option value="'Oswald', sans-serif">Oswald</option>
                <option value="'Bebas Neue', cursive">Bebas Neue</option>
                <option value="'Abril Fatface', cursive">Abril Fatface</option>
                <option value="'Righteous', cursive">Righteous</option>
                <option value="'Fredoka One', cursive">Fredoka One</option>
              </optgroup>
              <optgroup label="Script & Decorative">
                <option value="'Dancing Script', cursive">Dancing Script</option>
                <option value="'Pacifico', cursive">Pacifico</option>
                <option value="'Lobster', cursive">Lobster</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Branding</h3>
        <div className="space-y-4">
          <ImageInput
            label="Logo URL"
            value={globalSettings.logo || ''}
            onChange={(value) => handleLogoChange(value)}
            placeholder="Enter logo image URL"
          />

          <ImageInput
            label="Banner URL"
            value={globalSettings.banner || ''}
            onChange={(value) => handleBannerChange(value)}
            placeholder="Enter banner image URL"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
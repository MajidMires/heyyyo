import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';

const ProductCardSettings: React.FC = () => {
  const { customization, updateProductCardSettings } = useCustomization();
  const { productCardSettings } = customization;

  const handleSettingChange = (key: keyof typeof productCardSettings, value: string | boolean) => {
    updateProductCardSettings({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Hover Effects</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Glow Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={productCardSettings.glowColor}
                onChange={(e) => handleSettingChange('glowColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{productCardSettings.glowColor}</span>
            </div>
            <p className="text-xs text-gray-500">
              Hover effect is set to glow for consistency. Only the glow color can be customized.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Typography</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Font Family</label>
            <select
              value={productCardSettings.fontFamily}
              onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
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
        <h3 className="text-sm font-medium text-gray-800 mb-3">Colors</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Accent Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={productCardSettings.accentColor}
                onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{productCardSettings.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Shadows</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Shadow Intensity</label>
            <div className="flex space-x-2">
              {['light', 'medium', 'strong'].map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => handleSettingChange('shadowIntensity', intensity)}
                  className={`px-3 py-2 text-xs rounded-md border capitalize ${
                    productCardSettings.shadowIntensity === intensity
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  {intensity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Display Options</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showRating"
              checked={productCardSettings.showRating}
              onChange={(e) => handleSettingChange('showRating', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="showRating" className="text-xs font-medium text-gray-700">
              Show Rating
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPriceChange"
              checked={productCardSettings.showPriceChange}
              onChange={(e) => handleSettingChange('showPriceChange', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="showPriceChange" className="text-xs font-medium text-gray-700">
              Show Price Change (Original Price)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showInStock"
              checked={productCardSettings.showInStock}
              onChange={(e) => handleSettingChange('showInStock', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="showInStock" className="text-xs font-medium text-gray-700">
              Show In Stock Status
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Hiding these elements will make the product image appear larger in the card.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Product card structure (image position, pricing, add to cart button) is locked for platform consistency. Only styling can be customized.
        </p>
      </div>
    </div>
  );
};

export default ProductCardSettings;
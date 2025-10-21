import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';

const ModalSettings: React.FC = () => {
  const { customization, updateModalSettings } = useCustomization();
  const { modalSettings } = customization;

  const handleColorChange = (key: keyof typeof modalSettings, value: string) => {
    updateModalSettings({ [key]: value });
  };

  const handleToggle = (key: keyof typeof modalSettings, value: boolean) => {
    updateModalSettings({ [key]: value });
  };

  const handleButtonSettingChange = (key: string, value: string) => {
    updateModalSettings({
      visitStoreButton: {
        ...modalSettings.visitStoreButton,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Background</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={modalSettings.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{modalSettings.backgroundColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Pattern</label>
            <select
              value={modalSettings.backgroundPattern}
              onChange={(e) => updateModalSettings({ backgroundPattern: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="none">None</option>
              <option value="dots">Dot Pattern</option>
              <option value="stripes">Stripe Overlay</option>
              <option value="gradient">Gradient</option>
              <option value="abstract">Abstract Shapes</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Layout</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Product Image Position</label>
            <div className="flex space-x-2">
              <button
                onClick={() => updateModalSettings({ imagePosition: 'left' })}
                className={`px-3 py-2 text-xs rounded-md border ${
                  modalSettings.imagePosition === 'left'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                Left
              </button>
              <button
                onClick={() => updateModalSettings({ imagePosition: 'right' })}
                className={`px-3 py-2 text-xs rounded-md border ${
                  modalSettings.imagePosition === 'right'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                Right
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Visit Store Button</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              value={modalSettings.visitStoreButton.text}
              onChange={(e) => handleButtonSettingChange('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Button Style</label>
            <div className="flex space-x-2">
              {['outline', 'ghost', 'filled'].map((style) => (
                <button
                  key={style}
                  onClick={() => handleButtonSettingChange('style', style)}
                  className={`px-3 py-2 text-xs rounded-md border capitalize ${
                    modalSettings.visitStoreButton.style === style
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Button Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={modalSettings.visitStoreButton.color}
                onChange={(e) => handleButtonSettingChange('color', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{modalSettings.visitStoreButton.color}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Features</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showReviews"
              checked={modalSettings.showReviews}
              onChange={(e) => handleToggle('showReviews', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="showReviews" className="text-xs font-medium text-gray-700">
              Show Customer Reviews
            </label>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Note:</strong> The "Add to Cart" button style is locked for consistency across all sellers.
        </p>
      </div>
    </div>
  );
};

export default ModalSettings;
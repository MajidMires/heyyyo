import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';

const MenuSettings: React.FC = () => {
  const { customization, updateMenuSettings } = useCustomization();
  const { menuSettings } = customization;

  const handleTemplateChange = (template: string) => {
    updateMenuSettings({ template: template as any });
  };

  const handleSettingChange = (key: keyof typeof menuSettings, value: any) => {
    updateMenuSettings({ [key]: value });
  };

  const handleMenuItemsChange = (items: string) => {
    if (items.trim() === '') {
      updateMenuSettings({ menuItems: [] });
      return;
    }
    const menuItems = items.split(',').map(item => item.trim()).filter(item => item.length > 0);
    updateMenuSettings({ menuItems });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Menu Template</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'standard', name: 'Standard', desc: 'Logo left, menu center, icons right' },
            { id: 'centered', name: 'Centered', desc: 'Logo center, menu below' },
            { id: 'minimal', name: 'Minimal', desc: 'Clean layout with minimal elements' },
            { id: 'overlay', name: 'Overlay', desc: 'Transparent overlay on hero section' },
            { id: 'transparent', name: 'Transparent', desc: 'Fully transparent background' },
          ].map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`p-3 text-left border rounded-md transition-colors ${
                menuSettings.template === template.id
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{template.name}</div>
              <div className="text-xs text-gray-500">{template.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Logo Position</h3>
        <div className="flex space-x-2">
          {['left', 'center', 'right'].map((position) => (
            <button
              key={position}
              onClick={() => handleSettingChange('logoPosition', position)}
              className={`px-3 py-2 text-xs rounded-md border capitalize ${
                menuSettings.logoPosition === position
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-3">Appearance</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Opacity ({menuSettings.opacity}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={menuSettings.opacity}
              onChange={(e) => handleSettingChange('opacity', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={menuSettings.backgroundColor}
                onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{menuSettings.backgroundColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={menuSettings.textColor}
                onChange={(e) => handleSettingChange('textColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-500">{menuSettings.textColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Font Family</label>
            <select
              value={menuSettings.fontFamily}
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
        <h3 className="text-sm font-medium text-gray-800 mb-3">Menu Items</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Menu Items (comma separated)
            </label>
            <textarea
              type="text"
              value={menuSettings.menuItems.join(', ')}
              onChange={(e) => handleMenuItemsChange(e.target.value)}
              placeholder="Home, Shop, Collections, About, Contact"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showSearch"
                checked={menuSettings.showSearch}
                onChange={(e) => handleSettingChange('showSearch', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="showSearch" className="text-xs font-medium text-gray-700">
                Show Search
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showCart"
                checked={menuSettings.showCart}
                onChange={(e) => handleSettingChange('showCart', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="showCart" className="text-xs font-medium text-gray-700">
                Show Cart
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSettings;
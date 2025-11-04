import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { getTemplateById } from '../../data/templates';
import { Trash2, Settings, Palette } from 'lucide-react';
import SectionStyler from './SectionStyler';

interface ElementSettingsProps {
  elementId: string;
}

const ElementSettings: React.FC<ElementSettingsProps> = ({ elementId }) => {
  const { customization, updateElementSettings, removeElement, updateElementSectionStyle } = useCustomization();
  const [activeTab, setActiveTab] = React.useState<'content' | 'style'>('content');

  const element = customization.elements.find((el) => el.id === elementId);
  if (!element) return null;

  const template = getTemplateById(element.templateId);
  if (!template) return null;

  const handleTextChange = (key: string, value: string) => {
    updateElementSettings(elementId, { [key]: value });
  };

  const handleColorChange = (key: string, value: string) => {
    updateElementSettings(elementId, { [key]: value });
  };

  const handleImageChange = (key: string, value: string) => {
    updateElementSettings(elementId, { [key]: value });
  };

  const handleToggle = (key: string, value: boolean) => {
    updateElementSettings(elementId, { [key]: value });
  };

  const settings = element.settings || {};
  const sectionStyle = element.sectionStyle;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800">{template.name}</h3>
        <button
          onClick={() => removeElement(elementId)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-3 text-sm font-medium ${
            activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          <Settings size={14} className="inline mr-1" />
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 px-3 text-sm font-medium ${
            activeTab === 'style' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          <Palette size={14} className="inline mr-1" />
          Style
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Common settings based on element type */}
        {template.type === 'imageWithText' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={settings.heading || 'Your Heading Here'}
                onChange={(e) => handleTextChange('heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtext</label>
              <textarea
                value={settings.subtext || 'Your descriptive text goes here. Engage your customers with compelling copy.'}
                onChange={(e) => handleTextChange('subtext', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={settings.imageUrl || 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800'}
                onChange={(e) => handleImageChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Font Size</label>
              <select
                value={settings.fontSize || 'medium'}
                onChange={(e) => handleTextChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Text Position</label>
              <select
                value={settings.textPosition || 'bottom-center'}
                onChange={(e) => handleTextChange('textPosition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="center">Center</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="top-center">Top Center</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="left">Left Side</option>
                <option value="right">Right Side</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Background Image/Video URL</label>
              <input
                type="text"
                value={settings.backgroundMedia || ''}
                onChange={(e) => handleTextChange('backgroundMedia', e.target.value)}
                placeholder="https://example.com/image.jpg or video.mp4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.textColor || '#000000'}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded"
                />
                <span className="text-xs text-gray-500">{settings.textColor || '#000000'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Font Family</label>
              <select
                value={settings.fontFamily || 'Inter, sans-serif'}
                onChange={(e) => handleTextChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Nunito', sans-serif">Nunito</option>
                <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Oswald', sans-serif">Oswald</option>
                <option value="'Raleway', sans-serif">Raleway</option>
                <option value="'Merriweather', serif">Merriweather</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="'Crimson Text', serif">Crimson Text</option>
                <option value="'Libre Baskerville', serif">Libre Baskerville</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Dancing Script', cursive">Dancing Script</option>
                <option value="'Pacifico', cursive">Pacifico</option>
                <option value="'Righteous', cursive">Righteous</option>
              </select>
            </div>
          </>
        )}

        {template.type === 'slideshow' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Slide Delay (ms)</label>
              <input
                type="number"
                value={settings.slideDelay || 5000}
                onChange={(e) => handleTextChange('slideDelay', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {[1, 2, 3, 4, 5].map((slideNum) => (
              <div key={slideNum} className="space-y-2 p-3 border border-gray-200 rounded-md">
                <h4 className="text-sm font-medium text-gray-800">Slide {slideNum}</h4>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={settings[`slide${slideNum}Url`] || `https://images.pexels.com/photos/570966${slideNum}/pexels-photo-570966${slideNum}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    onChange={(e) => handleImageChange(`slide${slideNum}Url`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Heading</label>
                  <input
                    type="text"
                    value={settings[`slide${slideNum}Heading`] || `Slide ${slideNum} Heading`}
                    onChange={(e) => handleTextChange(`slide${slideNum}Heading`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {template.type === 'collection' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Collection Title</label>
              <input
                type="text"
                value={settings.title || 'Featured Collection'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Items Per Row</label>
              <select
                value={settings.itemsPerRow || '3'}
                onChange={(e) => handleTextChange('itemsPerRow', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showPrices"
                checked={settings.showPrices !== false}
                onChange={(e) => handleToggle('showPrices', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="showPrices" className="text-xs font-medium text-gray-700">
                Show Prices
              </label>
            </div>
          </>
        )}

        {template.type === 'banner' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Banner Text</label>
              <input
                type="text"
                value={settings.text || 'Special Promotion: 20% Off All Products!'}
                onChange={(e) => handleTextChange('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.backgroundColor || '#3B82F6'}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded"
                />
                <span className="text-xs text-gray-500">{settings.backgroundColor || '#3B82F6'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.textColor || '#FFFFFF'}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded"
                />
                <span className="text-xs text-gray-500">{settings.textColor || '#FFFFFF'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Banner Link</label>
              <input
                type="text"
                value={settings.link || '#'}
                onChange={(e) => handleTextChange('link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}

        {template.type === 'featured' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Featured Products'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {[1, 2, 3, 4, 5].map((itemNum) => (
              <div key={itemNum} className="space-y-2 p-3 border border-gray-200 rounded-md">
                <h4 className="text-sm font-medium text-gray-800">Product {itemNum}</h4>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={settings[`item${itemNum}Title`] || `Product ${itemNum}`}
                    onChange={(e) => handleTextChange(`item${itemNum}Title`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Product Image URL</label>
                  <input
                    type="text"
                    value={settings[`item${itemNum}Image`] || `https://images.pexels.com/photos/570441${itemNum}/pexels-photo-570441${itemNum}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    onChange={(e) => handleImageChange(`item${itemNum}Image`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Product Price</label>
                  <input
                    type="text"
                    value={settings[`item${itemNum}Price`] || `$${(itemNum * 10 + 19)}.99`}
                    onChange={(e) => handleTextChange(`item${itemNum}Price`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
        )}

        {activeTab === 'style' && sectionStyle && (
          <SectionStyler
            sectionStyle={sectionStyle}
            onStyleChange={(newStyle) => updateElementSectionStyle(elementId, newStyle)}
          />
        )}
      </div>
    </div>
  );
};

export default ElementSettings;
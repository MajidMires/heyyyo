import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { getTemplateById } from '../../data/templates';
import { Trash2, Settings, Palette } from 'lucide-react';
import SectionStyler from './SectionStyler';
import ButtonCustomizer from './ButtonCustomizer';

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
                value={settings.heading || ''}
                placeholder="Enter heading text (leave empty for no heading)"
                onChange={(e) => handleTextChange('heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtext</label>
              <textarea
                value={settings.subtext || ''}
                placeholder="Enter description text (leave empty for no text)"
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

            {/* Additional images for grid layouts */}
            {(element.templateId === 'image-text-20' || element.templateId === 'image-text-21' || element.templateId === 'image-text-22') && (
              <>
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Image 1</h4>
                  <div className="space-y-2 mb-3">
                    <label className="block text-xs font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={settings.image1Title || ''}
                      onChange={(e) => handleTextChange('image1Title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter title for first image"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Description</label>
                    <textarea
                      value={settings.image1Description || ''}
                      onChange={(e) => handleTextChange('image1Description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter description for first image"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Image 2</h4>
                  <div className="space-y-2 mb-3">
                    <label className="block text-xs font-medium text-gray-700">URL</label>
                    <input
                      type="text"
                      value={settings.image2 || 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      onChange={(e) => handleImageChange('image2', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="space-y-2 mb-3">
                    <label className="block text-xs font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={settings.image2Title || ''}
                      onChange={(e) => handleTextChange('image2Title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter title for second image"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Description</label>
                    <textarea
                      value={settings.image2Description || ''}
                      onChange={(e) => handleTextChange('image2Description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter description for second image"
                      rows={2}
                    />
                  </div>
                </div>

                {(element.templateId === 'image-text-20' || element.templateId === 'image-text-21') && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-3">Image 3</h4>
                    <div className="space-y-2 mb-3">
                      <label className="block text-xs font-medium text-gray-700">URL</label>
                      <input
                        type="text"
                        value={settings.image3 || 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        onChange={(e) => handleImageChange('image3', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2 mb-3">
                      <label className="block text-xs font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={settings.image3Title || ''}
                        onChange={(e) => handleTextChange('image3Title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter title for third image"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Description</label>
                      <textarea
                        value={settings.image3Description || ''}
                        onChange={(e) => handleTextChange('image3Description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter description for third image"
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {element.templateId === 'image-text-20' && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-3">Image 4</h4>
                    <div className="space-y-2 mb-3">
                      <label className="block text-xs font-medium text-gray-700">URL</label>
                      <input
                        type="text"
                        value={settings.image4 || 'https://images.pexels.com/photos/5816294/pexels-photo-5816294.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        onChange={(e) => handleImageChange('image4', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2 mb-3">
                      <label className="block text-xs font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={settings.image4Title || ''}
                        onChange={(e) => handleTextChange('image4Title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter title for fourth image"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Description</label>
                      <textarea
                        value={settings.image4Description || ''}
                        onChange={(e) => handleTextChange('image4Description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Enter description for fourth image"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

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
                value={settings.textPosition || 'center'}
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
              <label className="block text-xs font-medium text-gray-700">Image Aspect Ratio</label>
              <select
                value={settings.aspectRatio || 'landscape'}
                onChange={(e) => handleTextChange('aspectRatio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="square">Square (1:1)</option>
                <option value="portrait">Portrait (3:4)</option>
                <option value="landscape">Landscape (4:3)</option>
                <option value="wide">Wide (16:9)</option>
                <option value="tall">Tall (9:16)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Image Focal Point</label>
              <select
                value={settings.focalPoint || 'center'}
                onChange={(e) => handleTextChange('focalPoint', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
              <p className="text-xs text-gray-500">Control where the image focuses when cropped</p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showShadow"
                checked={settings.showShadow !== false}
                onChange={(e) => handleToggle('showShadow', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="showShadow" className="text-xs font-medium text-gray-700">
                Show Image Shadow
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Background Media URL (Image/Video)</label>
              <input
                type="text"
                value={settings.backgroundMedia || ''}
                onChange={(e) => handleTextChange('backgroundMedia', e.target.value)}
                placeholder="https://example.com/background.jpg or video.mp4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <p className="text-xs text-gray-500">
                For Hero sections: Use this for background. For other templates: Use Image URL above.
              </p>
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
                <option value="'Bebas Neue', cursive">Bebas Neue</option>
                <option value="'Abril Fatface', cursive">Abril Fatface</option>
                <option value="'Fredoka One', cursive">Fredoka One</option>
                <option value="'Lobster', cursive">Lobster</option>
                <option value="'Comfortaa', cursive">Comfortaa</option>
                <option value="'Quicksand', sans-serif">Quicksand</option>
                <option value="'Work Sans', sans-serif">Work Sans</option>
                <option value="'Fira Sans', sans-serif">Fira Sans</option>
                <option value="'IBM Plex Sans', sans-serif">IBM Plex Sans</option>
                <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Font Weight</label>
              <select
                value={settings.fontWeight || 'normal'}
                onChange={(e) => handleTextChange('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Line Height</label>
              <select
                value={settings.lineHeight || 'normal'}
                onChange={(e) => handleTextChange('lineHeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="1">Tight (1)</option>
                <option value="1.25">Snug (1.25)</option>
                <option value="1.375">Normal (1.375)</option>
                <option value="1.5">Relaxed (1.5)</option>
                <option value="1.625">Loose (1.625)</option>
                <option value="2">Extra Loose (2)</option>
              </select>
            </div>

            {/* Button Customizer for Image with Text */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">Buttons</h4>
              <ButtonCustomizer
                elementId={elementId}
                buttons={settings.buttons || []}
                onButtonsChange={(buttons) => updateElementSettings(elementId, { buttons })}
              />
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

            {/* Button Customizer for Featured */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">Buttons</h4>
              <ButtonCustomizer
                elementId={elementId}
                buttons={settings.buttons || []}
                onButtonsChange={(buttons) => updateElementSettings(elementId, { buttons })}
              />
            </div>
          </>
        )}

        {template.type === 'testimonial' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'What Our Customers Say'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoplay"
                checked={settings.autoplay !== false}
                onChange={(e) => handleToggle('autoplay', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="autoplay" className="text-xs font-medium text-gray-700">
                Auto-play Slideshow
              </label>
            </div>

            {[1, 2, 3, 4].map((testimonialNum) => (
              <div key={testimonialNum} className="space-y-2 p-3 border border-gray-200 rounded-md">
                <h4 className="text-sm font-medium text-gray-800">Testimonial {testimonialNum}</h4>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    value={settings[`testimonial${testimonialNum}Name`] || `Customer ${testimonialNum}`}
                    onChange={(e) => handleTextChange(`testimonial${testimonialNum}Name`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Role/Title</label>
                  <input
                    type="text"
                    value={settings[`testimonial${testimonialNum}Role`] || 'Customer'}
                    onChange={(e) => handleTextChange(`testimonial${testimonialNum}Role`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Testimonial Text</label>
                  <textarea
                    value={settings[`testimonial${testimonialNum}Text`] || 'Great product!'}
                    onChange={(e) => handleTextChange(`testimonial${testimonialNum}Text`, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Customer Photo URL</label>
                  <input
                    type="text"
                    value={settings[`testimonial${testimonialNum}Image`] || `https://images.pexels.com/photos/77490${testimonialNum}/pexels-photo-77490${testimonialNum}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    onChange={(e) => handleImageChange(`testimonial${testimonialNum}Image`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {template.type === 'about' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Our Story'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle || 'Building something amazing'}
                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Description</label>
              <textarea
                value={settings.description || 'We are passionate about creating products that make a difference.'}
                onChange={(e) => handleTextChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-800">Buttons</h4>
              <ButtonCustomizer
                elementId={elementId}
                buttons={settings.buttons || []}
                onButtonsChange={(buttons) => updateElementSettings(elementId, { buttons })}
              />
            </div>
          </>
        )}

        {template.type === 'contact' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Get In Touch'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle || "We'd love to hear from you"}
                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={settings.address || '123 Business Street, City, State 12345'}
                onChange={(e) => handleTextChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={settings.phone || '+1 (555) 123-4567'}
                onChange={(e) => handleTextChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={settings.email || 'hello@company.com'}
                onChange={(e) => handleTextChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}

        {template.type === 'newsletter' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Stay Updated'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle || 'Subscribe to our newsletter'}
                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Description</label>
              <textarea
                value={settings.description || 'Get the latest updates and exclusive offers.'}
                onChange={(e) => handleTextChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                value={settings.buttonText || 'Subscribe'}
                onChange={(e) => handleTextChange('buttonText', e.target.value)}
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
          </>
        )}

        {template.type === 'faq' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Frequently Asked Questions'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle || 'Find answers to common questions'}
                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </>
        )}

        {template.type === 'stats' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={settings.title || 'Our Achievements'}
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={settings.subtitle || 'Numbers that speak for themselves'}
                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {[1, 2, 3, 4].map((statNum) => (
              <div key={statNum} className="space-y-2 p-3 border border-gray-200 rounded-md">
                <h4 className="text-sm font-medium text-gray-800">Statistic {statNum}</h4>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Number</label>
                  <input
                    type="text"
                    value={settings[`stat${statNum}Number`] || (statNum === 1 ? '10000+' : statNum === 2 ? '500' : statNum === 3 ? '99%' : '24')}
                    onChange={(e) => handleTextChange(`stat${statNum}Number`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-700">Label</label>
                  <input
                    type="text"
                    value={settings[`stat${statNum}Label`] || (statNum === 1 ? 'Happy Customers' : statNum === 2 ? 'Products Sold' : statNum === 3 ? 'Satisfaction Rate' : 'Awards Won')}
                    onChange={(e) => handleTextChange(`stat${statNum}Label`, e.target.value)}
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
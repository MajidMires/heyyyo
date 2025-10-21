import React from 'react';
import { SectionStyle } from '../../types';

interface SectionStylerProps {
  sectionStyle: SectionStyle;
  onStyleChange: (style: Partial<SectionStyle>) => void;
}

const SectionStyler: React.FC<SectionStylerProps> = ({ sectionStyle, onStyleChange }) => {
  const handlePaddingChange = (side: keyof SectionStyle['padding'], value: number) => {
    onStyleChange({
      padding: {
        ...sectionStyle.padding,
        [side]: value,
      },
    });
  };

  const handleMarginChange = (side: keyof SectionStyle['margin'], value: number) => {
    onStyleChange({
      margin: {
        ...sectionStyle.margin,
        [side]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Background */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Background</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={sectionStyle.backgroundColor === 'transparent' ? '#ffffff' : sectionStyle.backgroundColor}
                onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded"
              />
              <button
                onClick={() => onStyleChange({ backgroundColor: 'transparent' })}
                className={`px-3 py-1 text-xs rounded-md border ${
                  sectionStyle.backgroundColor === 'transparent'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                Transparent
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Background Image URL</label>
            <input
              type="text"
              value={sectionStyle.backgroundImage || ''}
              onChange={(e) => onStyleChange({ backgroundImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Background Opacity ({sectionStyle.backgroundOpacity}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sectionStyle.backgroundOpacity}
              onChange={(e) => onStyleChange({ backgroundOpacity: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Gradient (Optional)</label>
            <input
              type="text"
              value={sectionStyle.backgroundGradient || ''}
              onChange={(e) => onStyleChange({ backgroundGradient: e.target.value })}
              placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Spacing</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Padding</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Top ({sectionStyle.padding.top}px)</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={sectionStyle.padding.top}
                  onChange={(e) => handlePaddingChange('top', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Bottom ({sectionStyle.padding.bottom}px)</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={sectionStyle.padding.bottom}
                  onChange={(e) => handlePaddingChange('bottom', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Left ({sectionStyle.padding.left}px)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sectionStyle.padding.left}
                  onChange={(e) => handlePaddingChange('left', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Right ({sectionStyle.padding.right}px)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sectionStyle.padding.right}
                  onChange={(e) => handlePaddingChange('right', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Margin</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Top ({sectionStyle.margin.top}px)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sectionStyle.margin.top}
                  onChange={(e) => handleMarginChange('top', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600">Bottom ({sectionStyle.margin.bottom}px)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sectionStyle.margin.bottom}
                  onChange={(e) => handleMarginChange('bottom', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Layout</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Text Alignment</label>
            <div className="flex space-x-2">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => onStyleChange({ textAlign: align as any })}
                  className={`px-3 py-2 text-xs rounded-md border capitalize ${
                    sectionStyle.textAlign === align
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Max Width</label>
            <select
              value={sectionStyle.maxWidth}
              onChange={(e) => onStyleChange({ maxWidth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="100%">Full Width</option>
              <option value="1200px">Large (1200px)</option>
              <option value="1024px">Medium (1024px)</option>
              <option value="768px">Small (768px)</option>
              <option value="640px">Extra Small (640px)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Border Radius ({sectionStyle.borderRadius}px)
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={sectionStyle.borderRadius}
              onChange={(e) => onStyleChange({ borderRadius: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Effects */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">Effects</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">Box Shadow</label>
            <select
              value={sectionStyle.boxShadow}
              onChange={(e) => onStyleChange({ boxShadow: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="none">None</option>
              <option value="0 1px 3px rgba(0,0,0,0.1)">Small</option>
              <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
              <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
              <option value="0 20px 25px rgba(0,0,0,0.1)">Extra Large</option>
              <option value="inset 0 2px 4px rgba(0,0,0,0.1)">Inset</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionStyler;
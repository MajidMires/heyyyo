import React, { useState } from 'react';
import { ButtonStyle } from '../../types';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ButtonCustomizerProps {
  elementId: string;
  buttons: ButtonStyle[];
  onButtonsChange: (buttons: ButtonStyle[]) => void;
}

const ButtonCustomizer: React.FC<ButtonCustomizerProps> = ({ buttons, onButtonsChange }) => {
  const [expandedButton, setExpandedButton] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const createDefaultButton = (): ButtonStyle => ({
    id: uuidv4(),
    text: 'Button Text',
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    borderColor: '#3B82F6',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 'medium',
    fontWeight: 'medium',
    padding: 'medium',
    hoverEffect: 'lift',
    animation: 'none',
    link: '#',
    target: '_self',
  });

  const addButton = () => {
    const newButton = createDefaultButton();
    onButtonsChange([...buttons, newButton]);
    setExpandedButton(newButton.id);
  };

  const removeButton = (buttonId: string) => {
    onButtonsChange(buttons.filter(b => b.id !== buttonId));
    if (expandedButton === buttonId) {
      setExpandedButton(null);
    }
  };

  const updateButton = (buttonId: string, updates: Partial<ButtonStyle>) => {
    onButtonsChange(buttons.map(b => 
      b.id === buttonId ? { ...b, ...updates } : b
    ));
  };

  const moveButton = (fromIndex: number, toIndex: number) => {
    const newButtons = [...buttons];
    const [movedButton] = newButtons.splice(fromIndex, 1);
    newButtons.splice(toIndex, 0, movedButton);
    onButtonsChange(newButtons);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveButton(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getFontSizeValue = (size: string) => {
    switch (size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  };

  const getPaddingValue = (padding: string) => {
    switch (padding) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '0.875rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  };

  const getHoverEffectStyle = (effect: string, baseStyle: any) => {
    switch (effect) {
      case 'lift':
        return { ...baseStyle, transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' };
      case 'glow':
        return { ...baseStyle, boxShadow: `0 0 20px ${baseStyle.backgroundColor}40` };
      case 'scale':
        return { ...baseStyle, transform: 'scale(1.05)' };
      case 'fade':
        return { ...baseStyle, opacity: 0.8 };
      default:
        return baseStyle;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-800">Buttons ({buttons.length})</h4>
        <button
          onClick={addButton}
          className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={12} className="mr-1" />
          Add Button
        </button>
      </div>

      {buttons.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">No buttons added yet</p>
          <button
            onClick={addButton}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Add your first button
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {buttons.map((button, index) => (
            <div
              key={button.id}
              className="border border-gray-200 rounded-md"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="p-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="cursor-move text-gray-400">
                    <GripVertical size={14} />
                  </div>
                  <button
                    onClick={() => setExpandedButton(expandedButton === button.id ? null : button.id)}
                    className="flex items-center space-x-2"
                  >
                    {expandedButton === button.id ? (
                      <ChevronDown size={14} className="text-gray-600" />
                    ) : (
                      <ChevronRight size={14} className="text-gray-600" />
                    )}
                    <span className="text-sm font-medium text-gray-800">
                      {button.text || 'Button Text'}
                    </span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Button Preview */}
                  <div
                    className="px-2 py-1 text-xs rounded transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: button.backgroundColor,
                      color: button.textColor,
                      border: `${button.borderWidth}px solid ${button.borderColor}`,
                      borderRadius: `${button.borderRadius}px`,
                      fontSize: getFontSizeValue(button.fontSize),
                      fontWeight: button.fontWeight,
                      padding: getPaddingValue(button.padding),
                    }}
                    onMouseEnter={(e) => {
                      const hoverStyle = getHoverEffectStyle(button.hoverEffect, {
                        backgroundColor: button.backgroundColor,
                        color: button.textColor,
                      });
                      Object.assign(e.currentTarget.style, hoverStyle);
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: button.backgroundColor,
                        color: button.textColor,
                        transform: 'none',
                        boxShadow: `0 1px 3px rgba(0,0,0,0.1)`,
                        opacity: 1,
                      });
                    }}
                  >
                    {button.text}
                  </div>
                  <button
                    onClick={() => removeButton(button.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {expandedButton === button.id && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  {/* Button Text */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Button Text</label>
                    <input
                      type="text"
                      value={button.text}
                      onChange={(e) => updateButton(button.id, { text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  {/* Colors */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Background</label>
                      <input
                        type="color"
                        value={button.backgroundColor}
                        onChange={(e) => updateButton(button.id, { backgroundColor: e.target.value })}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Text</label>
                      <input
                        type="color"
                        value={button.textColor}
                        onChange={(e) => updateButton(button.id, { textColor: e.target.value })}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Border</label>
                      <input
                        type="color"
                        value={button.borderColor}
                        onChange={(e) => updateButton(button.id, { borderColor: e.target.value })}
                        className="w-full h-8 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  {/* Size & Style */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Size</label>
                      <select
                        value={button.fontSize}
                        onChange={(e) => updateButton(button.id, { fontSize: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Weight</label>
                      <select
                        value={button.fontWeight}
                        onChange={(e) => updateButton(button.id, { fontWeight: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="medium">Medium</option>
                        <option value="semibold">Semibold</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                  </div>

                  {/* Border & Radius */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Border Width</label>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={button.borderWidth}
                        onChange={(e) => updateButton(button.id, { borderWidth: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{button.borderWidth}px</span>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Border Radius</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={button.borderRadius}
                        onChange={(e) => updateButton(button.id, { borderRadius: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{button.borderRadius}px</span>
                    </div>
                  </div>

                  {/* Effects */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Hover Effect</label>
                      <select
                        value={button.hoverEffect}
                        onChange={(e) => updateButton(button.id, { hoverEffect: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="none">None</option>
                        <option value="lift">Lift</option>
                        <option value="glow">Glow</option>
                        <option value="scale">Scale</option>
                        <option value="fade">Fade</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Animation</label>
                      <select
                        value={button.animation}
                        onChange={(e) => updateButton(button.id, { animation: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="none">None</option>
                        <option value="pulse">Pulse</option>
                        <option value="bounce">Bounce</option>
                        <option value="shake">Shake</option>
                      </select>
                    </div>
                  </div>

                  {/* Link */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Link URL</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={button.link}
                        onChange={(e) => updateButton(button.id, { link: e.target.value })}
                        placeholder="https://example.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <select
                        value={button.target}
                        onChange={(e) => updateButton(button.id, { target: e.target.value as any })}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="_self">Same Tab</option>
                        <option value="_blank">New Tab</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonCustomizer;
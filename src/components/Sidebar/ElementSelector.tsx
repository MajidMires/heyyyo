import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ElementType } from '../../types';
import { getTemplatesByType } from '../../data/templates';

interface ElementSelectorProps {
  typeFilter: ElementType | null;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({ typeFilter }) => {
  const { addElement } = useCustomization();

  const templateTypes: ElementType[] = [
    'imageWithText',
    'slideshow',
    'collection',
    'banner',
    'featured',
  ];

  const typesToShow = typeFilter ? [typeFilter] : templateTypes;

  const getTypeLabel = (type: ElementType): string => {
    switch (type) {
      case 'imageWithText':
        return 'Image with Text';
      case 'slideshow':
        return 'Slideshow';
      case 'collection':
        return 'Collections';
      case 'banner':
        return 'Banners';
      case 'featured':
        return 'Featured Items';
    }
  };

  return (
    <div className="space-y-8">
      {typesToShow.map((type) => {
        const templates = getTemplatesByType(type);
        return (
          <div key={type} className="space-y-3">
            <h3 className="text-base font-medium text-gray-800">{getTypeLabel(type)}</h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-md overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
                  onClick={() => addElement(template.id, template.type)}
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-700 truncate">{template.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ElementSelector;
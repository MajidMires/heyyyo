import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { getTemplateById } from '../../data/templates';
import { GripVertical, Trash2, Settings } from 'lucide-react';

const SectionsList: React.FC = () => {
  const { 
    customization, 
    removeElement, 
    setSelectedElementId, 
    selectedElementId, 
    reorderElements,
    setSidebarView 
  } = useCustomization();
  const { elements } = customization;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (dragIndex !== dropIndex) {
      reorderElements(dragIndex, dropIndex);
    }
  };

  const handleEditSection = (elementId: string) => {
    setSelectedElementId(elementId);
    setSidebarView('sectionSettings');
  };

  if (elements.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500 text-sm">
          No sections added yet. Go to the "Add Sections" tab to add your first section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {elements
        .sort((a, b) => a.order - b.order)
        .map((element, index) => {
          const template = getTemplateById(element.templateId);
          if (!template) return null;

          return (
            <div
              key={element.id}
              className="p-3 border rounded-md border-gray-200 hover:border-gray-300"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="mr-2 cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical size={16} />
                  </div>
                  <div className="mr-3 w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{template.name}</p>
                    <p className="text-xs text-gray-500">Section {index + 1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEditSection(element.id)}
                    className="text-gray-400 hover:text-blue-500 p-1 rounded"
                    title="Edit Section"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(element.id);
                    }}
                    className="text-gray-400 hover:text-red-500 p-1 rounded"
                    title="Delete Section"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SectionsList;
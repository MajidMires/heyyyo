import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ElementInstance, ElementType, StoreCustomization, CustomizationMode, ModalSettings, ProductCardSettings, MenuSettings, ButtonStyle, SectionStyle } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface CustomizationContextType {
  customization: StoreCustomization;
  addElement: (templateId: string, type: ElementType) => void;
  removeElement: (id: string) => void;
  updateElementSettings: (id: string, settings: Record<string, any>) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  updateGlobalSettings: (settings: Partial<StoreCustomization['globalSettings']>) => void;
  updateMenuSettings: (settings: Partial<MenuSettings>) => void;
  updateModalSettings: (settings: Partial<ModalSettings>) => void;
  updateProductCardSettings: (settings: Partial<ProductCardSettings>) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElementButtons: (id: string, buttons: ButtonStyle[]) => void;
  updateElementSectionStyle: (id: string, sectionStyle: Partial<SectionStyle>) => void;
  customizationMode: CustomizationMode;
  setCustomizationMode: (mode: CustomizationMode) => void;
  sidebarView: 'sections' | 'sectionSettings';
  setSidebarView: (view: 'sections' | 'sectionSettings') => void;
  isMobileView: boolean;
  setIsMobileView: (mobile: boolean) => void;
}

const initialGlobalSettings = {
  backgroundColor: '#ffffff',
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  fontFamily: 'Inter, sans-serif',
};

const initialMenuSettings: MenuSettings = {
  template: 'standard',
  logoPosition: 'left',
  opacity: 100,
  fontFamily: 'Inter, sans-serif',
  textColor: '#374151',
  backgroundColor: '#FFFFFF',
  showSearch: true,
  showCart: true,
  menuItems: ['Home', 'Shop', 'Collections', 'About', 'Contact'],
};

const initialModalSettings: ModalSettings = {
  backgroundColor: '#8B5CF6',
  backgroundGradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
  imagePosition: 'left',
  visitStoreButton: {
    text: 'Visit Store',
    style: 'filled',
    color: '#4C1D95',
  },
  backgroundPattern: 'none',
  showReviews: true,
};

const initialProductCardSettings: ProductCardSettings = {
  hoverEffect: 'glow',
  glowColor: '#3B82F6',
  fontFamily: 'Inter, sans-serif',
  accentColor: '#3B82F6',
  shadowIntensity: 'light',
  showRating: true,
  showPriceChange: true,
  showInStock: true,
};

const initialCustomization: StoreCustomization = {
  elements: [],
  globalSettings: initialGlobalSettings,
  menuSettings: initialMenuSettings,
  modalSettings: initialModalSettings,
  productCardSettings: initialProductCardSettings,
};

const createDefaultSectionStyle = (): SectionStyle => ({
  backgroundColor: 'transparent',
  backgroundOpacity: 100,
  padding: {
    top: 48,
    bottom: 48,
    left: 16,
    right: 16,
  },
  margin: {
    top: 0,
    bottom: 0,
  },
  borderRadius: 0,
  boxShadow: 'none',
  textAlign: 'left',
  maxWidth: '100%',
});

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customization, setCustomization] = useState<StoreCustomization>(initialCustomization);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [customizationMode, setCustomizationMode] = useState<CustomizationMode>('storefront');
  const [sidebarView, setSidebarView] = useState<'sections' | 'sectionSettings'>('sections');
  const [isMobileView, setIsMobileView] = useState(false);

  const addElement = (templateId: string, type: ElementType) => {
    if (customization.elements.length >= 5) {
      alert('You can only add up to 5 sections.');
      return;
    }

    const newElement: ElementInstance = {
      id: uuidv4(),
      templateId,
      type,
      order: customization.elements.length,
      settings: {},
      buttons: [],
      sectionStyle: createDefaultSectionStyle(),
    };

    setCustomization(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    setSelectedElementId(newElement.id);
  };

  const removeElement = (id: string) => {
    setCustomization(prev => ({
      ...prev,
      elements: prev.elements
        .filter(element => element.id !== id)
        .map((element, index) => ({ ...element, order: index })),
    }));

    if (selectedElementId === id) {
      setSelectedElementId(null);
      setSidebarView('sections');
    }
  };

  const updateElementSettings = (id: string, settings: Record<string, any>) => {
    setCustomization(prev => ({
      ...prev,
      elements: prev.elements.map(element => 
        element.id === id 
          ? { ...element, settings: { ...element.settings, ...settings } } 
          : element
      ),
    }));
  };

  const reorderElements = (startIndex: number, endIndex: number) => {
    const result = Array.from(customization.elements);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setCustomization(prev => ({
      ...prev,
      elements: result.map((element, index) => ({ ...element, order: index })),
    }));
  };

  const updateElementButtons = (id: string, buttons: ButtonStyle[]) => {
    setCustomization(prev => ({
      ...prev,
      elements: prev.elements.map(element => 
        element.id === id 
          ? { ...element, buttons } 
          : element
      ),
    }));
  };

  const updateElementSectionStyle = (id: string, sectionStyle: Partial<SectionStyle>) => {
    setCustomization(prev => ({
      ...prev,
      elements: prev.elements.map(element => 
        element.id === id 
          ? { 
              ...element, 
              sectionStyle: { 
                ...element.sectionStyle || createDefaultSectionStyle(), 
                ...sectionStyle 
              } 
            } 
          : element
      ),
    }));
  };

  const updateGlobalSettings = (settings: Partial<StoreCustomization['globalSettings']>) => {
    setCustomization(prev => ({
      ...prev,
      globalSettings: { ...prev.globalSettings, ...settings },
    }));
  };

  const updateMenuSettings = (settings: Partial<MenuSettings>) => {
    setCustomization(prev => ({
      ...prev,
      menuSettings: { ...prev.menuSettings, ...settings },
    }));
  };

  const updateModalSettings = (settings: Partial<ModalSettings>) => {
    setCustomization(prev => ({
      ...prev,
      modalSettings: { ...prev.modalSettings, ...settings },
    }));
  };

  const updateProductCardSettings = (settings: Partial<ProductCardSettings>) => {
    setCustomization(prev => ({
      ...prev,
      productCardSettings: { ...prev.productCardSettings, ...settings },
    }));
  };

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        addElement,
        removeElement,
        updateElementSettings,
        reorderElements,
        updateGlobalSettings,
        updateMenuSettings,
        updateModalSettings,
        updateProductCardSettings,
        updateElementButtons,
        updateElementSectionStyle,
        selectedElementId,
        setSelectedElementId,
        customizationMode,
        setCustomizationMode,
        sidebarView,
        setSidebarView,
        isMobileView,
        setIsMobileView,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
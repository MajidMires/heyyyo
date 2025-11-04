import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ElementInstance, ElementType, StoreCustomization, CustomizationMode, ProductCardSettings, ProductModalSettings, SectionStyle, SetupStep } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface CustomizationContextType {
  customization: StoreCustomization;
  addElement: (templateId: string, type: ElementType) => void;
  removeElement: (id: string) => void;
  updateElementSettings: (id: string, settings: Record<string, any>) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  updateGlobalSettings: (settings: Partial<StoreCustomization['globalSettings']>) => void;
  updateProductCardSettings: (settings: Partial<ProductCardSettings>) => void;
  updateProductModalSettings: (settings: Partial<ProductModalSettings>) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElementSectionStyle: (id: string, sectionStyle: Partial<SectionStyle>) => void;
  customizationMode: CustomizationMode;
  setCustomizationMode: (mode: CustomizationMode) => void;
  sidebarView: 'sections' | 'sectionSettings';
  setSidebarView: (view: 'sections' | 'sectionSettings') => void;
  isMobileView: boolean;
  setIsMobileView: (mobile: boolean) => void;
  currentSetupStep: SetupStep;
  setCurrentSetupStep: (step: SetupStep) => void;
  completeSetupStep: (step: SetupStep) => void;
}

const initialGlobalSettings = {
  backgroundColor: '#ffffff',
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  fontFamily: 'Inter, sans-serif',
  fontSize: 'medium' as const,
};

const initialProductCardSettings: ProductCardSettings = {
  glowColor: '#3B82F6',
  buttonColor: '#3B82F6',
};

const initialProductModalSettings: ProductModalSettings = {
  accentColor: '#3B82F6',
  borderColor: '#E5E7EB',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  backgroundPattern: 'none',
};

const initialCustomization: StoreCustomization = {
  elements: [],
  globalSettings: initialGlobalSettings,
  productCardSettings: initialProductCardSettings,
  productModalSettings: initialProductModalSettings,
  setupStep: 'welcome',
  isSetupComplete: false,
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
  const [customizationMode, setCustomizationMode] = useState<CustomizationMode>('welcome');
  const [sidebarView, setSidebarView] = useState<'sections' | 'sectionSettings'>('sections');
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentSetupStep, setCurrentSetupStep] = useState<SetupStep>('welcome');

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

  const updateProductCardSettings = (settings: Partial<ProductCardSettings>) => {
    setCustomization(prev => ({
      ...prev,
      productCardSettings: { ...prev.productCardSettings, ...settings },
    }));
  };

  const updateProductModalSettings = (settings: Partial<ProductModalSettings>) => {
    setCustomization(prev => ({
      ...prev,
      productModalSettings: { ...prev.productModalSettings, ...settings },
    }));
  };

  const completeSetupStep = (step: SetupStep) => {
    setCustomization(prev => ({
      ...prev,
      setupStep: step,
      isSetupComplete: step === 'complete',
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
        updateProductCardSettings,
        updateProductModalSettings,
        updateElementSectionStyle,
        selectedElementId,
        setSelectedElementId,
        customizationMode,
        setCustomizationMode,
        sidebarView,
        setSidebarView,
        isMobileView,
        setIsMobileView,
        currentSetupStep,
        setCurrentSetupStep,
        completeSetupStep,
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
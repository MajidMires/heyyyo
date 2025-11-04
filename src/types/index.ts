export type ElementType = 'imageWithText' | 'slideshow' | 'collection' | 'banner' | 'featured';
export type CustomizationMode = 'welcome' | 'productCard' | 'productModal' | 'storefront';
export type SetupStep = 'welcome' | 'productCard' | 'productModal' | 'storefront' | 'complete';

export interface ProductCardSettings {
  glowColor: string;
  buttonColor: string;
}

export interface ProductModalSettings {
  accentColor: string;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  backgroundPattern: 'none' | 'signature' | 'minimal';
}

export interface SectionStyle {
  backgroundColor: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOpacity: number;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  margin: {
    top: number;
    bottom: number;
  };
  borderRadius: number;
  boxShadow: string;
  textAlign: 'left' | 'center' | 'right';
  maxWidth: string;
}

export interface ElementTemplate {
  id: string;
  name: string;
  type: ElementType;
  thumbnail: string;
}

export interface ElementInstance {
  id: string;
  templateId: string;
  type: ElementType;
  order: number;
  settings: Record<string, any>;
  sectionStyle?: SectionStyle;
}

export interface StoreCustomization {
  elements: ElementInstance[];
  globalSettings: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: 'small' | 'medium' | 'large';
    logo?: string;
    banner?: string;
  };
  productCardSettings: ProductCardSettings;
  productModalSettings: ProductModalSettings;
  setupStep: SetupStep;
  isSetupComplete: boolean;
}
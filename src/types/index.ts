export type ElementType = 'imageWithText' | 'slideshow' | 'collection' | 'banner' | 'featured';
export type CustomizationMode = 'storefront' | 'modal' | 'productCard';

export interface ButtonStyle {
  id: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  fontSize: string;
  fontWeight: string;
  padding: string;
  hoverEffect: 'none' | 'lift' | 'glow' | 'scale' | 'fade';
  animation: 'none' | 'pulse' | 'bounce' | 'shake';
  link: string;
  target: '_self' | '_blank';
}

export interface SectionStyle {
  backgroundColor: string;
  backgroundGradient?: string;
  backgroundImage?: string;
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

export interface MenuSettings {
  template: 'standard' | 'centered' | 'minimal' | 'overlay' | 'transparent';
  logoPosition: 'left' | 'center' | 'right';
  opacity: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  showSearch: boolean;
  showCart: boolean;
  menuItems: string[];
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
  buttons?: ButtonStyle[];
  sectionStyle?: SectionStyle;
}

export interface ModalSettings {
  backgroundColor: string;
  backgroundGradient?: string;
  imagePosition: 'left' | 'right';
  visitStoreButton: {
    text: string;
    style: 'outline' | 'ghost' | 'filled';
    color: string;
  };
  backgroundPattern: 'none' | 'dots' | 'stripes' | 'gradient' | 'abstract';
  showReviews: boolean;
}

export interface ProductCardSettings {
  hoverEffect: 'glow';
  glowColor: string;
  fontFamily: string;
  accentColor: string;
  shadowIntensity: 'light' | 'medium' | 'strong';
  showRating: boolean;
  showPriceChange: boolean;
  showInStock: boolean;
}

export interface StoreCustomization {
  elements: ElementInstance[];
  globalSettings: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logo?: string;
    banner?: string;
  };
  menuSettings: MenuSettings;
  modalSettings: ModalSettings;
  productCardSettings: ProductCardSettings;
}
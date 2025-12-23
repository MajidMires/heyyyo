import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ShoppingBag, Search, User, ShoppingCart, Menu } from 'lucide-react';

interface StorefrontHeaderProps {
  logo?: string;
  banner?: string;
  primaryColor: string;
}

const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({ logo, banner, primaryColor }) => {
  const { customization } = useCustomization();
  const { menuSettings } = customization;

  const getMenuStyle = () => {
    const opacity = menuSettings.opacity / 100;
    
    // Handle transparency for overlay and transparent templates
    if (menuSettings.template === 'transparent') {
      return {
        backgroundColor: 'transparent',
        color: menuSettings.textColor,
        fontFamily: menuSettings.fontFamily,
      };
    }
    
    if (menuSettings.template === 'overlay') {
      // Convert hex to rgba for overlay
      const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      
      return {
        backgroundColor: hexToRgba(menuSettings.backgroundColor, opacity * 0.9),
        color: menuSettings.textColor,
        fontFamily: menuSettings.fontFamily,
        backdropFilter: 'blur(10px)',
      };
    }
    
    // For all other templates
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    return {
      backgroundColor: hexToRgba(menuSettings.backgroundColor, opacity),
      color: menuSettings.textColor,
      fontFamily: menuSettings.fontFamily,
    };
  };

  const getMenuClasses = () => {
    const baseClasses = "w-full transition-all duration-300";
    
    switch (menuSettings.template) {
      case 'overlay':
      case 'transparent':
        return `${baseClasses} absolute top-0 left-0 right-0 z-20`;
      default:
        return `${baseClasses} relative`;
    }
  };

  const getFontSizeClass = () => {
    switch (menuSettings.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const getFontWeightClass = () => {
    switch (menuSettings.fontWeight) {
      case 'normal': return 'font-normal';
      case 'medium': return 'font-medium';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-medium';
    }
  };

  const getTemplateFontFamily = () => {
    switch (menuSettings.template) {
      case 'elegant':
        return "'Playfair Display', serif";
      case 'modern':
        return "'Oswald', sans-serif";
      case 'compact':
        return "'Roboto', sans-serif";
      default:
        return menuSettings.fontFamily;
    }
  };

  const getTemplateFontWeight = () => {
    switch (menuSettings.template) {
      case 'elegant':
        return 'font-normal';
      case 'modern':
        return 'font-bold';
      case 'compact':
        return 'font-medium';
      default:
        return getFontWeightClass();
    }
  };

  const getTemplateFontSize = () => {
    switch (menuSettings.template) {
      case 'compact':
        return 'text-sm';
      case 'modern':
        return 'text-lg';
      case 'elegant':
        return 'text-base';
      default:
        return getFontSizeClass();
    }
  };

  const renderLogo = () => {
    if (logo) {
      return (
        <img 
          src={logo} 
          alt="Store Logo" 
          className="h-6 md:h-8 lg:h-10 object-contain"
          style={{ fontFamily: getTemplateFontFamily() }}
        />
      );
    }
    return (
      <div 
        className={`font-bold text-lg md:text-xl flex items-center ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
        style={{ 
          fontFamily: getTemplateFontFamily(),
          color: menuSettings.textColor
        }}
      >
        <ShoppingBag className="mr-1 md:mr-2" size={20} style={{ color: primaryColor }} />
        <span>Store Name</span>
      </div>
    );
  };

  const renderNavigation = () => (
    <nav 
      className={`hidden md:flex items-center space-x-4 lg:space-x-6 ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
      style={{ fontFamily: getTemplateFontFamily() }}
    >
      {menuSettings.menuItems.map((item, index) => (
        <a 
          key={index} 
          href="#" 
          className="hover:opacity-75 transition-opacity"
          style={{ 
            color: menuSettings.textColor,
            fontFamily: getTemplateFontFamily(),
          }}
        >
          {item}
        </a>
      ))}
    </nav>
  );

  const renderIcons = () => (
    <div className="flex items-center space-x-2 md:space-x-3">
      {menuSettings.showSearch && (
        <button className="hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
          <Search size={18} className="md:w-5 md:h-5" />
        </button>
      )}
      <button className="hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
        <User size={18} className="md:w-5 md:h-5" />
      </button>
      {menuSettings.showCart && (
        <button className="relative hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
          <ShoppingCart size={18} className="md:w-5 md:h-5" />
          <span 
            className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full text-xs flex items-center justify-center text-white" 
            style={{ backgroundColor: primaryColor }}
          >
            0
          </span>
        </button>
      )}
    </div>
  );

  const renderButton = (text: string, link: string, isPrimary = false) => {
    const buttonStyle = menuSettings.buttonStyle || 'filled';
    
    const getButtonClasses = () => {
      const baseClasses = "px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors";
      
      switch (buttonStyle) {
        case 'outline':
          return `${baseClasses} border-2 bg-transparent hover:bg-opacity-10`;
        case 'ghost':
          return `${baseClasses} bg-transparent hover:bg-opacity-10`;
        case 'filled':
        default:
          return `${baseClasses} hover:opacity-90`;
      }
    };

    const getButtonStyle = () => {
      const color = isPrimary ? primaryColor : menuSettings.textColor;
      
      switch (buttonStyle) {
        case 'outline':
          return {
            borderColor: color,
            color: color,
            backgroundColor: 'transparent',
          };
        case 'ghost':
          return {
            color: color,
            backgroundColor: 'transparent',
          };
        case 'filled':
        default:
          return {
            backgroundColor: color,
            color: isPrimary ? '#ffffff' : menuSettings.backgroundColor,
          };
      }
    };

    return (
      <a
        href={link}
        className={getButtonClasses()}
        style={getButtonStyle()}
      >
        {text}
      </a>
    );
  };

  const renderMenuContent = () => {
    switch (menuSettings.template) {
      case 'centered':
        return (
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center py-4">
              {/* Mobile menu and icons */}
              <div className="flex items-center justify-between w-full mb-4 md:hidden">
                <button style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                {renderIcons()}
              </div>
              
              {/* Logo - centered */}
              <div className="mb-4">
                {renderLogo()}
              </div>
              
              {/* Navigation and icons - centered */}
              <div className="hidden md:flex items-center justify-center space-x-8">
                {renderNavigation()}
                <div className="ml-8">
                  {renderIcons()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-6">
              {renderLogo()}
              <div className="flex items-center space-x-8">
                {renderNavigation()}
                {renderIcons()}
              </div>
              <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        );

      case 'logo-center-buttons':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Left Button */}
              <div className="flex items-center space-x-4">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                {menuSettings.leftButtonText && (
                  <div className="hidden md:block">
                    {renderButton(menuSettings.leftButtonText, menuSettings.leftButtonLink || '#')}
                  </div>
                )}
              </div>
              
              {/* Center Logo */}
              <div className="flex-1 flex justify-center">
                {renderLogo()}
              </div>
              
              {/* Right Button and Icons */}
              <div className="flex items-center space-x-4">
                {menuSettings.rightButtonText && (
                  <div className="hidden md:block">
                    {renderButton(menuSettings.rightButtonText, menuSettings.rightButtonLink || '#', true)}
                  </div>
                )}
                {renderIcons()}
              </div>
            </div>
            
            {/* Navigation below on desktop */}
            <div className="hidden md:flex justify-center pb-4">
              {renderNavigation()}
            </div>
          </div>
        );

      case 'split-nav':
        const halfItems = Math.ceil(menuSettings.menuItems.length / 2);
        const leftItems = menuSettings.menuItems.slice(0, halfItems);
        const rightItems = menuSettings.menuItems.slice(halfItems);
        
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Left Navigation */}
              <div className="flex items-center space-x-6">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                <nav className={`hidden md:flex items-center space-x-6 ${getTemplateFontSize()} ${getTemplateFontWeight()}`}>
                  {leftItems.map((item, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="hover:opacity-75 transition-opacity"
                      style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              
              {/* Center Logo */}
              <div className="flex-1 flex justify-center">
                {renderLogo()}
              </div>
              
              {/* Right Navigation and Icons */}
              <div className="flex items-center space-x-6">
                <nav className={`hidden md:flex items-center space-x-6 ${getTemplateFontSize()} ${getTemplateFontWeight()}`}>
                  {rightItems.map((item, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="hover:opacity-75 transition-opacity"
                      style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
                {renderIcons()}
              </div>
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={20} />
                </button>
                {renderLogo()}
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                {renderNavigation()}
              </div>
              
              <div className="flex items-center space-x-2">
                {renderIcons()}
              </div>
            </div>
          </div>
        );

      case 'elegant':
        return (
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center py-6">
              {/* Logo centered */}
              <div className="mb-6">
                {renderLogo()}
              </div>
              
              {/* Navigation centered */}
              <div className="flex items-center justify-center space-x-8 mb-4">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center space-x-8">
                  {renderNavigation()}
                </div>
              </div>
              
              {/* Icons centered */}
              <div className="hidden md:flex">
                {renderIcons()}
              </div>
              
              {/* Mobile icons */}
              <div className="md:hidden absolute top-4 right-4">
                {renderIcons()}
              </div>
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4 border-b-2" style={{ borderColor: primaryColor }}>
              <div className="flex items-center space-x-6">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                {renderLogo()}
                <div className="hidden md:flex">
                  {renderNavigation()}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {renderIcons()}
              </div>
            </div>
          </div>
        );

      default: // standard, overlay, transparent
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className={`flex items-center space-x-4 ${menuSettings.logoPosition === 'center' ? 'flex-1' : ''}`}>
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                {menuSettings.logoPosition === 'left' && renderLogo()}
              </div>
              
              {menuSettings.logoPosition === 'center' && (
                <div className="flex-1 flex justify-center">
                  {renderLogo()}
                </div>
              )}
              
              <div className={`${menuSettings.logoPosition === 'center' ? 'flex-1 flex justify-center' : ''}`}>
                {renderNavigation()}
              </div>
              
              <div className={`flex items-center space-x-4 ${menuSettings.logoPosition === 'center' ? 'flex-1 justify-end' : ''}`}>
                {menuSettings.logoPosition === 'right' && renderLogo()}
                {renderIcons()}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <header className="w-full relative">
      {banner && (
        <div 
          className="w-full h-36 md:h-48 lg:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30">
            {(menuSettings.template === 'overlay' || menuSettings.template === 'transparent') && (
              <div className={getMenuClasses()} style={getMenuStyle()}>
                {renderMenuContent()}
              </div>
            )}
          </div>
        </div>
      )}
      
      {!(banner && (menuSettings.template === 'overlay' || menuSettings.template === 'transparent')) && (
        <div className={getMenuClasses()} style={{...getMenuStyle(), boxShadow: menuSettings.template === 'standard' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'}}>
          {renderMenuContent()}
        </div>
      )}
    </header>
  );
};

export default StorefrontHeader;
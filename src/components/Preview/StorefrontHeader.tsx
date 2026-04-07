import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ShoppingBag, Search, User, ShoppingCart, Menu, X } from 'lucide-react';

interface StorefrontHeaderProps {
  logo?: string;
  banner?: string;
  primaryColor: string;
}

const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({ logo, banner, primaryColor }) => {
  const { customization } = useCustomization();
  const { menuSettings } = customization;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getMenuStyle = () => {
    const opacity = menuSettings.opacity / 100;

    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const baseStyle = {
      backgroundColor: hexToRgba(menuSettings.backgroundColor, opacity),
      color: menuSettings.textColor,
      fontFamily: menuSettings.fontFamily,
    };

    // Add backdrop blur for overlay template
    if (menuSettings.template === 'overlay') {
      return {
        ...baseStyle,
        backdropFilter: 'blur(10px)',
      };
    }

    return baseStyle;
  };

  const getMenuClasses = () => {
    return "w-full transition-all duration-300 relative";
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
      className={`hidden md:flex items-center space-x-4 lg:space-x-6 overflow-x-auto ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
      style={{ fontFamily: getTemplateFontFamily() }}
    >
      {menuSettings.menuItems.map((item, index) => (
        <a
          key={index}
          href="#"
          className="hover:opacity-75 transition-opacity whitespace-nowrap"
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

  const renderMobileMenuButton = () => (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden flex items-center justify-center"
      style={{ color: menuSettings.textColor }}
    >
      {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const renderMobileMenu = () => {
    if (!mobileMenuOpen) return null;

    return (
      <div
        className="fixed inset-0 md:hidden z-40 top-16"
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: menuSettings.backgroundColor,
            opacity: menuSettings.opacity / 100,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col space-y-4 p-4">
            {menuSettings.menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="py-2 hover:opacity-75 transition-opacity text-sm"
                style={{
                  color: menuSettings.textColor,
                  fontFamily: getTemplateFontFamily(),
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="border-t p-4" style={{ borderColor: `${menuSettings.textColor}20` }}>
            <div className="flex flex-col space-y-3">
              {renderIcons()}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <div className="flex md:flex-col items-center justify-between md:justify-center py-4">
              <div className="md:mb-4">
                {renderLogo()}
              </div>
              <div className="md:hidden">
                {renderMobileMenuButton()}
              </div>
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
              <div className="hidden md:flex items-center space-x-8">
                {renderNavigation()}
                {renderIcons()}
              </div>
              <div className="md:hidden">
                {renderMobileMenuButton()}
              </div>
            </div>
          </div>
        );

      case 'logo-center-buttons':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="hidden md:flex items-center space-x-4">
                {menuSettings.leftButtonText && (
                  <div>
                    {renderButton(menuSettings.leftButtonText, menuSettings.leftButtonLink || '#')}
                  </div>
                )}
              </div>
              <div className="flex-1 md:flex-none flex justify-center md:justify-center">
                {renderLogo()}
              </div>
              <div className="flex items-center space-x-4">
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                {menuSettings.rightButtonText && (
                  <div className="hidden md:block">
                    {renderButton(menuSettings.rightButtonText, menuSettings.rightButtonLink || '#', true)}
                  </div>
                )}
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
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
              <div className="hidden md:flex items-center space-x-6">
                <nav className={`flex items-center space-x-6 ${getTemplateFontSize()} ${getTemplateFontWeight()}`}>
                  {leftItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="hover:opacity-75 transition-opacity whitespace-nowrap"
                      style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-1 flex justify-center">
                {renderLogo()}
              </div>
              <div className="flex items-center space-x-6">
                <nav className={`hidden md:flex items-center space-x-6 ${getTemplateFontSize()} ${getTemplateFontWeight()}`}>
                  {rightItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="hover:opacity-75 transition-opacity whitespace-nowrap"
                      style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                {renderLogo()}
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {renderNavigation()}
              </div>
              <div className="flex items-center space-x-2">
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'elegant':
        return (
          <div className="container mx-auto px-4">
            <div className="flex md:flex-col items-center justify-between md:justify-center py-6">
              <div className="md:mb-6">
                {renderLogo()}
              </div>
              <div className="md:hidden">
                {renderMobileMenuButton()}
              </div>
              <div className="hidden md:flex items-center justify-center space-x-8 mb-4">
                {renderNavigation()}
              </div>
              <div className="hidden md:block">
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
                {renderLogo()}
                <div className="hidden md:block">
                  {renderNavigation()}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'stacked':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {renderLogo()}
              <div className="flex items-center space-x-4">
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
            <div className="hidden md:block border-t" style={{ borderColor: `${menuSettings.textColor}20` }}>
              <nav
                className={`flex items-center justify-start space-x-6 py-3 overflow-x-auto ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
                style={{ fontFamily: getTemplateFontFamily() }}
              >
                {menuSettings.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap"
                    style={{
                      color: menuSettings.textColor,
                      fontFamily: getTemplateFontFamily(),
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        );

      case 'stacked-centered':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between md:justify-center py-6">
              <div className="flex-1 md:flex-none">
                {renderLogo()}
              </div>
              <div className="md:hidden">
                {renderMobileMenuButton()}
              </div>
            </div>
            <div className="hidden md:block border-t border-b" style={{ borderColor: `${menuSettings.textColor}20` }}>
              <nav
                className={`flex items-center justify-center space-x-8 py-3 overflow-x-auto ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
                style={{ fontFamily: getTemplateFontFamily() }}
              >
                {menuSettings.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap uppercase tracking-wider text-sm"
                    style={{
                      color: menuSettings.textColor,
                      fontFamily: getTemplateFontFamily(),
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <div className="hidden md:flex items-center justify-center py-2 space-x-6">
              {renderIcons()}
            </div>
          </div>
        );

      case 'luxury':
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {renderLogo()}
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="hidden md:block text-sm uppercase tracking-wider hover:opacity-75 transition-opacity"
                  style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                >
                  Menu
                </a>
                <a
                  href="#"
                  className="hidden md:block text-sm uppercase tracking-wider hover:opacity-75 transition-opacity"
                  style={{ color: menuSettings.textColor, fontFamily: getTemplateFontFamily() }}
                >
                  Account
                </a>
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
              </div>
            </div>
            <div className="hidden md:block border-t" style={{ borderColor: `${menuSettings.textColor}15` }}>
              <nav
                className={`flex items-center space-x-8 py-4 overflow-x-auto ${getTemplateFontSize()} ${getTemplateFontWeight()}`}
                style={{ fontFamily: getTemplateFontFamily() }}
              >
                {menuSettings.menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap uppercase tracking-widest text-xs font-medium"
                    style={{
                      color: index === 1 ? menuSettings.textColor : menuSettings.textColor,
                      fontFamily: getTemplateFontFamily(),
                      fontWeight: index === 1 ? '700' : '400',
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        );

      default: // standard, overlay, transparent
        return (
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className={`flex items-center space-x-4 ${menuSettings.logoPosition === 'center' ? 'flex-1' : ''}`}>
                {menuSettings.logoPosition === 'left' && renderLogo()}
              </div>
              {menuSettings.logoPosition === 'center' && (
                <div className="flex-1 flex justify-center">
                  {renderLogo()}
                </div>
              )}
              <div className={`hidden md:block ${menuSettings.logoPosition === 'center' ? 'flex-1 flex justify-center' : ''}`}>
                {renderNavigation()}
              </div>
              <div className={`flex items-center space-x-4 ${menuSettings.logoPosition === 'center' ? 'flex-1 justify-end' : ''}`}>
                {menuSettings.logoPosition === 'right' && renderLogo()}
                <div className="md:hidden">
                  {renderMobileMenuButton()}
                </div>
                <div className="hidden md:flex">
                  {renderIcons()}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <header className="w-full md:relative" style={mobileMenuOpen ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 } : {}}>
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
      {renderMobileMenu()}
    </>
  );
};

export default StorefrontHeader;
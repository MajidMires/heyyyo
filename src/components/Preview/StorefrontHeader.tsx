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
    return {
      backgroundColor: `${menuSettings.backgroundColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
      color: menuSettings.textColor,
      fontFamily: menuSettings.fontFamily,
    };
  };

  const getMenuClasses = () => {
    const baseClasses = "w-full transition-all duration-300";
    
    switch (menuSettings.template) {
      case 'overlay':
      case 'transparent':
        return `${baseClasses} absolute top-0 left-0 right-0 z-10`;
      default:
        return `${baseClasses} relative`;
    }
  };

  const renderLogo = () => {
    if (logo) {
      return <img src={logo} alt="Store Logo" className="h-8 md:h-10 object-contain" />;
    }
    return (
      <div className="font-bold text-xl flex items-center">
        <ShoppingBag className="mr-2" size={24} style={{ color: primaryColor }} />
        <span>Store Name</span>
      </div>
    );
  };

  const renderNavigation = () => (
    <nav className="hidden md:flex items-center space-x-6">
      {menuSettings.menuItems.map((item, index) => (
        <a 
          key={index} 
          href="#" 
          className="font-medium hover:opacity-75 transition-opacity"
          style={{ color: menuSettings.textColor }}
        >
          {item}
        </a>
      ))}
    </nav>
  );

  const renderIcons = () => (
    <div className="flex items-center space-x-3">
      {menuSettings.showSearch && (
        <button className="hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
          <Search size={20} />
        </button>
      )}
      <button className="hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
        <User size={20} />
      </button>
      {menuSettings.showCart && (
        <button className="relative hover:opacity-75 transition-opacity" style={{ color: menuSettings.textColor }}>
          <ShoppingCart size={20} />
          <span 
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white" 
            style={{ backgroundColor: primaryColor }}
          >
            0
          </span>
        </button>
      )}
    </div>
  );

  const renderMenuContent = () => {
    switch (menuSettings.template) {
      case 'centered':
        return (
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center py-4">
              <div className="flex items-center justify-between w-full mb-4">
                <button className="md:hidden" style={{ color: menuSettings.textColor }}>
                  <Menu size={24} />
                </button>
                <div className={menuSettings.logoPosition === 'center' ? 'mx-auto' : ''}>
                  {renderLogo()}
                </div>
                {renderIcons()}
              </div>
              {renderNavigation()}
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
          className="w-full h-36 md:h-48 lg:h-64 bg-cover bg-center"
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
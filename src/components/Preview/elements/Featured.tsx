import React from 'react';
import { ButtonStyle } from '../../../types';

interface FeaturedProps {
  templateId: string;
  settings: {
    title?: string;
    item1Image?: string;
    item1Title?: string;
    item2Image?: string;
    item2Title?: string;
    buttons?: ButtonStyle[];
  };
}

const Featured: React.FC<FeaturedProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Featured Products';
  const buttons = settings.buttons || [];

  const blackPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800"%3E%3Crect width="800" height="800" fill="%23000000"/%3E%3C/svg%3E';

  const items = [
    {
      id: 1,
      title: settings.item1Title || 'Premium Wireless Headphones',
      image: settings.item1Image || blackPlaceholder,
      price: settings.item1Price || '$129.99',
    },
    {
      id: 2,
      title: settings.item2Title || 'Smart Fitness Watch',
      image: settings.item2Image || blackPlaceholder,
      price: settings.item2Price || '$199.99',
    },
    {
      id: 3,
      title: settings.item3Title || 'Organic Skincare Set',
      image: settings.item3Image || blackPlaceholder,
      price: settings.item3Price || '$89.99',
    },
    {
      id: 4,
      title: settings.item4Title || 'Designer Leather Bag',
      image: settings.item4Image || blackPlaceholder,
      price: settings.item4Price || '$249.99',
    },
    {
      id: 5,
      title: settings.item5Title || 'Artisan Coffee Blend',
      image: settings.item5Image || blackPlaceholder,
      price: settings.item5Price || '$34.99',
    },
  ];

  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;

    const getFontSizeValue = (size: string) => {
      switch (size) {
        case 'small': return 'text-sm';
        case 'large': return 'text-lg';
        default: return 'text-base';
      }
    };

    const getPaddingValue = (padding: string) => {
      switch (padding) {
        case 'small': return 'px-4 py-2';
        case 'large': return 'px-8 py-4';
        default: return 'px-6 py-3';
      }
    };

    const getFontWeightValue = (weight: string) => {
      switch (weight) {
        case 'normal': return 'font-normal';
        case 'medium': return 'font-medium';
        case 'semibold': return 'font-semibold';
        case 'bold': return 'font-bold';
        default: return 'font-medium';
      }
    };

    const getHoverClass = (effect: string) => {
      switch (effect) {
        case 'lift': return 'hover:-translate-y-1 hover:shadow-lg';
        case 'glow': return 'hover:shadow-xl';
        case 'scale': return 'hover:scale-105';
        case 'fade': return 'hover:opacity-80';
        default: return '';
      }
    };

    const getAnimationClass = (animation: string) => {
      switch (animation) {
        case 'pulse': return 'animate-pulse';
        case 'bounce': return 'animate-bounce';
        case 'shake': return 'animate-shake';
        default: return '';
      }
    };

    return (
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target={button.target}
            className={`
              inline-block transition-all duration-200 rounded
              ${getFontSizeValue(button.fontSize)}
              ${getPaddingValue(button.padding)}
              ${getFontWeightValue(button.fontWeight)}
              ${getHoverClass(button.hoverEffect)}
              ${getAnimationClass(button.animation)}
            `}
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
              border: `${button.borderWidth}px solid ${button.borderColor}`,
              borderRadius: `${button.borderRadius}px`,
              opacity: (button.opacity || 100) / 100,
              textDecoration: button.underline ? 'underline' : 'none',
            }}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  };

  switch (templateId) {
    case 'featured-1': // Featured Products Grid
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {items.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative mb-2 md:mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <button className="absolute bottom-0 left-0 right-0 bg-white py-1 md:py-2 text-xs md:text-sm font-medium text-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-center">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 text-center">{item.price}</p>
                </div>
              ))}
            </div>
            {renderButtons()}
          </div>
        </section>
      );

    case 'featured-2': // Best Sellers
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {items.map((item, index) => (
                <div key={item.id} className="relative">
                  <div className="relative mb-2 md:mb-3 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-white text-gray-800 text-xs font-bold px-1 md:px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                  <h3 className="text-xs md:text-sm font-medium">{item.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{item.price}</p>
                </div>
              ))}
            </div>
            {renderButtons()}
          </div>
        </section>
      );

    case 'featured-3': // New Arrivals
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="mb-4 md:mb-6 lg:mb-8 text-center">
              <span className="inline-block px-2 md:px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full mb-2">
                Just Landed
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="group">
                  <div className="relative mb-2 md:mb-3 lg:mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-white m-1 md:m-2 px-1 md:px-2 py-1 text-xs font-bold text-gray-800">
                      NEW
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center p-2 md:p-3 lg:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="bg-white text-gray-800 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium rounded-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-medium">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.price}</p>
                </div>
              ))}
            </div>
            {renderButtons()}
          </div>
        </section>
      );

    case 'featured-4': // Product Categories
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { id: 1, title: items[0].title, image: items[0].image },
                { id: 2, title: items[1].title, image: items[1].image },
                { id: 3, title: items[2].title, image: items[2].image },
              ].map((category) => (
                <div key={category.id} className="relative group rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] md:aspect-[16/9]">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-2">{category.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            {renderButtons()}
          </div>
        </section>
      );

    case 'featured-5': // Featured Collection Highlights
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6">{title}</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 lg:mb-8">
                  Discover our carefully curated selection of premium products, designed to elevate your lifestyle.
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {items.slice(0, 2).map((item) => (
                    <div key={item.id} className="group">
                      <div className="relative mb-2 md:mb-3 aspect-square overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xs md:text-sm font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">$39.99</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 md:mt-4 lg:mt-6">
                  {renderButtons()}
                </div>
              </div>
              <div className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={items[4].image}
                  alt="Featured Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6">
                  <span className="inline-block px-2 md:px-3 py-1 bg-white text-gray-800 text-xs font-medium rounded-full mb-1 md:mb-2">
                    Featured
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 md:mb-2">Summer Collection</h3>
                  <p className="text-sm md:text-base text-white text-opacity-90 mb-2 md:mb-3 lg:mb-4">
                    Embrace the season with our latest arrivals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default Featured;
import React from 'react';
import { ButtonStyle } from '../../types';

interface BannerProps {
  templateId: string;
  settings: {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    link?: string;
    heading?: string;
    subtext?: string;
    backgroundImage?: string;
    imagePosition?: string;
    videoUrl?: string;
    gradientColor?: string;
    buttons?: ButtonStyle[];
  };
}

const Banner: React.FC<BannerProps> = ({ templateId, settings }) => {
  const text = settings.text || 'Special Promotion: 20% Off All Products!';
  const backgroundColor = settings.backgroundColor || '#3B82F6';
  const textColor = settings.textColor || '#FFFFFF';
  const link = settings.link || '#';
  const heading = settings.heading || text;
  const subtext = settings.subtext || '';
  const buttons = settings.buttons || [];

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const getImagePosition = () => {
    const position = settings.imagePosition || 'center';
    switch (position) {
      case 'top': return 'top';
      case 'bottom': return 'bottom';
      case 'left': return 'left';
      case 'right': return 'right';
      default: return 'center';
    }
  };

  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target={button.target}
            className="inline-block px-6 py-3 rounded-md font-medium transition-all duration-200"
            style={{
              backgroundColor: hexToRgba(button.backgroundColor, button.opacity || 100),
              color: button.textColor,
              border: `${button.borderWidth}px solid ${button.borderColor}`,
              borderRadius: `${button.borderRadius}px`,
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
    case 'banner-1': // Full Width Banner
      return (
        <section
          className="py-8 md:py-12 lg:py-16 px-3 md:px-4 text-center"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            <a 
              href={link}
              className="inline-block px-4 md:px-6 py-2 border-2 font-medium rounded-md hover:bg-opacity-90 transition-colors text-sm md:text-base"
              style={{ borderColor: textColor, color: textColor }}
            >
              Shop Now
            </a>
          </div>
        </section>
      );

    case 'banner-2': // Announcement Banner
      return (
        <section
          className="py-2 md:py-3 px-3 md:px-4 text-center"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto">
            <p className="text-xs md:text-sm font-medium" style={{ whiteSpace: 'pre-line' }}>{heading}</p>
          </div>
        </section>
      );

    case 'banner-3': // Promotion Banner
      return (
        <section
          className="py-6 md:py-8 lg:py-10 px-3 md:px-4"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold" style={{ whiteSpace: 'pre-line' }}>{heading}</h3>
              <p className="text-sm md:text-base opacity-90" style={{ whiteSpace: 'pre-line' }}>Limited time offer. Don't miss out!</p>
            </div>
            <a 
              href={link}
              className="px-4 md:px-6 py-2 rounded-md font-medium text-sm md:text-base"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: textColor }}
            >
              Shop the Sale
            </a>
          </div>
        </section>
      );

    case 'banner-4': // Sale Banner
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 -skew-y-3 z-0" 
            style={{ backgroundColor }}
          ></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-sm md:max-w-2xl mx-auto text-center">
              <span 
                className="inline-block px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-2 md:mb-4"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: textColor }}
              >
                Limited Time
              </span>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4"
                style={{ color: textColor, whiteSpace: 'pre-line' }}
              >
                {text}
              </h2>
              <p
                className="mb-4 md:mb-6 text-sm md:text-base lg:text-lg"
                style={{ color: textColor, whiteSpace: 'pre-line' }}
              >
                Use code SUMMER20 at checkout
              </p>
              <a 
                href={link}
                className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-md font-bold tracking-wide text-sm md:text-base"
                style={{ backgroundColor: 'white', color: backgroundColor }}
              >
                Shop Now
              </a>
            </div>
          </div>
        </section>
      );

    case 'banner-5': // Limited Time Offer Banner
      return (
        <section className="py-4 md:py-6 px-3 md:px-4">
          <div className="container mx-auto">
            <div 
              className="rounded-lg p-4 md:p-6 relative overflow-hidden"
              style={{ backgroundColor }}
            >
              <div className="absolute top-0 right-0 w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-12 md:w-16 lg:w-24 h-12 md:h-16 lg:h-24 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-4">
                <div className="text-center md:text-left">
                  <p 
                    className="text-xs md:text-sm font-medium mb-1"
                    style={{ color: `${textColor}99` }}
                  >
                    Limited Time Offer
                  </p>
                  <h3
                    className="text-lg md:text-xl lg:text-2xl font-bold"
                    style={{ color: textColor, whiteSpace: 'pre-line' }}
                  >
                    {text}
                  </h3>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div 
                    className="text-center px-2 md:px-3 py-1 md:py-2 rounded-md"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: textColor }}
                  >
                    <span className="block text-lg md:text-xl lg:text-2xl font-bold">00</span>
                    <span className="text-xs">Days</span>
                  </div>
                  <div 
                    className="text-center px-2 md:px-3 py-1 md:py-2 rounded-md"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: textColor }}
                  >
                    <span className="block text-lg md:text-xl lg:text-2xl font-bold">00</span>
                    <span className="text-xs">Hours</span>
                  </div>
                  <div 
                    className="text-center px-2 md:px-3 py-1 md:py-2 rounded-md"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: textColor }}
                  >
                    <span className="block text-lg md:text-xl lg:text-2xl font-bold">00</span>
                    <span className="text-xs">Mins</span>
                  </div>
                  <a 
                    href={link}
                    className="px-4 md:px-6 py-2 rounded-md font-medium text-sm md:text-base"
                    style={{ backgroundColor: 'white', color: backgroundColor }}
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'banner-6': // Gradient Banner
      return (
        <section 
          className="py-8 md:py-12 lg:py-16 px-3 md:px-4 text-center relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${backgroundColor} 0%, ${settings.gradientColor || '#8B5CF6'} 100%)`,
            color: textColor 
          }}
        >
          <div className="container mx-auto relative z-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            <p className="text-sm md:text-base opacity-90 mb-4 md:mb-6" style={{ whiteSpace: 'pre-line' }}>
              Don't miss out on this amazing opportunity
            </p>
            <a 
              href={link}
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white font-medium rounded-lg hover:bg-opacity-30 transition-all duration-200 text-sm md:text-base"
              style={{ borderColor: textColor, color: textColor }}
            >
              Get Started
            </a>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        </section>
      );

    case 'banner-7': // Image Background Banner
      return (
        <section
          className="py-12 md:py-16 lg:py-20 px-3 md:px-4 text-center relative"
          style={{
            backgroundImage: `url(${settings.backgroundImage || 'https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=1200'})`,
            backgroundSize: 'cover',
            backgroundPosition: getImagePosition(),
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            {subtext && (
              <p className="text-base md:text-lg text-white opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
                {subtext}
              </p>
            )}
            {buttons.length > 0 ? (
              renderButtons()
            ) : (
              <a
                href={link}
                className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                Discover More
              </a>
            )}
          </div>
        </section>
      );

    case 'banner-8': // Minimal Text Banner
      return (
        <section 
          className="py-6 md:py-8 px-3 md:px-4 border-l-4"
          style={{ 
            backgroundColor: `${backgroundColor}10`,
            borderColor: backgroundColor,
            color: textColor 
          }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-1" style={{ whiteSpace: 'pre-line' }}>{heading}</h3>
                <p className="text-sm md:text-base opacity-75" style={{ whiteSpace: 'pre-line' }}>Limited time offer</p>
              </div>
              <a 
                href={link}
                className="px-6 py-2 rounded-md font-medium text-sm md:text-base transition-colors"
                style={{ 
                  backgroundColor: backgroundColor,
                  color: 'white'
                }}
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      );

    case 'banner-9': // Call-to-Action Banner
      return (
        <section 
          className="py-10 md:py-12 lg:py-16 px-3 md:px-4 text-center"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="mb-4 md:mb-6">
              <span className="inline-block w-16 h-16 md:w-20 md:h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                <span className="text-2xl md:text-3xl">🚀</span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
              Join thousands of satisfied customers who have already made the switch
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a 
                href={link}
                className="px-8 py-3 bg-white font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                style={{ color: backgroundColor }}
              >
                Get Started Now
              </a>
              <a 
                href="#"
                className="px-8 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors text-sm md:text-base"
                style={{ borderColor: textColor, color: textColor }}
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      );

    case 'banner-10': // Animated Text Banner
      return (
        <section 
          className="py-8 md:py-12 lg:py-16 px-3 md:px-4 text-center overflow-hidden"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 animate-pulse" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <a 
              href={link}
              className="inline-block mt-6 px-8 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white font-medium rounded-lg hover:bg-opacity-30 transition-all duration-200"
              style={{ borderColor: textColor, color: textColor }}
            >
              Learn More
            </a>
          </div>
        </section>
      );

    case 'banner-11': // Video Background Banner
      return (
        <section className="relative py-12 md:py-16 lg:py-20 px-3 md:px-4 text-center overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full max-w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={settings.videoUrl || 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            {subtext && (
              <p className="text-base md:text-lg text-white opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
                {subtext}
              </p>
            )}
            {buttons.length > 0 ? (
              renderButtons()
            ) : (
              <a
                href={link}
                className="inline-block px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Discover More
              </a>
            )}
          </div>
        </section>
      );

    case 'banner-12': // Parallax Banner
      return (
        <section
          className="relative py-20 md:py-32 px-3 md:px-4 text-center bg-fixed bg-cover"
          style={{
            backgroundImage: `url(${settings.backgroundImage || 'https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=1200'})`,
            backgroundPosition: getImagePosition(),
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            {subtext && (
              <p
                className="text-lg md:text-xl text-white opacity-90 mb-8 md:mb-10 max-w-3xl mx-auto"
                style={{ whiteSpace: 'pre-line' }}
              >
                {subtext}
              </p>
            )}
            {buttons.length > 0 ? (
              renderButtons()
            ) : (
              <a
                href={link}
                className="inline-block px-10 md:px-12 py-4 md:py-5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Get Started
              </a>
            )}
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default Banner;
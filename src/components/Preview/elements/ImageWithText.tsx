import React from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { ButtonStyle, SectionStyle } from '../../types';

interface ImageWithTextProps {
  templateId: string;
  settings: {
    heading?: string;
    subtext?: string;
    buttonText?: string;
    imageUrl?: string;
    textColor?: string;
    fontFamily?: string;
  };
  buttons?: ButtonStyle[];
  sectionStyle?: SectionStyle;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ templateId, settings, buttons = [], sectionStyle }) => {
  const defaultImage = "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800";
  const heading = settings.heading || 'Your Heading Here';
  const subtext = settings.subtext || 'Your descriptive text goes here. Engage your customers with compelling copy.';
  const buttonText = settings.buttonText || 'Shop Now';
  const imageUrl = settings.imageUrl || defaultImage;
  const textColor = settings.textColor || '#000000';
  const fontFamily = settings.fontFamily || 'Inter, sans-serif';

  const renderButtons = () => {
    if (buttons.length === 0) {
      return (
        <button className="px-6 py-2 rounded-md text-white font-medium" style={{ backgroundColor: textColor }}>
          {buttonText}
        </button>
      );
    }

    return (
      <div className="flex flex-wrap gap-3">
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target={button.target}
            className="inline-block transition-all duration-200 hover:no-underline"
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
              border: `${button.borderWidth}px solid ${button.borderColor}`,
              borderRadius: `${button.borderRadius}px`,
              fontSize: button.fontSize === 'small' ? '0.875rem' : button.fontSize === 'large' ? '1.125rem' : '1rem',
              fontWeight: button.fontWeight,
              padding: button.padding === 'small' ? '0.5rem 1rem' : button.padding === 'large' ? '0.875rem 2rem' : '0.75rem 1.5rem',
              textDecoration: 'none',
              animation: button.animation !== 'none' ? `${button.animation} 2s infinite` : 'none',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              switch (button.hoverEffect) {
                case 'lift':
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  break;
                case 'glow':
                  target.style.boxShadow = `0 0 20px ${button.backgroundColor}40`;
                  break;
                case 'scale':
                  target.style.transform = 'scale(1.05)';
                  break;
                case 'fade':
                  target.style.opacity = '0.8';
                  break;
              }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'none';
              target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              target.style.opacity = '1';
            }}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  };

  const getSectionStyle = (): React.CSSProperties => {
    if (!sectionStyle) return {};

    const style: React.CSSProperties = {
      paddingTop: `${sectionStyle.padding.top}px`,
      paddingBottom: `${sectionStyle.padding.bottom}px`,
      paddingLeft: `${sectionStyle.padding.left}px`,
      paddingRight: `${sectionStyle.padding.right}px`,
      marginTop: `${sectionStyle.margin.top}px`,
      marginBottom: `${sectionStyle.margin.bottom}px`,
      borderRadius: `${sectionStyle.borderRadius}px`,
      boxShadow: sectionStyle.boxShadow,
      textAlign: sectionStyle.textAlign,
      maxWidth: sectionStyle.maxWidth,
      margin: sectionStyle.maxWidth !== '100%' ? `${sectionStyle.margin.top}px auto ${sectionStyle.margin.bottom}px auto` : `${sectionStyle.margin.top}px 0 ${sectionStyle.margin.bottom}px 0`,
    };

    if (sectionStyle.backgroundColor !== 'transparent') {
      if (sectionStyle.backgroundGradient) {
        style.background = sectionStyle.backgroundGradient;
      } else {
        style.backgroundColor = sectionStyle.backgroundColor;
      }
      style.opacity = sectionStyle.backgroundOpacity / 100;
    }

    if (sectionStyle.backgroundImage) {
      style.backgroundImage = `url(${sectionStyle.backgroundImage})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }

    return style;
  };

  switch (templateId) {
    case 'image-text-1': // Left Image with Right Text
      return (
        <section style={getSectionStyle()}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img 
                  src={imageUrl} 
                  alt={heading} 
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 md:pl-10">
                <h2 className="text-3xl font-bold mb-4" style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className="mb-6" style={{ color: textColor, fontFamily }}>{subtext}</p>
                {renderButtons()}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-2': // Right Image with Left Text
      return (
        <section style={getSectionStyle()}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img 
                  src={imageUrl} 
                  alt={heading} 
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 md:pr-10">
                <h2 className="text-3xl font-bold mb-4" style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className="mb-6" style={{ color: textColor, fontFamily }}>{subtext}</p>
                {renderButtons()}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-3': // Image with Centered Text
      return (
        <section className="relative" style={getSectionStyle()}>
          <div className="container mx-auto">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt={heading} 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily }}>{heading}</h2>
                <p className="mb-6 text-white max-w-xl" style={{ fontFamily }}>{subtext}</p>
                {renderButtons()}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-4': // Full Width Image with Bottom Text
      return (
        <section style={getSectionStyle()}>
          <div className="relative mb-8">
            <img 
              src={imageUrl} 
              alt={heading} 
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-2 text-white" style={{ fontFamily }}>{heading}</h2>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <p className="mb-6" style={{ color: textColor, fontFamily }}>{subtext}</p>
            {renderButtons()}
          </div>
        </section>
      );

    case 'image-text-5': // Split Screen Image & Text
      return (
        <section className="h-96" style={getSectionStyle()}>
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="md:w-1/2 h-full flex items-center justify-center p-12" style={{ backgroundColor: textColor + '10' }}>
              <div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className="mb-6" style={{ color: textColor, fontFamily }}>{subtext}</p>
                {renderButtons()}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-6': // Full Background Hero Section
      const getTextPositionClasses = () => {
        const position = settings.textPosition || 'bottom-center';
        const baseClasses = "absolute text-white p-8";
        
        switch (position) {
          case 'center':
            return `${baseClasses} inset-0 flex flex-col items-center justify-center text-center`;
          case 'bottom-center':
            return `${baseClasses} bottom-0 left-0 right-0 text-center`;
          case 'bottom-left':
            return `${baseClasses} bottom-0 left-0`;
          case 'bottom-right':
            return `${baseClasses} bottom-0 right-0 text-right`;
          case 'top-center':
            return `${baseClasses} top-0 left-0 right-0 text-center`;
          case 'top-left':
            return `${baseClasses} top-0 left-0`;
          case 'top-right':
            return `${baseClasses} top-0 right-0 text-right`;
          case 'left':
            return `${baseClasses} left-0 top-0 bottom-0 flex flex-col justify-center max-w-md`;
          case 'right':
            return `${baseClasses} right-0 top-0 bottom-0 flex flex-col justify-center max-w-md text-right`;
          default:
            return `${baseClasses} bottom-0 left-0 right-0 text-center`;
        }
      };

      return (
        <section className="relative h-screen min-h-96 w-full" style={getSectionStyle()}>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className={getTextPositionClasses()}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily }}>{heading}</h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl" style={{ fontFamily }}>{subtext}</p>
            {renderButtons()}
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default ImageWithText;
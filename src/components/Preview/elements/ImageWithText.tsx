import React from 'react';
import { SectionStyle, ButtonStyle } from '../../../types';

interface ImageWithTextProps {
  templateId: string;
  settings: {
    heading?: string;
    subtext?: string;
    imageUrl?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: 'small' | 'medium' | 'large';
    textPosition?: string;
    backgroundMedia?: string;
    showShadow?: boolean;
    buttons?: ButtonStyle[];
  };
  sectionStyle?: SectionStyle;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ templateId, settings, sectionStyle }) => {
  const defaultImage = "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800";
  const heading = settings.heading || '';
  const subtext = settings.subtext || '';
  const imageUrl = settings.imageUrl || defaultImage;
  const textColor = settings.textColor || '#000000';
  const fontFamily = settings.fontFamily || 'Inter, sans-serif';
  const fontSize = settings.fontSize || 'medium';
  const textPosition = settings.textPosition || 'bottom-center';
  const backgroundMedia = settings.backgroundMedia || '';
  const showShadow = settings.showShadow !== false;
  const buttons = settings.buttons || [];

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return { heading: 'text-xl md:text-2xl', subtext: 'text-sm' };
      case 'large': return { heading: 'text-3xl md:text-5xl', subtext: 'text-lg' };
      default: return { heading: 'text-2xl md:text-3xl', subtext: 'text-base' };
    }
  };

  const fontSizes = getFontSize();

  const getImageHeight = () => {
    const height = settings.imageHeight || 'medium';
    switch (height) {
      case 'small': return 'h-48 md:h-50'; // 200px
      case 'large': return 'h-80 md:h-96'; // 400px
      case 'extra-large': return 'h-96 md:h-120'; // 480px
      default: return 'h-64 md:h-80'; // 320px (medium)
    }
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

  const getContentMaxWidth = () => {
    if (!sectionStyle || sectionStyle.maxWidth === '100%') return 'w-full';
    return 'container mx-auto';
  };

  const getTextPositionClasses = () => {
    const baseClasses = "absolute p-4 md:p-8";
    
    switch (textPosition) {
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

  const renderButtons = (isOverlay = false) => {
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
      <div className={`flex flex-wrap gap-3 ${isOverlay ? 'mt-6' : 'mt-4'}`}>
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
              backgroundColor: `${button.backgroundColor}${Math.round(button.backgroundOpacity * 2.55).toString(16).padStart(2, '0')}`,
              color: button.textColor,
              border: `${button.borderWidth}px solid ${button.borderColor}`,
              borderRadius: `${button.borderRadius}px`,
              fontFamily: fontFamily,
            }}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  };

  switch (templateId) {
    case 'image-text-1': // Left Image with Right Text
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-64 md:h-80 object-cover rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="md:w-1/2">
                    {heading && <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} leading-relaxed mb-4`} style={{ color: textColor, fontFamily }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-2': // Right Image with Left Text
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-4">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-64 md:h-80 object-cover rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="md:w-1/2">
                    {heading && <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} leading-relaxed mb-4`} style={{ color: textColor, fontFamily }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-3': // Image with Centered Text
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-4">
              <div className={`relative rounded-lg overflow-hidden ${showShadow ? 'shadow-xl' : ''}`}>
                <img 
                  src={imageUrl} 
                  alt={heading} 
                  className="w-full h-64 md:h-96 object-cover"
                />
                {(heading || subtext || buttons.length > 0) && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4 md:p-8">
                    {heading && <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: '#ffffff', fontFamily }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} max-w-2xl leading-relaxed mb-4`} style={{ color: '#ffffff', fontFamily }}>{subtext}</p>}
                    {renderButtons(true)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-4': // Full Width Image with Bottom Text
      return (
        <section style={getSectionStyle()}>
          <div className={`relative mb-8 ${showShadow ? 'shadow-lg' : ''}`}>
            <img 
              src={imageUrl} 
              alt={heading} 
              className="w-full h-64 md:h-96 object-cover"
            />
            {heading && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:p-8">
                <div className={getContentMaxWidth()}>
                  <div className="px-4">
                    <h2 className={`${fontSizes.heading} font-bold`} style={{ color: '#ffffff', fontFamily }}>{heading}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
          {(subtext || buttons.length > 0) && (
            <div className={getContentMaxWidth()}>
              <div className="px-4">
                {subtext && <p className={`${fontSizes.subtext} leading-relaxed mb-4`} style={{ color: textColor, fontFamily }}>{subtext}</p>}
                {renderButtons()}
              </div>
            </div>
          )}
        </section>
      );

    case 'image-text-5': // Split Screen Image & Text
      return (
        <section className="h-64 md:h-96" style={getSectionStyle()}>
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="md:w-1/2 h-full flex items-center justify-center p-6 md:p-12 bg-gray-50">
              {(heading || subtext || buttons.length > 0) && (
                <div className="text-center md:text-left">
                  {heading && <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>}
                  {subtext && <p className={`${fontSizes.subtext} leading-relaxed mb-4`} style={{ color: textColor, fontFamily }}>{subtext}</p>}
                  {renderButtons()}
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'image-text-6': // Full Background Hero Section
      const backgroundImageUrl = backgroundMedia || imageUrl;
      const isVideo = backgroundImageUrl.includes('.mp4') || backgroundImageUrl.includes('.webm') || backgroundImageUrl.includes('.mov');
      
      return (
        <section className="relative h-screen min-h-96 w-full" style={getSectionStyle()}>
          {isVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={backgroundImageUrl} type="video/mp4" />
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          {(heading || subtext || buttons.length > 0) && (
            <div className="container mx-auto relative z-10 h-full px-4" style={{ maxWidth: sectionStyle?.maxWidth || '100%' }}>
              <div className={getTextPositionClasses()}>
                {heading && <h1 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: '#ffffff', fontFamily }}>{heading}</h1>}
                {subtext && <p className={`${fontSizes.subtext} leading-relaxed max-w-2xl mb-4`} style={{ color: '#ffffff', fontFamily }}>{subtext}</p>}
                {renderButtons(true)}
              </div>
            </div>
          )}
        </section>
      );

    case 'image-text-7': // Full Width Image Banner
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-4">
              <img 
                src={imageUrl} 
                alt={heading} 
                className={`w-full ${getImageHeight()} object-cover ${showShadow ? 'shadow-lg' : ''}`}
              />
            </div>
          </div>
        </section>
      );

    case 'image-text-8': // Full Width Image Banner (No Shadow)
      return (
        <section style={getSectionStyle()}>
          <div className="w-full">
            <img 
              src={imageUrl} 
              alt={heading} 
              className={`w-full ${getImageHeight()} object-cover`}
            />
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default ImageWithText;
import React from 'react';
import { SectionStyle, ButtonStyle } from '../../../types';

interface ImageWithTextProps {
  templateId: string;
  settings: {
    heading?: string;
    subtext?: string;
    imageUrl?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image1Title?: string;
    image2Title?: string;
    image3Title?: string;
    image4Title?: string;
    image1Description?: string;
    image2Description?: string;
    image3Description?: string;
    image4Description?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: 'small' | 'medium' | 'large';
    textPosition?: string;
    backgroundMedia?: string;
    showShadow?: boolean;
    fontWeight?: string;
    lineHeight?: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'tall';
    focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
  const fontWeight = settings.fontWeight || '400';
  const lineHeight = settings.lineHeight || '1.375';
  const aspectRatio = settings.aspectRatio || 'landscape';
  const focalPoint = settings.focalPoint || 'center';
  const buttons = settings.buttons || [];

  const [selectedImage, setSelectedImage] = React.useState<{
    url: string;
    title: string;
    description: string;
  } | null>(null);

  const getFocalPoint = () => {
    switch (focalPoint) {
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      case 'top-left':
        return 'left top';
      case 'top-right':
        return 'right top';
      case 'bottom-left':
        return 'left bottom';
      case 'bottom-right':
        return 'right bottom';
      default:
        return 'center';
    }
  };

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'wide':
        return 'aspect-[16/9]';
      case 'tall':
        return 'aspect-[9/16]';
      default:
        return 'aspect-[4/3]';
    }
  };

  const getHeightClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return 'h-64 sm:h-72 md:h-80 lg:h-96';
      case 'portrait':
        return 'h-72 sm:h-80 md:h-96 lg:h-[28rem]';
      case 'landscape':
        return 'h-56 sm:h-64 md:h-72 lg:h-80';
      case 'wide':
        return 'h-48 sm:h-56 md:h-64 lg:h-72';
      case 'tall':
        return 'h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]';
      default:
        return 'h-56 sm:h-64 md:h-72 lg:h-80';
    }
  };

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return { heading: 'text-base md:text-lg lg:text-xl', subtext: 'text-xs md:text-sm' };
      case 'large': return { heading: 'text-3xl md:text-4xl lg:text-6xl', subtext: 'text-lg md:text-xl' };
      default: return { heading: 'text-xl md:text-2xl lg:text-4xl', subtext: 'text-sm md:text-base' };
    }
  };

  const fontSizes = getFontSize();

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
    const baseClasses = "absolute p-4 md:p-6 lg:p-8 z-10";
    
    switch (textPosition) {
      case 'center':
        return `${baseClasses} inset-0 flex flex-col items-center justify-center text-center`;
      case 'bottom-center':
        return `${baseClasses} bottom-0 left-0 right-0 text-center`;
      case 'bottom-left':
        return `${baseClasses} bottom-0 left-0 text-left max-w-xs sm:max-w-sm md:max-w-md`;
      case 'bottom-right':
        return `${baseClasses} bottom-0 right-0 text-right max-w-xs sm:max-w-sm md:max-w-md`;
      case 'top-center':
        return `${baseClasses} top-0 left-0 right-0 text-center`;
      case 'top-left':
        return `${baseClasses} top-0 left-0 text-left max-w-xs sm:max-w-sm md:max-w-md`;
      case 'top-right':
        return `${baseClasses} top-0 right-0 text-right max-w-xs sm:max-w-sm md:max-w-md`;
      case 'left':
        return `${baseClasses} left-0 top-0 bottom-0 flex flex-col justify-center text-left max-w-xs sm:max-w-sm md:max-w-md`;
      case 'right':
        return `${baseClasses} right-0 top-0 bottom-0 flex flex-col justify-center text-right max-w-xs sm:max-w-sm md:max-w-md`;
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
      <div className={`flex flex-wrap gap-2 md:gap-3 ${isOverlay ? 'mt-4 md:mt-6' : 'mt-3 md:mt-4'}`}>
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target={button.target}
            className={`
              inline-block transition-all duration-200 rounded text-xs md:text-sm lg:text-base
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
              fontFamily: fontFamily,
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
    case 'image-text-1': // Left Image with Right Text
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full md:w-1/2">
                  <img
                    src={imageUrl}
                    alt={heading}
                    className={`w-full ${getHeightClasses()} rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                    style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
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
            <div className="px-3 md:px-4">
              <div className="flex flex-col md:flex-row-reverse items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full md:w-1/2">
                  <img
                    src={imageUrl}
                    alt={heading}
                    className={`w-full ${getHeightClasses()} rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                    style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
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
            <div className="px-3 md:px-4">
              <div className={`relative rounded-lg overflow-hidden ${showShadow ? 'shadow-xl' : ''} min-h-[300px] sm:min-h-[400px] md:min-h-[500px]`}>
                <img
                  src={imageUrl}
                  alt={heading}
                  className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className={getTextPositionClasses()}>
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor === '#000000' ? '#ffffff' : textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} max-w-sm md:max-w-2xl mb-3 md:mb-4`} style={{ color: textColor === '#000000' ? '#ffffff' : textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
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
              className={`w-full ${getHeightClasses()}`}
              style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
            />
            {heading && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 md:p-6 lg:p-8">
                <div className={getContentMaxWidth()}>
                  <div className="px-3 md:px-4">
                    <h2 className={`${fontSizes.heading} font-bold`} style={{ color: '#ffffff', fontFamily }}>{heading}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
          {(subtext || buttons.length > 0) && (
            <div className={getContentMaxWidth()}>
              <div className="px-3 md:px-4 text-center md:text-left">
                {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                {renderButtons()}
              </div>
            </div>
          )}
        </section>
      );

    case 'image-text-5': // Split Screen Image & Text
      return (
        <section className="h-56 sm:h-64 md:h-80 lg:h-96" style={getSectionStyle()}>
          <div className="flex flex-col md:flex-row h-full">
            <div
              className="md:w-1/2 h-full bg-cover"
              style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: getFocalPoint() }}
            ></div>
            <div className="md:w-1/2 h-full flex items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50">
              {(heading || subtext || buttons.length > 0) && (
                <div className="text-center md:text-left">
                  {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                  {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
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
        <section className="relative h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px] w-full overflow-hidden" style={getSectionStyle()}>
          {isVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: getFocalPoint() }}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={backgroundImageUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundPosition: getFocalPoint() }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          {(heading || subtext || buttons.length > 0) && (
            <div className="relative z-20 h-full px-3 md:px-4" style={{ maxWidth: sectionStyle?.maxWidth || '100%' }}>
              <div className={getTextPositionClasses()}>
                {heading && <h1 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor === '#000000' ? '#ffffff' : textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h1>}
                {subtext && <p className={`${fontSizes.subtext} max-w-sm md:max-w-2xl mb-3 md:mb-4`} style={{ color: textColor === '#000000' ? '#ffffff' : textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
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
            <div className="px-3 md:px-4">
              <img
                src={imageUrl}
                alt={heading}
                className={`w-full ${getHeightClasses()} ${showShadow ? 'shadow-lg' : ''}`}
                style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
              />
            </div>
          </div>
        </section>
      );

    case 'image-text-8': // Mobile-First Hero
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="flex flex-col space-y-4">
                <div className="w-full">
                  <img
                    src={imageUrl}
                    alt={heading}
                    className={`w-full ${getHeightClasses()} rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                    style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="w-full text-center">
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-9': // Stacked Mobile Layout
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="space-y-6 md:space-y-8">
                {(heading || subtext) && (
                  <div className="text-center">
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} max-w-2xl mx-auto mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                  </div>
                )}
                <div className="w-full">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg ${showShadow ? 'shadow-xl' : ''}`}
                  />
                </div>
                {buttons.length > 0 && (
                  <div className="text-center">
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-10': // Card Style with Shadow
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img 
                      src={imageUrl} 
                      alt={heading} 
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  {(heading || subtext || buttons.length > 0) && (
                    <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                      {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                      {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                      {renderButtons()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-11': // Diagonal Split Layout
      return (
        <section className="relative overflow-hidden" style={getSectionStyle()}>
          <div className="flex flex-col md:flex-row min-h-96">
            <div className="md:w-1/2 relative">
              <img 
                src={imageUrl} 
                alt={heading} 
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-30"></div>
            </div>
            {(heading || subtext || buttons.length > 0) && (
              <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white"></div>
                <div className="relative z-10">
                  {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                  {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                  {renderButtons()}
                </div>
              </div>
            )}
          </div>
        </section>
      );

    case 'image-text-12': // Floating Text Overlay
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
                <img 
                  src={imageUrl} 
                  alt={heading} 
                  className={`w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] object-cover rounded-lg ${showShadow ? 'shadow-xl' : ''}`}
                />
                {(heading || subtext || buttons.length > 0) && (
                  <div className={`absolute z-10 ${
                    textPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center' :
                    textPosition === 'top-center' ? 'top-4 md:top-8 left-1/2 transform -translate-x-1/2 text-center' :
                    textPosition === 'bottom-center' ? 'bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center' :
                    textPosition === 'top-left' ? 'top-4 md:top-8 left-4 md:left-8 text-left' :
                    textPosition === 'top-right' ? 'top-4 md:top-8 right-4 md:right-8 text-right' :
                    textPosition === 'bottom-left' ? 'bottom-4 md:bottom-8 left-4 md:left-8 text-left' :
                    textPosition === 'bottom-right' ? 'bottom-4 md:bottom-8 right-4 md:right-8 text-right' :
                    textPosition === 'left' ? 'top-1/2 left-4 md:left-8 transform -translate-y-1/2 text-left' :
                    textPosition === 'right' ? 'top-1/2 right-4 md:right-8 transform -translate-y-1/2 text-right' :
                    'bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center'
                  } max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg`}>
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 shadow-xl">
                      {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-3`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                      {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                      {renderButtons()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-13': // Parallax Hero Section
      return (
        <section className="relative h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden" style={getSectionStyle()}>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundMedia || imageUrl})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          {(heading || subtext || buttons.length > 0) && (
            <div className="relative z-20 h-full px-3 md:px-4">
              <div className={`${getTextPositionClasses()} text-white`}>
                {heading && <h1 className={`${fontSizes.heading} mb-4 md:mb-6`} style={{ fontFamily, fontWeight, lineHeight }}>{heading}</h1>}
                {subtext && <p className={`${fontSizes.subtext} max-w-2xl mx-auto mb-6 md:mb-8`} style={{ fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                {renderButtons(true)}
              </div>
            </div>
          )}
        </section>
      );

    case 'image-text-14': // Magazine Style Layout
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-2">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-64 md:h-80 object-cover rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="flex flex-col justify-center">
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-15': // Asymmetric Grid Layout
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                <div className="md:col-span-3">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-48 md:h-64 object-cover rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="md:col-span-2 flex flex-col justify-center">
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-16': // Circular Image with Text
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4 text-center">
              <div className="max-w-md mx-auto">
                <img 
                  src={imageUrl} 
                  alt={heading} 
                  className={`w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto mb-6 md:mb-8 ${showShadow ? 'shadow-xl' : ''}`}
                />
                {(heading || subtext || buttons.length > 0) && (
                  <div>
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-17': // Masonry Style Layout
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="columns-1 md:columns-2 gap-6 md:gap-8">
                <div className="break-inside-avoid mb-6">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className={`w-full h-auto object-cover rounded-lg ${showShadow ? 'shadow-lg' : ''}`}
                  />
                </div>
                {(heading || subtext || buttons.length > 0) && (
                  <div className="break-inside-avoid">
                    {heading && <h2 className={`${fontSizes.heading} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-4 md:mb-6`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-18': // Polaroid Style Cards
      return (
        <section style={getSectionStyle()}>
          <div className={getContentMaxWidth()}>
            <div className="px-3 md:px-4">
              <div className="max-w-sm mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={imageUrl} 
                    alt={heading} 
                    className="w-full h-48 md:h-64 object-cover rounded"
                  />
                  {(heading || subtext || buttons.length > 0) && (
                    <div className="mt-4 text-center">
                      {heading && <h2 className={`${fontSizes.heading} mb-2`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                      {subtext && <p className={`${fontSizes.subtext} mb-3`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                      {renderButtons()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-text-20': // 4 Square Images Grid
      const images = [
        { url: imageUrl, title: settings.image1Title || '', description: settings.image1Description || '' },
        { url: settings.image2 || imageUrl, title: settings.image2Title || '', description: settings.image2Description || '' },
        { url: settings.image3 || imageUrl, title: settings.image3Title || '', description: settings.image3Description || '' },
        { url: settings.image4 || imageUrl, title: settings.image4Title || '', description: settings.image4Description || '' },
      ];

      return (
        <>
          <section style={getSectionStyle()}>
            <div className={getContentMaxWidth()}>
              <div className="px-3 md:px-4">
                {(heading || subtext) && (
                  <div className="text-center mb-6 md:mb-8">
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-lg ${showShadow ? 'shadow-lg' : ''} cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.url}
                        alt={img.title || `Gallery ${idx + 1}`}
                        className={`w-full ${getHeightClasses()} transition-transform duration-300 group-hover:scale-110`}
                        style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-lg mb-1">{img.title}</h3>
                            {img.description && (
                              <p className="text-white/90 text-sm line-clamp-2">{img.description}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {buttons.length > 0 && (
                  <div className="mt-6 md:mt-8 text-center">
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </section>

          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                  <div className="p-6">
                    {selectedImage.title && (
                      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily }}>{selectedImage.title}</h2>
                    )}
                    {selectedImage.description && (
                      <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily }}>{selectedImage.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );

    case 'image-text-21': // 3 Images in Row
      const images3 = [
        { url: imageUrl, title: settings.image1Title || '', description: settings.image1Description || '' },
        { url: settings.image2 || imageUrl, title: settings.image2Title || '', description: settings.image2Description || '' },
        { url: settings.image3 || imageUrl, title: settings.image3Title || '', description: settings.image3Description || '' },
      ];

      return (
        <>
          <section style={getSectionStyle()}>
            <div className={getContentMaxWidth()}>
              <div className="px-3 md:px-4">
                {(heading || subtext) && (
                  <div className="text-center mb-6 md:mb-8">
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {images3.map((img, idx) => (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-lg ${showShadow ? 'shadow-lg' : ''} cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.url}
                        alt={img.title || `Gallery ${idx + 1}`}
                        className={`w-full ${getHeightClasses()} transition-transform duration-300 group-hover:scale-110`}
                        style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-lg mb-1">{img.title}</h3>
                            {img.description && (
                              <p className="text-white/90 text-sm line-clamp-2">{img.description}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {buttons.length > 0 && (
                  <div className="mt-6 md:mt-8 text-center">
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </section>

          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                  <div className="p-6">
                    {selectedImage.title && (
                      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily }}>{selectedImage.title}</h2>
                    )}
                    {selectedImage.description && (
                      <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily }}>{selectedImage.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );

    case 'image-text-22': // 2 Large Images Side by Side
      const images2 = [
        { url: imageUrl, title: settings.image1Title || '', description: settings.image1Description || '' },
        { url: settings.image2 || imageUrl, title: settings.image2Title || '', description: settings.image2Description || '' },
      ];

      return (
        <>
          <section style={getSectionStyle()}>
            <div className={getContentMaxWidth()}>
              <div className="px-3 md:px-4">
                {(heading || subtext) && (
                  <div className="text-center mb-6 md:mb-8">
                    {heading && <h2 className={`${fontSizes.heading} mb-2 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight, lineHeight }}>{heading}</h2>}
                    {subtext && <p className={`${fontSizes.subtext} mb-3 md:mb-4`} style={{ color: textColor, fontFamily, fontWeight: '400', lineHeight }}>{subtext}</p>}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {images2.map((img, idx) => (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-lg ${showShadow ? 'shadow-lg' : ''} cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.url}
                        alt={img.title || `Gallery ${idx + 1}`}
                        className={`w-full ${getHeightClasses()} transition-transform duration-300 group-hover:scale-110`}
                        style={{ objectFit: 'cover', objectPosition: getFocalPoint() }}
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-lg mb-1">{img.title}</h3>
                            {img.description && (
                              <p className="text-white/90 text-sm line-clamp-2">{img.description}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {buttons.length > 0 && (
                  <div className="mt-6 md:mt-8 text-center">
                    {renderButtons()}
                  </div>
                )}
              </div>
            </div>
          </section>

          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                  <div className="p-6">
                    {selectedImage.title && (
                      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily }}>{selectedImage.title}</h2>
                    )}
                    {selectedImage.description && (
                      <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily }}>{selectedImage.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );

    default:
      return null;
  }
};

export default ImageWithText;
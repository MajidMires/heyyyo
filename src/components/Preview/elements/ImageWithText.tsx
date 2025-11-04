import React from 'react';
import { SectionStyle } from '../../types';

interface ImageWithTextProps {
  templateId: string;
  settings: {
    heading?: string;
    subtext?: string;
    imageUrl?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: 'small' | 'medium' | 'large';
  };
  sectionStyle?: SectionStyle;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ templateId, settings, sectionStyle }) => {
  const defaultImage = "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800";
  const heading = settings.heading || 'Your Heading Here';
  const subtext = settings.subtext || 'Your descriptive text goes here. Engage your customers with compelling copy.';
  const imageUrl = settings.imageUrl || defaultImage;
  const textColor = settings.textColor || '#000000';
  const fontFamily = settings.fontFamily || 'Inter, sans-serif';
  const fontSize = settings.fontSize || 'medium';

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return { heading: 'text-2xl', subtext: 'text-sm' };
      case 'large': return { heading: 'text-4xl', subtext: 'text-lg' };
      default: return { heading: 'text-3xl', subtext: 'text-base' };
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
                <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className={`${fontSizes.subtext} mb-6`} style={{ color: textColor, fontFamily }}>{subtext}</p>
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
                <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className={`${fontSizes.subtext} mb-6`} style={{ color: textColor, fontFamily }}>{subtext}</p>
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
                <h2 className={`${fontSizes.heading} md:text-5xl font-bold mb-4 text-white`} style={{ fontFamily }}>{heading}</h2>
                <p className={`${fontSizes.subtext} mb-6 text-white max-w-xl`} style={{ fontFamily }}>{subtext}</p>
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
                <h2 className={`${fontSizes.heading} font-bold mb-2 text-white`} style={{ fontFamily }}>{heading}</h2>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <p className={`${fontSizes.subtext} mb-6`} style={{ color: textColor, fontFamily }}>{subtext}</p>
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
                <h2 className={`${fontSizes.heading} font-bold mb-4`} style={{ color: textColor, fontFamily }}>{heading}</h2>
                <p className={`${fontSizes.subtext} mb-6`} style={{ color: textColor, fontFamily }}>{subtext}</p>
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
            <h1 className={`${fontSizes.heading} md:text-6xl font-bold mb-4`} style={{ fontFamily }}>{heading}</h1>
            <p className={`${fontSizes.subtext} md:text-xl mb-6 max-w-2xl`} style={{ fontFamily }}>{subtext}</p>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default ImageWithText;
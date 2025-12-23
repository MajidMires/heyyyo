import React from 'react';

interface BannerProps {
  templateId: string;
  settings: {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    link?: string;
  };
}

const Banner: React.FC<BannerProps> = ({ templateId, settings }) => {
  const text = settings.text || 'Special Promotion: 20% Off All Products!';
  const backgroundColor = settings.backgroundColor || '#3B82F6';
  const textColor = settings.textColor || '#FFFFFF';
  const link = settings.link || '#';

  switch (templateId) {
    case 'banner-1': // Full Width Banner
      return (
        <section
          className="py-8 md:py-12 lg:py-16 px-3 md:px-4 text-center"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">{text}</h2>
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
            <p className="text-xs md:text-sm font-medium">{text}</p>
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
              <h3 className="text-lg md:text-xl font-bold">{text}</h3>
              <p className="text-sm md:text-base opacity-90">Limited time offer. Don't miss out!</p>
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
                style={{ color: textColor }}
              >
                {text}
              </h2>
              <p 
                className="mb-4 md:mb-6 text-sm md:text-base lg:text-lg"
                style={{ color: textColor }}
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
                    style={{ color: textColor }}
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

    default:
      return null;
  }
};

export default Banner;
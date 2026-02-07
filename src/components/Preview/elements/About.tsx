import React from 'react';
import { ButtonStyle } from '../../../types';

interface AboutProps {
  templateId: string;
  settings: {
    title?: string;
    subtitle?: string;
    description?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    stat1Number?: string;
    stat1Label?: string;
    stat2Number?: string;
    stat2Label?: string;
    stat3Number?: string;
    stat3Label?: string;
    buttons?: ButtonStyle[];
  };
}

const About: React.FC<AboutProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Our Story';
  const subtitle = settings.subtitle || 'Building something amazing';
  const description = settings.description || 'We are passionate about creating products that make a difference in people\'s lives. Our journey started with a simple idea and has grown into something we\'re truly proud of.';
  const buttons = settings.buttons || [];

  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-3 mt-6">
        {buttons.map((button) => (
          <a
            key={button.id}
            href={button.link}
            target={button.target}
            className="inline-block transition-all duration-200 rounded text-sm md:text-base px-6 py-3 font-medium"
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
              border: `${button.borderWidth}px solid ${button.borderColor}`,
              borderRadius: `${button.borderRadius}px`,
            }}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  };

  switch (templateId) {
    case 'about-1': // Our Story Section
      return (
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ whiteSpace: 'pre-line' }}>
                  {title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {subtitle}
                </p>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat1Number || '10K+'}
                    </div>
                    <div className="text-sm md:text-base text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat1Label || 'Happy Customers'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat2Number || '5+'}
                    </div>
                    <div className="text-sm md:text-base text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat2Label || 'Years Experience'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat3Number || '99%'}
                    </div>
                    <div className="text-sm md:text-base text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                      {settings.stat3Label || 'Satisfaction Rate'}
                    </div>
                  </div>
                </div>
                
                {renderButtons()}
              </div>
              
              <div className="relative">
                <img
                  src={settings.image1 || 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Our Story"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl font-bold">EST.<br/>2019</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'about-2': // Team Introduction
      return (
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ whiteSpace: 'pre-line' }}>
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
                {description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Founder & CEO',
                  image: settings.image1 || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
                },
                {
                  name: 'Michael Chen',
                  role: 'Head of Design',
                  image: settings.image2 || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
                },
                {
                  name: 'Emma Davis',
                  role: 'Lead Developer',
                  image: settings.image3 || 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=400',
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              {renderButtons()}
            </div>
          </div>
        </section>
      );

    case 'about-3': // Mission & Values
      return (
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ whiteSpace: 'pre-line' }}>
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
                {subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ whiteSpace: 'pre-line' }}>Our Mission</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: 'pre-line' }}>
                  {description}
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  We believe in creating products that not only meet your needs but exceed your expectations in every way possible.
                </p>
              </div>
              <div>
                <img
                  src={settings.image1 || 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt="Our Mission"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: 'Quality',
                  description: 'We never compromise on quality and always strive for excellence in everything we do.',
                  icon: '🏆',
                },
                {
                  title: 'Innovation',
                  description: 'We constantly push boundaries and explore new ways to improve and innovate.',
                  icon: '💡',
                },
                {
                  title: 'Customer Focus',
                  description: 'Our customers are at the heart of everything we do. Their success is our success.',
                  icon: '❤️',
                },
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl md:text-2xl font-semibold mb-3" style={{ whiteSpace: 'pre-line' }}>{value.title}</h4>
                  <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>{value.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              {renderButtons()}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default About;
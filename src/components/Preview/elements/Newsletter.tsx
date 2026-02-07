import React from 'react';
import { Mail, Gift, Star, CheckCircle } from 'lucide-react';

interface NewsletterProps {
  templateId: string;
  settings: {
    title?: string;
    subtitle?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    backgroundColor?: string;
    textColor?: string;
    benefits?: string[];
  };
}

const Newsletter: React.FC<NewsletterProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Stay Updated';
  const subtitle = settings.subtitle || 'Subscribe to our newsletter';
  const description = settings.description || 'Get the latest updates, exclusive offers, and insider news delivered straight to your inbox.';
  const placeholder = settings.placeholder || 'Enter your email address';
  const buttonText = settings.buttonText || 'Subscribe';
  const backgroundColor = settings.backgroundColor || '#3B82F6';
  const textColor = settings.textColor || '#FFFFFF';

  switch (templateId) {
    case 'newsletter-1': // Simple Newsletter Signup
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4" style={{ backgroundColor, color: textColor }}>
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <Mail className="mx-auto mb-4 md:mb-6" size={48} style={{ color: textColor }} />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
              <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8" style={{ whiteSpace: 'pre-line' }}>{description}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={placeholder}
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
                <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  {buttonText}
                </button>
              </div>
              
              <p className="text-xs opacity-75 mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      );

    case 'newsletter-2': // Newsletter with Benefits
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
                  <Gift className="mb-4 text-blue-600" size={48} />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
                  <p className="text-gray-600 mb-6" style={{ whiteSpace: 'pre-line' }}>{description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      'Exclusive discounts and offers',
                      'Early access to new products',
                      'Weekly style tips and trends',
                      'Member-only events and sales'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder={placeholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      {buttonText}
                    </button>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-6 md:p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Star className="mx-auto mb-4" size={64} />
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Join 10,000+ Subscribers</h3>
                    <p className="opacity-90">Get exclusive access to our community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'newsletter-3': // Popup Newsletter
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-blue-600" size={32} />
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900" style={{ whiteSpace: 'pre-line' }}>{title}</h2>
                <p className="text-gray-600 mb-6" style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>
                
                <div className="space-y-3 mb-6">
                  <input
                    type="email"
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    {buttonText}
                  </button>
                </div>
                
                <p className="text-xs text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default Newsletter;
import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

interface ContactProps {
  templateId: string;
  settings: {
    title?: string;
    subtitle?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
    mapImage?: string;
  };
}

const Contact: React.FC<ContactProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Get In Touch';
  const subtitle = settings.subtitle || 'We\'d love to hear from you';
  const address = settings.address || '123 Business Street, City, State 12345';
  const phone = settings.phone || '+1 (555) 123-4567';
  const email = settings.email || 'hello@company.com';
  const hours = settings.hours || 'Mon-Fri: 9AM-6PM';

  switch (templateId) {
    case 'contact-1': // Contact Form Section
      return (
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600">{address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">{phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">{email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600">{hours}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <img
                    src={settings.mapImage || 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt="Location Map"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'contact-2': // Location & Hours
      return (
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={settings.mapImage || 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt="Location Map"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">Visit Our Store</h3>
                    <div className="flex items-start space-x-3 mb-4">
                      <MapPin className="text-blue-600 mt-1" size={20} />
                      <p className="text-gray-700">{address}</p>
                    </div>
                    <p className="text-gray-600">
                      We're located in the heart of the city, easily accessible by public transport and with plenty of parking available.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="text-blue-600" size={24} />
                    <h3 className="text-xl font-bold">Store Hours</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="text-blue-600" size={24} />
                    <h3 className="text-xl font-bold">Contact Info</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700 font-medium">{phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700 font-medium">{email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-3">Need Directions?</h3>
                  <p className="text-blue-100 mb-4">
                    Get turn-by-turn directions to our store location.
                  </p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Get Directions
                  </button>
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

export default Contact;
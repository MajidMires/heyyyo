import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface TestimonialProps {
  templateId: string;
  settings: {
    title?: string;
    autoplay?: boolean;
    slideDelay?: number;
    testimonial1Name?: string;
    testimonial1Role?: string;
    testimonial1Text?: string;
    testimonial1Image?: string;
    testimonial1Rating?: number;
    testimonial2Name?: string;
    testimonial2Role?: string;
    testimonial2Text?: string;
    testimonial2Image?: string;
    testimonial2Rating?: number;
    testimonial3Name?: string;
    testimonial3Role?: string;
    testimonial3Text?: string;
    testimonial3Image?: string;
    testimonial3Rating?: number;
    testimonial4Name?: string;
    testimonial4Role?: string;
    testimonial4Text?: string;
    testimonial4Image?: string;
    testimonial4Rating?: number;
  };
}

const Testimonial: React.FC<TestimonialProps> = ({ templateId, settings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const title = settings.title || 'What Our Customers Say';
  const autoplay = settings.autoplay !== false;
  const slideDelay = settings.slideDelay || 5000;

  const testimonials = [
    {
      name: settings.testimonial1Name || 'Sarah Johnson',
      role: settings.testimonial1Role || 'Verified Customer',
      text: settings.testimonial1Text || 'This product exceeded my expectations! The quality is outstanding and the customer service is exceptional.',
      image: settings.testimonial1Image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: settings.testimonial1Rating || 5,
    },
    {
      name: settings.testimonial2Name || 'Michael Chen',
      role: settings.testimonial2Role || 'Business Owner',
      text: settings.testimonial2Text || 'I\'ve been using this for months now and it has completely transformed my workflow. Highly recommended!',
      image: settings.testimonial2Image || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: settings.testimonial2Rating || 5,
    },
    {
      name: settings.testimonial3Name || 'Emma Davis',
      role: settings.testimonial3Role || 'Marketing Director',
      text: settings.testimonial3Text || 'The best investment I\'ve made for my business. The results speak for themselves.',
      image: settings.testimonial3Image || 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: settings.testimonial3Rating || 5,
    },
    {
      name: settings.testimonial4Name || 'David Wilson',
      role: settings.testimonial4Role || 'Freelancer',
      text: settings.testimonial4Text || 'Simple, effective, and reliable. Everything I need in one place.',
      image: settings.testimonial4Image || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: settings.testimonial4Rating || 4,
    },
  ];

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, slideDelay);

    return () => clearInterval(interval);
  }, [autoplay, slideDelay, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  switch (templateId) {
    case 'testimonial-1': // Customer Reviews Slider
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
              {title}
            </h2>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
                        <Quote className="mx-auto mb-4 text-blue-600" size={32} />
                        <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="text-left">
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonial-2': // Photo Testimonials
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
              {title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 mt-3 mb-4">"{testimonial.text}"</p>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonial-3': // Video Testimonials
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-900 text-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
              {title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                      </button>
                    </div>
                  </div>
                  <p className="text-lg md:text-xl mb-4 italic">"{testimonial.text}"</p>
                  <h4 className="font-semibold text-xl">{testimonial.name}</h4>
                  <p className="text-gray-300">{testimonial.role}</p>
                  <div className="flex justify-center mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'testimonial-4': // Grid Testimonials
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
              {title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700">"{testimonial.text}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default Testimonial;
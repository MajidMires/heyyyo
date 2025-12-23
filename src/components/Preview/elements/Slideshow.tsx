import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideshowProps {
  templateId: string;
  settings: {
    slideDelay?: number;
    slide1Url?: string;
    slide1Heading?: string;
    slide2Url?: string;
    slide2Heading?: string;
  };
}

const Slideshow: React.FC<SlideshowProps> = ({ templateId, settings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideDelay = settings.slideDelay || 5000;

  const slides = [
    {
      image: settings.slide1Url || 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800',
      heading: settings.slide1Heading || 'First Slide Heading',
    },
    {
      image: settings.slide2Url || 'https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg?auto=compress&cs=tinysrgb&w=800',
      heading: settings.slide2Heading || 'Second Slide Heading',
    },
    {
      image: settings.slide3Url || 'https://images.pexels.com/photos/5699421/pexels-photo-5699421.jpeg?auto=compress&cs=tinysrgb&w=800',
      heading: settings.slide3Heading || 'Third Slide Heading',
    },
    {
      image: settings.slide4Url || 'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=800',
      heading: settings.slide4Heading || 'Fourth Slide Heading',
    },
    {
      image: settings.slide5Url || 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800',
      heading: settings.slide5Heading || 'Fifth Slide Heading',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDelay);

    return () => clearInterval(interval);
  }, [slideDelay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  switch (templateId) {
    case 'slideshow-1': // Full Width Slideshow
      return (
        <section className="relative h-64 md:h-80 lg:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center px-3 md:px-4">{slide.heading}</h2>
              </div>
            </div>
          ))}
          <button
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 md:p-2 rounded-full hover:bg-opacity-75 transition-all"
            onClick={prevSlide}
          >
            <ChevronLeft className="text-gray-800" size={16} />
          </button>
          <button
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 md:p-2 rounded-full hover:bg-opacity-75 transition-all"
            onClick={nextSlide}
          >
            <ChevronRight className="text-gray-800" size={16} />
          </button>
          <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center space-x-1 md:space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </section>
      );

    case 'slideshow-2': // Carousel with Text
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="relative h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-all duration-500 transform ${
                    currentSlide === index ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="w-full md:w-1/2 h-full">
                    <img
                      src={slide.image}
                      alt={slide.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 md:relative md:w-1/2 p-4 md:p-6 lg:p-8 bg-black bg-opacity-50 md:bg-gray-50 flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white md:text-gray-900">{slide.heading}</h2>
                    <p className="mb-4 md:mb-6 text-sm md:text-base text-white md:text-gray-600">Discover our amazing products and offers.</p>
                    <button className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base self-start">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex space-x-1 md:space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 md:w-3 h-2 md:h-3 rounded-full border border-blue-600 ${
                      currentSlide === index ? 'bg-blue-600' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case 'slideshow-3': // Product Showcase Slideshow
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">Featured Products</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2 md:px-3 lg:px-4">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={slide.image}
                          alt={slide.heading}
                          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                        />
                        <div className="p-3 md:p-4 lg:p-6">
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-1 md:mb-2">{slide.heading}</h3>
                          <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3 lg:mb-4">
                            Premium quality product for your collection.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-base md:text-lg lg:text-xl font-bold">$99.99</span>
                            <button className="px-3 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-md text-xs md:text-sm">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
                onClick={prevSlide}
              >
                <ChevronLeft className="text-gray-800" size={16} />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md"
                onClick={nextSlide}
              >
                <ChevronRight className="text-gray-800" size={16} />
              </button>
            </div>
            <div className="mt-3 md:mt-4 lg:mt-6 flex justify-center space-x-1 md:space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'slideshow-4': // Testimonial Slideshow
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 lg:mb-10 text-center">Customer Testimonials</h2>
            <div className="max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto relative">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md text-center">
                    <div className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 mx-auto mb-2 md:mb-3 lg:mb-4 rounded-full overflow-hidden">
                      <img
                        src={slides[index].image}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm md:text-base text-gray-600 italic mb-2 md:mb-3 lg:mb-4">
                      "I absolutely love the products from this store. The quality is outstanding and the customer service is excellent."
                    </p>
                    <h3 className="text-sm md:text-base font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">Loyal Customer</p>
                  </div>
                </div>
              ))}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 md:-translate-x-12 bg-white p-1 md:p-2 rounded-full shadow-md z-20"
                onClick={prevSlide}
              >
                <ChevronLeft className="text-gray-800" size={16} />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 md:translate-x-12 bg-white p-1 md:p-2 rounded-full shadow-md z-20"
                onClick={nextSlide}
              >
                <ChevronRight className="text-gray-800" size={16} />
              </button>
            </div>
            <div className="mt-4 md:mt-6 lg:mt-8 flex justify-center space-x-1 md:space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      );

    case 'slideshow-5': // Feature Highlight Slideshow
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">Our Features</h2>
            <div className="flex overflow-x-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-2 md:p-3 lg:p-4">
                        <img
                          src={slide.image}
                          alt={slide.heading}
                          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4">{slide.heading}</h3>
                        <ul className="space-y-2 md:space-y-3">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm md:text-base">Premium quality materials</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm md:text-base">Handcrafted with attention to detail</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm md:text-base">Eco-friendly manufacturing process</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm md:text-base">Lifetime warranty included</span>
                          </li>
                        </ul>
                        <button className="mt-3 md:mt-4 lg:mt-6 px-4 md:px-6 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 md:mt-4 lg:mt-6 flex justify-center space-x-1 md:space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-6 md:w-8 h-1 rounded-full ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default Slideshow;
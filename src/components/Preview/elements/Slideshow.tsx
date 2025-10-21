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
        <section className="relative h-96">
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
                <h2 className="text-white text-4xl font-bold text-center px-4">{slide.heading}</h2>
              </div>
            </div>
          ))}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            onClick={prevSlide}
          >
            <ChevronLeft className="text-gray-800" />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            onClick={nextSlide}
          >
            <ChevronRight className="text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </section>
      );

    case 'slideshow-2': // Carousel with Text
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="relative h-80 rounded-lg overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-all duration-500 transform ${
                    currentSlide === index ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="w-1/2 h-full">
                    <img
                      src={slide.image}
                      alt={slide.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 p-8 bg-gray-50">
                    <h2 className="text-3xl font-bold mb-4">{slide.heading}</h2>
                    <p className="mb-6">Discover our amazing products and offers.</p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full border border-blue-600 ${
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
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img
                          src={slide.image}
                          alt={slide.heading}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{slide.heading}</h3>
                          <p className="text-gray-600 mb-4">
                            Premium quality product for your collection.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">$99.99</span>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
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
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={prevSlide}
              >
                <ChevronLeft className="text-gray-800" />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                onClick={nextSlide}
              >
                <ChevronRight className="text-gray-800" />
              </button>
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
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
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Customer Testimonials</h2>
            <div className="max-w-3xl mx-auto relative">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={slides[index].image}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "I absolutely love the products from this store. The quality is outstanding and the customer service is excellent."
                    </p>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">Loyal Customer</p>
                  </div>
                </div>
              ))}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md z-20"
                onClick={prevSlide}
              >
                <ChevronLeft className="text-gray-800" />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md z-20"
                onClick={nextSlide}
              >
                <ChevronRight className="text-gray-800" />
              </button>
            </div>
            <div className="mt-8 flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
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
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
            <div className="flex overflow-x-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 p-4">
                        <img
                          src={slide.image}
                          alt={slide.heading}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold mb-4">{slide.heading}</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Premium quality materials</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Handcrafted with attention to detail</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Eco-friendly manufacturing process</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Lifetime warranty included</span>
                          </li>
                        </ul>
                        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-8 h-1 rounded-full ${
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
import React from 'react';

interface FeaturedProps {
  templateId: string;
  settings: {
    title?: string;
    item1Image?: string;
    item1Title?: string;
    item2Image?: string;
    item2Title?: string;
  };
}

const Featured: React.FC<FeaturedProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Featured Products';

  const items = [
    {
      id: 1,
      title: settings.item1Title || 'Premium Wireless Headphones',
      image: settings.item1Image || 'https://images.pexels.com/photos/5704412/pexels-photo-5704412.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: settings.item1Price || '$129.99',
    },
    {
      id: 2,
      title: settings.item2Title || 'Smart Fitness Watch',
      image: settings.item2Image || 'https://images.pexels.com/photos/5704414/pexels-photo-5704414.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: settings.item2Price || '$199.99',
    },
    {
      id: 3,
      title: settings.item3Title || 'Organic Skincare Set',
      image: settings.item3Image || 'https://images.pexels.com/photos/5709664/pexels-photo-5709664.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: settings.item3Price || '$89.99',
    },
    {
      id: 4,
      title: settings.item4Title || 'Designer Leather Bag',
      image: settings.item4Image || 'https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: settings.item4Price || '$249.99',
    },
    {
      id: 5,
      title: settings.item5Title || 'Artisan Coffee Blend',
      image: settings.item5Image || 'https://images.pexels.com/photos/5709667/pexels-photo-5709667.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: settings.item5Price || '$34.99',
    },
  ];

  switch (templateId) {
    case 'featured-1': // Featured Products Grid
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <button className="absolute bottom-0 left-0 right-0 bg-white py-2 text-sm font-medium text-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </button>
                  </div>
                  <h3 className="text-sm font-medium text-center">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'featured-2': // Best Sellers
      return (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button className="mt-2 md:mt-0 text-sm font-medium flex items-center hover:underline">
                View All <span className="ml-1">→</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {items.map((item, index) => (
                <div key={item.id} className="relative">
                  <div className="relative mb-3 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'featured-3': // New Arrivals
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="mb-8 text-center">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full mb-2">
                Just Landed
              </span>
              <h2 className="text-3xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="group">
                  <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-white m-2 px-2 py-1 text-xs font-bold text-gray-800">
                      NEW
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'featured-4': // Product Categories
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 1, title: items[0].title, image: items[0].image },
                { id: 2, title: items[1].title, image: items[1].image },
                { id: 3, title: items[2].title, image: items[2].image },
              ].map((category) => (
                <div key={category.id} className="relative group rounded-lg overflow-hidden">
                  <div className="aspect-[16/9]">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.title}</h3>
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-md text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'featured-5': // Featured Collection Highlights
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">{title}</h2>
                <p className="text-gray-600 mb-8">
                  Discover our carefully curated selection of premium products, designed to elevate your lifestyle.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {items.slice(0, 2).map((item) => (
                    <div key={item.id} className="group">
                      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm">$39.99</p>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-6 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                  View Collection
                </button>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={items[4].image}
                  alt="Featured Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-white text-gray-800 text-xs font-medium rounded-full mb-2">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Summer Collection</h3>
                  <p className="text-white text-opacity-90 mb-4">
                    Embrace the season with our latest arrivals
                  </p>
                  <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors">
                    Explore
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

export default Featured;
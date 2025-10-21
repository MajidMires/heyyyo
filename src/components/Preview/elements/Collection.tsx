import React from 'react';

interface CollectionProps {
  templateId: string;
  settings: {
    title?: string;
    itemsPerRow?: string;
    showPrices?: boolean;
  };
}

const Collection: React.FC<CollectionProps> = ({ templateId, settings }) => {
  const title = settings.title || 'Featured Collection';
  const itemsPerRow = settings.itemsPerRow || '3';
  const showPrices = settings.showPrices !== false;

  // Sample products for preview
  const products = [
    {
      id: 1,
      name: settings.item1Title || 'Wireless Bluetooth Speaker',
      price: settings.item1Price || '$79.99',
      image: settings.item1Image || 'https://images.pexels.com/photos/5625005/pexels-photo-5625005.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: settings.item2Title || 'Premium Coffee Mug Set',
      price: settings.item2Price || '$24.99',
      image: settings.item2Image || 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: settings.item3Title || 'Handcrafted Leather Wallet',
      price: settings.item3Price || '$89.99',
      image: settings.item3Image || 'https://images.pexels.com/photos/5632366/pexels-photo-5632366.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      name: settings.item4Title || 'Eco-Friendly Water Bottle',
      price: settings.item4Price || '$19.99',
      image: settings.item4Image || 'https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      name: settings.item5Title || 'Minimalist Desk Organizer',
      price: settings.item5Price || '$34.99',
      image: settings.item5Image || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      name: 'Artisan Candle Collection',
      price: '$49.99',
      image: 'https://images.pexels.com/photos/5704412/pexels-photo-5704412.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  // Calculate grid columns based on itemsPerRow
  const getGridCols = () => {
    switch (itemsPerRow) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 sm:grid-cols-2';
      case '4':
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4';
      case '5':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';
      case '6':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6';
      case '3':
      default:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3';
    }
  };

  switch (templateId) {
    case 'collection-1': // Grid Collection
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
            <div className={`grid ${getGridCols()} gap-6`}>
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Quick View
                    </button>
                  </div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  {showPrices && <p className="text-gray-700">{product.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'collection-2': // Featured Collection
      return (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600">Our most popular products for this season</p>
            </div>
            <div className={`grid ${getGridCols()} gap-8`}>
              {products.slice(0, parseInt(itemsPerRow, 10)).map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    {showPrices && (
                      <div className="flex items-center">
                        <span className="text-gray-400 line-through mr-2">${(parseFloat(product.price.substring(1)) * 1.2).toFixed(2)}</span>
                        <span className="text-red-500 font-medium">{product.price}</span>
                      </div>
                    )}
                    <button className="mt-4 w-full py-2 bg-black text-white font-medium rounded-sm hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-colors">
                View All Products
              </button>
            </div>
          </div>
        </section>
      );

    case 'collection-3': // Horizontal Scrolling Collection
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">{title}</h2>
            <div className="relative">
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-4" style={{ width: 'max-content' }}>
                  {products.map((product) => (
                    <div key={product.id} className="w-64 flex-shrink-0">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                          {showPrices && <p className="text-gray-700">{product.price}</p>}
                          <button className="mt-3 w-full py-1.5 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'collection-4': // Collection with Categories
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <div className="flex overflow-x-auto space-x-2 pb-4 hide-scrollbar">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm whitespace-nowrap">
                  All Products
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 1
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 2
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 3
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 4
                </button>
              </div>
            </div>
            <div className={`grid ${getGridCols()} gap-6`}>
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white text-gray-800 py-2 text-sm font-medium">
                        Quick Shop
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  {showPrices && <p className="text-gray-700">{product.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'collection-5': // Masonry Collection
      return (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="break-inside-avoid mb-4 relative group overflow-hidden rounded-lg"
                  style={{ height: index % 2 === 0 ? '400px' : '300px' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    {showPrices && <p className="text-white opacity-80">{product.price}</p>}
                    <button className="mt-2 px-4 py-1 bg-white text-gray-800 text-sm font-medium rounded hover:bg-gray-100 transition-colors">
                      View Details
                    </button>
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

export default Collection;
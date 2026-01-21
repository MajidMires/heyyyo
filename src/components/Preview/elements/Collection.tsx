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

  const blackPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect width="600" height="600" fill="%23000000"/%3E%3C/svg%3E';

  // Sample products for preview
  const products = [
    {
      id: 1,
      name: settings.item1Title || 'Wireless Bluetooth Speaker',
      price: settings.item1Price || '$79.99',
      image: settings.item1Image || blackPlaceholder,
    },
    {
      id: 2,
      name: settings.item2Title || 'Premium Coffee Mug Set',
      price: settings.item2Price || '$24.99',
      image: settings.item2Image || blackPlaceholder,
    },
    {
      id: 3,
      name: settings.item3Title || 'Handcrafted Leather Wallet',
      price: settings.item3Price || '$89.99',
      image: settings.item3Image || blackPlaceholder,
    },
    {
      id: 4,
      name: settings.item4Title || 'Eco-Friendly Water Bottle',
      price: settings.item4Price || '$19.99',
      image: settings.item4Image || blackPlaceholder,
    },
    {
      id: 5,
      name: settings.item5Title || 'Minimalist Desk Organizer',
      price: settings.item5Price || '$34.99',
      image: settings.item5Image || blackPlaceholder,
    },
    {
      id: 6,
      name: 'Artisan Candle Collection',
      price: '$49.99',
      image: blackPlaceholder,
    },
  ];

  // Calculate grid columns based on itemsPerRow
  const getGridCols = () => {
    switch (itemsPerRow) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '4':
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
      case '5':
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case '6':
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      case '3':
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  };

  switch (templateId) {
    case 'collection-1': // Grid Collection
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">{title}</h2>
            <div className={`grid ${getGridCols()} gap-3 md:gap-4 lg:gap-6`}>
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-2 md:mb-3 lg:mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-1 md:py-2 text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Quick View
                    </button>
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-medium">{product.name}</h3>
                  {showPrices && <p className="text-sm md:text-base text-gray-700">{product.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'collection-2': // Featured Collection
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="mb-4 md:mb-6 lg:mb-8 text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">{title}</h2>
              <p className="text-sm md:text-base text-gray-600">Our most popular products for this season</p>
            </div>
            <div className={`grid ${getGridCols()} gap-4 md:gap-6 lg:gap-8`}>
              {products.slice(0, parseInt(itemsPerRow, 10)).map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-72 object-cover"
                    />
                    <div className="absolute top-1 md:top-2 right-1 md:right-2 bg-red-500 text-white text-xs font-bold px-1 md:px-2 py-1 rounded">
                      SALE
                    </div>
                  </div>
                  <div className="p-2 md:p-3 lg:p-4">
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-1">{product.name}</h3>
                    {showPrices && (
                      <div className="flex items-center">
                        <span className="text-xs md:text-sm text-gray-400 line-through mr-1 md:mr-2">${(parseFloat(product.price.substring(1)) * 1.2).toFixed(2)}</span>
                        <span className="text-sm md:text-base text-red-500 font-medium">{product.price}</span>
                      </div>
                    )}
                    <button className="mt-2 md:mt-3 lg:mt-4 w-full py-1 md:py-2 text-xs md:text-sm bg-black text-white font-medium rounded-sm hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 md:mt-6 lg:mt-8 text-center">
              <button className="px-4 md:px-6 py-2 text-sm md:text-base border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-colors">
                View All Products
              </button>
            </div>
          </div>
        </section>
      );

    case 'collection-3': // Horizontal Scrolling Collection
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8">{title}</h2>
            <div className="relative">
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-3 md:space-x-4" style={{ width: 'max-content' }}>
                  {products.map((product) => (
                    <div key={product.id} className="w-40 sm:w-48 md:w-56 lg:w-64 flex-shrink-0">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover"
                        />
                        <div className="p-2 md:p-3 lg:p-4">
                          <h3 className="text-sm md:text-base lg:text-lg font-medium mb-1">{product.name}</h3>
                          {showPrices && <p className="text-sm md:text-base text-gray-700">{product.price}</p>}
                          <button className="mt-2 md:mt-3 w-full py-1 md:py-1.5 border border-gray-300 text-xs md:text-sm font-medium rounded hover:bg-gray-50 transition-colors">
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
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <div className="mb-4 md:mb-6 lg:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{title}</h2>
              <div className="flex overflow-x-auto space-x-2 pb-2 md:pb-4 hide-scrollbar">
                <button className="px-3 md:px-4 py-1 md:py-2 bg-gray-800 text-white rounded-full text-xs md:text-sm whitespace-nowrap">
                  All Products
                </button>
                <button className="px-3 md:px-4 py-1 md:py-2 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 1
                </button>
                <button className="px-3 md:px-4 py-1 md:py-2 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 2
                </button>
                <button className="px-3 md:px-4 py-1 md:py-2 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 3
                </button>
                <button className="px-3 md:px-4 py-1 md:py-2 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm whitespace-nowrap hover:bg-gray-200">
                  Category 4
                </button>
              </div>
            </div>
            <div className={`grid ${getGridCols()} gap-3 md:gap-4 lg:gap-6`}>
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative mb-2 md:mb-3 lg:mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 lg:p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-full bg-white text-gray-800 py-1 md:py-2 text-xs md:text-sm font-medium">
                        Quick Shop
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-medium">{product.name}</h3>
                  {showPrices && <p className="text-sm md:text-base text-gray-700">{product.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'collection-5': // Masonry Collection
      return (
        <section className="py-6 md:py-8 lg:py-12 px-3 md:px-4">
          <div className="container mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-center">{title}</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-3 md:gap-4">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="break-inside-avoid mb-3 md:mb-4 relative group overflow-hidden rounded-lg"
                  style={{ height: index % 2 === 0 ? '250px' : '200px' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 lg:p-4">
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white">{product.name}</h3>
                    {showPrices && <p className="text-sm md:text-base text-white opacity-80">{product.price}</p>}
                    <button className="mt-1 md:mt-2 px-2 md:px-3 lg:px-4 py-1 bg-white text-gray-800 text-xs md:text-sm font-medium rounded hover:bg-gray-100 transition-colors">
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
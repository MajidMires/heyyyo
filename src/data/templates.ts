import { ElementTemplate } from '../types';

export const templates: ElementTemplate[] = [
  // Image with Text Overlay Templates
  {
    id: 'image-text-1',
    name: 'Left Image with Right Text',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/5816294/pexels-photo-5816294.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'image-text-2',
    name: 'Right Image with Left Text',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'image-text-3',
    name: 'Image with Centered Text',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'image-text-4',
    name: 'Full Width Image with Bottom Text',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'image-text-5',
    name: 'Split Screen Image & Text',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'image-text-6',
    name: 'Full Background Hero Section',
    type: 'imageWithText',
    thumbnail: 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=300',
  },

  // Slideshow Templates
  {
    id: 'slideshow-1',
    name: 'Full Width Slideshow',
    type: 'slideshow',
    thumbnail: 'https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'slideshow-2',
    name: 'Carousel with Text',
    type: 'slideshow',
    thumbnail: 'https://images.pexels.com/photos/5531004/pexels-photo-5531004.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'slideshow-3',
    name: 'Product Showcase Slideshow',
    type: 'slideshow',
    thumbnail: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'slideshow-4',
    name: 'Testimonial Slideshow',
    type: 'slideshow',
    thumbnail: 'https://images.pexels.com/photos/5911877/pexels-photo-5911877.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'slideshow-5',
    name: 'Feature Highlight Slideshow',
    type: 'slideshow',
    thumbnail: 'https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg?auto=compress&cs=tinysrgb&w=300',
  },

  // Collection Templates
  {
    id: 'collection-1',
    name: 'Grid Collection',
    type: 'collection',
    thumbnail: 'https://images.pexels.com/photos/5625005/pexels-photo-5625005.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'collection-2',
    name: 'Featured Collection',
    type: 'collection',
    thumbnail: 'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'collection-3',
    name: 'Horizontal Scrolling Collection',
    type: 'collection',
    thumbnail: 'https://images.pexels.com/photos/5632366/pexels-photo-5632366.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'collection-4',
    name: 'Collection with Categories',
    type: 'collection',
    thumbnail: 'https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'collection-5',
    name: 'Masonry Collection',
    type: 'collection',
    thumbnail: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
  },

  // Banner Templates
  {
    id: 'banner-1',
    name: 'Full Width Banner',
    type: 'banner',
    thumbnail: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'banner-2',
    name: 'Announcement Banner',
    type: 'banner',
    thumbnail: 'https://images.pexels.com/photos/5625040/pexels-photo-5625040.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'banner-3',
    name: 'Promotion Banner',
    type: 'banner',
    thumbnail: 'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'banner-4',
    name: 'Sale Banner',
    type: 'banner',
    thumbnail: 'https://images.pexels.com/photos/5699421/pexels-photo-5699421.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'banner-5',
    name: 'Limited Time Offer Banner',
    type: 'banner',
    thumbnail: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=300',
  },

  // Featured Items Templates
  {
    id: 'featured-1',
    name: 'Featured Products Grid',
    type: 'featured',
    thumbnail: 'https://images.pexels.com/photos/5704412/pexels-photo-5704412.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'featured-2',
    name: 'Best Sellers',
    type: 'featured',
    thumbnail: 'https://images.pexels.com/photos/5709664/pexels-photo-5709664.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'featured-3',
    name: 'New Arrivals',
    type: 'featured',
    thumbnail: 'https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'featured-4',
    name: 'Product Categories',
    type: 'featured',
    thumbnail: 'https://images.pexels.com/photos/5709667/pexels-photo-5709667.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'featured-5',
    name: 'Featured Collection Highlights',
    type: 'featured',
    thumbnail: 'https://images.pexels.com/photos/5650034/pexels-photo-5650034.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export const getTemplatesByType = (type: string) => {
  return templates.filter(template => template.type === type);
};

export const getTemplateById = (id: string) => {
  return templates.find(template => template.id === id);
};
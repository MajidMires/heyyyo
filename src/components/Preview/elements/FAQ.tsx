import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

interface FAQProps {
  templateId: string;
  settings: {
    title?: string;
    subtitle?: string;
    faqs?: Array<{
      question: string;
      answer: string;
      category?: string;
    }>;
  };
}

const FAQ: React.FC<FAQProps> = ({ templateId, settings }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const title = settings.title || 'Frequently Asked Questions';
  const subtitle = settings.subtitle || 'Find answers to common questions';

  const defaultFAQs = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. We accept various payment methods including credit cards and PayPal.',
      category: 'ordering'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.',
      category: 'returns'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping options are available for faster delivery.',
      category: 'shipping'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times and costs vary by destination.',
      category: 'shipping'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s site.',
      category: 'ordering'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.',
      category: 'payment'
    }
  ];

  const faqs = settings.faqs || defaultFAQs;

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  switch (templateId) {
    case 'faq-1': // Accordion FAQ
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <HelpCircle className="mx-auto mb-4 text-blue-600" size={48} />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'faq-2': // Categorized FAQ
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  {faq.category && (
                    <span className="inline-block mt-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                      {faq.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'faq-3': // Search FAQ
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600 mb-6">{subtitle}</p>
              
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No FAQs found matching your search.</p>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="text-gray-500 flex-shrink-0" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default FAQ;
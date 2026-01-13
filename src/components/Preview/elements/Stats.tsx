import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, Target, Star, ShoppingBag } from 'lucide-react';

interface StatsProps {
  templateId: string;
  settings: {
    title?: string;
    subtitle?: string;
    stats?: Array<{
      number: string;
      label: string;
      icon?: string;
      color?: string;
    }>;
  };
}

const Stats: React.FC<StatsProps> = ({ templateId, settings }) => {
  const [counters, setCounters] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const title = settings.title || 'Our Achievements';
  const subtitle = settings.subtitle || 'Numbers that speak for themselves';

  const defaultStats = [
    { number: '10000', label: 'Happy Customers', icon: 'users', color: '#3B82F6' },
    { number: '500', label: 'Products Sold', icon: 'shopping-bag', color: '#10B981' },
    { number: '99', label: 'Satisfaction Rate', icon: 'star', color: '#F59E0B' },
    { number: '24', label: 'Awards Won', icon: 'award', color: '#EF4444' }
  ];

  const stats = settings.stats || defaultStats;

  const getIcon = (iconName: string, color: string) => {
    const iconProps = { size: 32, style: { color } };
    switch (iconName) {
      case 'users': return <Users {...iconProps} />;
      case 'shopping-bag': return <ShoppingBag {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'award': return <Award {...iconProps} />;
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'target': return <Target {...iconProps} />;
      default: return <TrendingUp {...iconProps} />;
    }
  };

  useEffect(() => {
    if (!hasAnimated) {
      const targetNumbers = stats.map(stat => parseInt(stat.number.replace(/\D/g, '')));
      setCounters(new Array(stats.length).fill(0));
      
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters(targetNumbers.map(target => Math.floor(target * progress)));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetNumbers);
          setHasAnimated(true);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    }
  }, [stats, hasAnimated]);

  const formatNumber = (num: number, originalString: string) => {
    if (originalString.includes('%')) return `${num}%`;
    if (originalString.includes('+')) return `${num.toLocaleString()}+`;
    if (originalString.includes('K')) return `${(num / 1000).toFixed(1)}K`;
    if (originalString.includes('M')) return `${(num / 1000000).toFixed(1)}M`;
    return num.toLocaleString();
  };

  switch (templateId) {
    case 'stats-1': // Counter Statistics
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gray-900 text-white">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-lg text-gray-300">{subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    {getIcon(stat.icon || 'trending-up', stat.color || '#3B82F6')}
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                    {formatNumber(counters[index] || 0, stat.number)}
                  </div>
                  <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'stats-2': // Progress Bar Stats
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {stats.map((stat, index) => {
                const percentage = Math.min((counters[index] || 0) / parseInt(stat.number.replace(/\D/g, '')) * 100, 100);
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getIcon(stat.icon || 'trending-up', stat.color || '#3B82F6')}
                        <span className="font-semibold text-gray-900">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: stat.color }}>
                        {formatNumber(counters[index] || 0, stat.number)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: stat.color || '#3B82F6'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );

    case 'stats-3': // Icon Statistics
      return (
        <section className="py-8 md:py-12 lg:py-16 px-3 md:px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    {getIcon(stat.icon || 'trending-up', stat.color || '#3B82F6')}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                    {formatNumber(counters[index] || 0, stat.number)}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
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

export default Stats;
import React from 'react';
import { Palette, Crown, Flame } from 'lucide-react';

interface CategorySectionProps {
  onCategoryClick: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryClick }) => {
  const categories = [
    {
      id: 'urbano',
      title: 'Urbano',
      description: 'Diseños inspirados en la vida de la ciudad y el arte callejero',
      icon: <Palette className="w-8 h-8" />,
      gradient: 'from-blue-500 to-purple-600',
      bgImage: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'underground',
      title: 'Underground',
      description: 'Para los rebeldes que desafían las normas establecidas',
      icon: <Crown className="w-8 h-8" />,
      gradient: 'from-red-500 to-orange-600',
      bgImage: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'tribal',
      title: 'Tribal',
      description: 'Conexión ancestral con la sabiduría y poder tribal',
      icon: <Flame className="w-8 h-8" />,
      gradient: 'from-amber-500 to-red-600',
      bgImage: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animate opacity-0 translate-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explora Nuestros Estilos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada categoría representa una forma única de expresar tu personalidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer scroll-animate opacity-0 translate-y-8"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onCategoryClick(category.id)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.bgImage}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-8 h-64 flex flex-col justify-end text-white">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 transform translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
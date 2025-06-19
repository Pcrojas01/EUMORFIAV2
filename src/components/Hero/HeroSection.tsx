import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-red-100/40 rounded-full blur-lg animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
              Redefiniendo lo que
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse">
              significa vestir
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
              diferente
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-300">
            Descubre nuestra colección de camisas que fusionan el arte urbano, 
            la rebeldía underground y la sabiduría tribal en diseños únicos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-500">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explorar Colección
            </button>
            <button className="px-8 py-4 border-2 border-red-500 text-red-600 font-semibold rounded-full hover:bg-red-500 hover:text-white transform hover:scale-105 transition-all duration-300">
              Ver Estilos
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-20 animate-fade-in-up delay-700">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Diseños Únicos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Estilos Exclusivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Calidad Premium</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Perfectly centered and with proper spacing */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-6 h-6 text-red-500" />
            <div className="w-0.5 h-8 bg-red-300 mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
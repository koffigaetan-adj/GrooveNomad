import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe } from 'lucide-react';

function About() {
  const [language, setLanguage] = useState('fr');


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="relative ml-2">
              <div className="w-12 h-12 overflow-hidden flex items-center justify-center rounded-full bg-white/10">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4">
                <Sparkles className="w-3 h-3 text-yellow-300 animate-ping" />
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link to="/about" className="text-orange-400 transition-colors">À propos</Link>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
              </nav>
              <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-3xl mx-auto flex-grow">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent text-center">
          À propos de GrooveNomad
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          GrooveNomad est une agence de voyage innovante qui s’adresse aux passionnés de musique en quête d’expériences uniques. Elle propose des séjours conçus autour des plus grands festivals internationaux, tout en personnalisant chaque voyage selon les goûts et les préférences musicales de ses clients. Grâce à son intelligence artificielle, GrooveNomad analyse les profils d’écoute et recommande les événements les plus pertinents, les hébergements idéaux, ainsi que des activités culturelles locales pour enrichir l’expérience. L’aspect communautaire est au cœur du concept, avec des espaces dédiés à l’échange entre voyageurs, des carnets de voyage musicaux, et des ambassadeurs sur place pour accompagner les participants. Le modèle inclut également des formules d’abonnement comme le NomadPass, qui donnent accès à des avantages exclusifs, des packs VIP, et des réductions pour les réservations en groupe. GrooveNomad redéfinit le tourisme musical en offrant bien plus qu’un simple billet : une immersion totale dans l’univers sonore et culturel de chaque destination.
        </p>
      </main>

      <footer className="bg-black/50 backdrop-blur-md py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 GrooveNomad. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default About;

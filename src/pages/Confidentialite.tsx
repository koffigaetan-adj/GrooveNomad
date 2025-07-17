import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Sparkles } from 'lucide-react';

const Confidentialite: React.FC = () => {
  const [language, setLanguage] = React.useState<'fr' | 'en'>('fr');

  const t = {
    fr: {
      nav: {
        about: 'À propos',
        contact: 'Contact'
      },
      hero: {
        cta: "Commencer mon voyage"
      }
    },
    en: {
      nav: {
        about: 'About',
        contact: 'Contact'
      },
      hero: {
        cta: "Start my journey"
      }
    }
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="relative ml-2">
              <div className="w-12 h-12 overflow-hidden flex items-center justify-center rounded-full bg-white/10">
                <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4">
                <Sparkles className="w-3 h-3 text-yellow-300 animate-ping" />
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link to="/about" className="hover:text-orange-400 transition-colors">{t.nav.about}</Link>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">{t.nav.contact}</Link>
              </nav>
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              <button
                className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
                onClick={() => {
                  document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>{t.hero.cta}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 max-w-3xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
        <p className="mb-4 text-gray-300">
          Chez GrooveNomad, la confidentialité de vos données est une priorité. Cette politique décrit
          comment nous collectons, utilisons et protégeons vos informations personnelles.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Données collectées</h2>
        <p className="text-gray-300">
          Nous collectons uniquement les données nécessaires pour améliorer votre expérience utilisateur :
          nom, email, préférences de festivals, messages envoyés via le chatbot.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Utilisation des données</h2>
        <p className="text-gray-300">
          Les données sont utilisées pour personnaliser nos services, répondre à vos demandes via le chatbot,
          et améliorer notre offre. Aucune donnée n’est vendue à des tiers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Sécurité</h2>
        <p className="text-gray-300">
          Vos données sont hébergées de manière sécurisée et accessibles uniquement par des personnels autorisés.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Vos droits</h2>
        <p className="text-gray-300">
          Vous pouvez à tout moment demander la suppression ou la modification de vos données en nous
          contactant à <a href="mailto:contact@groovenomad.com" className="underline">contact@groovenomad.com</a>.
        </p>

        <p className="mt-6 text-gray-400 text-sm">
          Dernière mise à jour : juillet 2025
        </p>
      </main>

      <footer className="bg-black/50 backdrop-blur-md py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 GrooveNomad. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Confidentialite;

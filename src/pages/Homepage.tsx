import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
   Star, Users, Plane, ChevronRight,
  Sparkles, Globe, TrendingUp
} from 'lucide-react';

import FestivalCard from '../components/FestivalCard';
import ChatIA from '../components/ChatIA';
import useLocalStorage from '../hooks/useLocalStorage';
import useFestivalData from '../hooks/useFestivalData';
import FestivalMapDynamic from '../components/FestivalMapDynamic';

const HomePage: React.FC = () => {
  const [, setCurrentSlide] = useState(0);

  type Language = 'fr' | 'en';

  const getInitialLanguage = (): Language => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    return browserLang === 'en' ? 'en' : 'fr';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());


  const [likedFestivals, setLikedFestivals] = useLocalStorage<string[]>('likedFestivals', []);
  const [, setBookmarkedFestivals] = useLocalStorage<any[]>('bookmarkedFestivals', []);
  const { festivals, loading } = useFestivalData();

 

  interface ContentType {
    nav: { about: string; contact: string };
    hero: { title: string; subtitle: string; cta: string; quote: string };
    destinations: { title: string; subtitle: string };
    howItWorks: { title: string; step1: string; step2: string; step3: string };
    testimonials: { title: string };
  }

    // Contenu pour chaque langue

  const content: Record<Language, ContentType> = {
    fr: {
      nav: { about: "À propos", contact: "Contact" },
      hero: {
        title: "Your Next Trip Starts with a Beat",
        subtitle: "GrooveNomad vous emmène aux quatre coins du monde pour découvrir la musique, la culture et l'aventure",
        cta: "Commencer mon voyage",
        quote: "Je m'inspire"
      },
      destinations: {
        title: "Destinations Phares",
        subtitle: "Découvrez les festivals les plus attendus de 2025"
      },
      howItWorks: {
        title: "Comment ça marche ?",
        step1: "Partagez vos préférences",
        step2: "Recevez des recommandations IA",
        step3: "Réservez votre aventure"
      },
      testimonials: {
        title: "Ils ont vécu l'expérience GrooveNomad"
      }
    },
    en: {
      nav: { about: "About", contact: "Contact" },
      hero: {
        title: "Your Next Trip Starts with a Beat",
        subtitle: "GrooveNomad takes you around the world to discover music, culture and adventure",
        cta: "Start my journey",
        quote: "I inspire myself"
      },
      destinations: {
        title: "Top Destinations",
        subtitle: "Discover the most anticipated festivals of 2025"
      },
      howItWorks: {
        title: "How it works?",
        step1: "Share your preferences",
        step2: "Get AI recommendations",
        step3: "Book your adventure"
      },
      testimonials: {
        title: "They lived the GrooveNomad experience"
      }
    }
  };


  const t = content[language];

  const testimonials = [
    {
      name: "Sarah M.",
      age: 24,
      festival: "Tomorrowland 2024",
      text: "Une expérience magique ! GrooveNomad a organisé chaque détail parfaitement.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Alex R.",
      age: 28,
      festival: "Coachella 2024",
      text: "L'IA a trouvé exactement ce que je cherchais. Voyage incroyable !",
      rating: 5,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Emma L.",
      age: 26,
      festival: "Burning Man 2024",
      text: "Service personnalisé exceptionnel. Je recommande les yeux fermés !",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % festivals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [festivals.length]);



  const handleLikeFestival = (festivalId: string) => {
    setLikedFestivals(prev => prev.includes(festivalId) ? prev.filter(id => id !== festivalId) : [...prev, festivalId]);
  };

  const handleBookmarkFestival = (festival: any) => {
    setBookmarkedFestivals(prev => {
      const exists = prev.find((f: any) => f.id === festival.id);
      return exists ? prev.filter((f: any) => f.id !== festival.id) : [...prev, festival];
    });
    alert(`✅ ${festival.name} ajouté à vos favoris !`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Tu peux réintégrer ici ton header, Hero, sections, ChatIA, footer, etc. */}
       {/* Header */}
     <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between gap-6">

      {/* Logo cliquable */}
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

      {/* Liens + langue + CTA */}
      <div className="flex items-center space-x-6">

        {/* Liens navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/about" className="hover:text-orange-400 transition-colors">
            {t.nav.about}
          </Link>
          <Link to="/contact" className="hover:text-orange-400 transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        {/* Bouton langue */}
        <button 
  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
  className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
>
  <Globe className="h-4 w-4" />
  <span className="text-sm font-medium">{language.toUpperCase()}</span>
</button>

        {/* CTA scroll vers formulaire */}
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





      {/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
  {/* Background Animation */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
  </div>

  <div className="container mx-auto px-6 text-center relative z-10">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent leading-tight">
        {t.hero.title}
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
        {t.hero.subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>{t.hero.cta}</span>
        </button>
        
        <button className="border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        onClick={() => {
            document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
        
          <span>{t.hero.quote}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
          <div className="text-gray-300">Festivals partenaires</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-400 mb-2">50K+</div>
          <div className="text-gray-300">Voyageurs satisfaits</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
          <div className="text-gray-300">Recommandations IA</div>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <button
      onClick={() => {
        document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      <ChevronRight className="h-6 w-6 rotate-90 text-white/60" />
    </button>
  </div>
</section>
<div id="form"></div>

      {/* ChatIA */}
     <section className="pt-[120px] pb-20 bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-sm scroll-mt-[120px]">
  <div className="container mx-auto px-6">
    <div  className="max-w-4xl mx-auto">
<ChatIA />
    </div>
  </div>
</section>

    <section className="pt-[120px] pb-20 bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-sm scroll-mt-[120px]">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto">
      <FestivalMapDynamic />
    </div>
  </div>
</section>

      {/* Featured Destinations */}
      <section className="py-20" id="destinations">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {t.destinations.title}
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            {t.destinations.subtitle}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/10 h-80 rounded-2xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {festivals.slice(0, 6).map((festival) => (
                  <FestivalCard
                    key={festival.id}
                    festival={festival}
                    onLike={handleLikeFestival}
                    isLiked={likedFestivals.includes(festival.id)}
                    onBookmark={handleBookmarkFestival}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {t.howItWorks.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Raconte-nous ton projet</h3>
              <p className="text-gray-300 text-lg">
                Choisis ta destination, ton budget, tes dates et ton style.
Notre assistant te pose quelques questions, puis s’occupe du reste.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Reçois ta proposition personnalisée</h3>
              <p className="text-gray-300 text-lg">
                L’IA te construit un séjour sur-mesure : festival, transport, hébergement.
Tu veux en voir plus ? On peut y ajouter des activités autour.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Plane className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tu valides, on s’occupe du reste</h3>
              <p className="text-gray-300 text-lg">
                Réservations, confirmations, suivi : tout est prêt.
Ton seul job ? Profiter de l’ambiance !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            {t.testimonials.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-400"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.age} ans • {testimonial.festival}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/assets/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="text-xl font-bold">GrooveNomad</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre agence de voyage spécialisée dans les festivals de musique du monde entier.
              </p>
              
            </div>

            <div>
              {/* <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Europe</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Amérique du Nord</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Asie</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Océanie</a></li>
              </ul> */}
            </div>

            <div>
              {/* <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Réservation festivals</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Hébergement</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Transport</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Activités locales</a></li>
              </ul> */}
            </div>

            <div>
              <h4 className="font-semibold mb-4">Intégrations</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Airtable</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Gemini</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">Stripe</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">PayPal</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span>IA powered</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GrooveNomad. Tous droits réservés. Vivez la musique, explorez le monde.</p>
          </div>
        </div>
      </footer>

      
    </div>
  );
};

export default HomePage;

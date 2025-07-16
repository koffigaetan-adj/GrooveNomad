import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';


interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    title: "Découvre Les Festivals",
    subtitle: "Qui Te Ressemblent",
    description: "Une IA qui t’emmène aux festivals faits pour toi. Vibe, voyage, musique.",
    chatPlaceholder: "Parle-moi de tes goûts musicaux... 🎵",
    aiGreeting: "Salut ! Je suis ton assistant IA pour découvrir les meilleurs festivals de musique du monde. Raconte-moi tes goûts musicaux et je te proposerai des voyages inoubliables !",
    aiResponse: "Super choix ! Basé sur tes préférences, je te recommande le festival Tomorrowland en Belgique pour l'électro, ou encore Coachella en Californie pour un mix éclectique. Veux-tu que je te montre des packages complets ?",
    recommendations: "Recommandations IA Personnalisées",
    testimonials: "Ils Ont Vécu L'Expérience GrooveNomad",
    ctaTitle: "Prêt Pour Ton Prochain Festival ?",
    ctaDescription: "Commence ta conversation avec notre IA et découvre des festivals qui correspondent parfaitement à tes goûts musicaux.",
    ctaButton: "Commencer Mon Voyage Musical",
    footerDescription: "Ton compagnon IA pour découvrir les meilleurs festivals de musique du monde",
    copyright: "Tous droits réservés. Voyage responsable, musique passionnée."
  },
  en: {
    title: "Discover Festivals",
    subtitle: "That Match You",
    description: "Our personalized AI analyzes your musical tastes to suggest unique festival trips around the world. Let yourself be guided to your next unforgettable musical journey.",
    chatPlaceholder: "Tell me about your musical tastes... 🎵",
    aiGreeting: "Hi! I'm your AI assistant to discover the best music festivals in the world. Tell me about your musical tastes and I'll suggest unforgettable trips!",
    aiResponse: "Great choice! Based on your preferences, I recommend Tomorrowland festival in Belgium for electronic music, or Coachella in California for an eclectic mix. Would you like me to show you complete packages?",
    recommendations: "Personalized AI Recommendations",
    testimonials: "They Lived The GrooveNomad Experience",
    ctaTitle: "Ready For Your Next Festival?",
    ctaDescription: "Start your conversation with our AI and discover festivals that perfectly match your musical tastes.",
    ctaButton: "Start My Musical Journey",
    footerDescription: "Your AI companion to discover the best music festivals in the world",
    copyright: "All rights reserved. Responsible travel, passionate music."
  },
  es: {
    title: "Descubre Festivales",
    subtitle: "Que Te Representen",
    description: "Nuestra IA personalizada analiza tus gustos musicales para sugerirte viajes únicos a festivales alrededor del mundo. Déjate guiar hacia tu próximo viaje musical inolvidable.",
    chatPlaceholder: "Cuéntame sobre tus gustos musicales... 🎵",
    aiGreeting: "¡Hola! Soy tu asistente IA para descubrir los mejores festivales de música del mundo. ¡Cuéntame tus gustos musicales y te sugeriré viajes inolvidables!",
    aiResponse: "¡Excelente elección! Basado en tus preferencias, te recomiendo el festival Tomorrowland en Bélgica para electrónica, o Coachella en California para una mezcla ecléctica. ¿Quieres que te muestre paquetes completos?",
    recommendations: "Recomendaciones IA Personalizadas",
    testimonials: "Vivieron La Experiencia GrooveNomad",
    ctaTitle: "¿Listo Para Tu Próximo Festival?",
    ctaDescription: "Comienza tu conversación con nuestra IA y descubre festivales que coincidan perfectamente con tus gustos musicales.",
    ctaButton: "Comenzar Mi Viaje Musical",
    footerDescription: "Tu compañero IA para descubrir los mejores festivales de música del mundo",
    copyright: "Todos los derechos reservados. Viaje responsable, música apasionada."
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
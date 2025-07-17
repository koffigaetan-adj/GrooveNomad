import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe } from 'lucide-react';

function About() {
  const [language, setLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    // ✅ Afficher le popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    setFormData({ name: '', email: '', message: '' });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
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
                <Link to="/about" className="hover:text-orange-400 transition-colors">À propos</Link>
                <Link to="/contact" className="text-orange-400 transition-colors">Contact</Link>
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

      <main className="pt-32 pb-20 px-6 container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent text-center">
          Contactez-nous
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Une question ? Un projet ? Envie de vibrer au rythme des meilleurs festivals ? L’équipe GrooveNomad est à votre écoute.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            name="message"
            placeholder="Votre message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition"
          >
            Envoyer
          </button>
        </form>
      </main>

      {/* ✅ POPUP CONFIRMATION */}
      {showPopup && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
          Message envoyé à la team GrooveNomad 🎉
        </div>
      )}

      <footer className="mt-20 py-8 text-center border-t border-white/10 text-gray-400">
        <p>&copy; 2025 GrooveNomad. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default About;

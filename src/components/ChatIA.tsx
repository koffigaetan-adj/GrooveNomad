import { useEffect, useRef, useState } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const ChatIA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleConsentChange = () => {
    setConsentGiven(!consentGiven);
    setShowAlert(false);
  };

  useEffect(() => {
    if (containerRef.current && !chatLoaded) {
      createChat({
        webhookUrl: 'https://jeytobermories.app.n8n.cloud/webhook/1e5454de-700c-492c-b57d-5ce15fc46d0e/chat',
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        target: containerRef.current,
        mode: 'fullscreen',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: { source: 'GrooveNomad' },
        showWelcomeScreen: false,
        defaultLanguage: 'fr',
        initialMessages: [
          '🎵 Agent GrooveNomad à votre service !',
          'Pose-moi toutes tes questions sur les festivals ✈️🎶',
        ],
        i18n: {
          fr: {
            title: 'Assistant virtuel',
            subtitle: "Commence la discussion. On est là pour t'aider !",
            footer: '',
            getStarted: 'Nouvelle conversation',
            inputPlaceholder: 'Tape ta question ici...',
          },
        },
        theme: {
          accentColor: '#F97316',
          userMessageBackgroundColor: '#F97316',
          botMessageBackgroundColor: '#6817a1ff'
        },
      });
      setChatLoaded(true);
    }
  }, [consentGiven, chatLoaded]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Conteneur du chat avec overlay flou si non accepté */}
      <div className="relative">
        <div
          id="chat-container"
          ref={containerRef}
          style={{
            width: '100%',
            height: '80vh',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(63,94,251,0.1), rgba(252,70,107,0.1))',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Flou léger au-dessus tant que la case n’est pas cochée */}
        {!consentGiven && (
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-all duration-300"
            style={{
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              borderRadius: '20px',
            }}
          />
        )}
      </div>

      {/* Checkbox de consentement */}
      <div className="mt-4 text-sm text-white flex items-start space-x-2">
        <input
          type="checkbox"
          id="consent"
          checked={consentGiven}
          onChange={handleConsentChange}
          className="accent-orange-500 mt-1 w-4 h-4"
        />
        <label htmlFor="consent">
          En cochant cette case, j’accepte la{' '}
          <a
            href="/pages/Confidentialite"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-orange-400 hover:text-orange-500"
          >
            Politique de Confidentialité de GrooveNomad
          </a>
        </label>
      </div>

      {/* Message d’alerte rouge */}
      {showAlert && (
        <p className="text-red-500 text-sm mt-2">
          ❗Veuillez accepter la politique de confidentialité pour utiliser le chat.
        </p>
      )}
    </div>
  );
};

export default ChatIA;

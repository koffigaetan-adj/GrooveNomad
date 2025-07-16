import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const ChatIA = () => {
  useEffect(() => {
    const container = document.getElementById('chat-container');
    if (container) {
      createChat({
        webhookUrl: 'https://n8n.srv856869.hstgr.cloud/webhook/1e5454de-700c-492c-b57d-5ce15fc46d0e/chat',
        mode: 'fullscreen',
        title: 'GrooveNomad AI',
        description: 'Pose-moi toutes tes questions sur les festivals !',
        theme: {
          accentColor: '#F97316',
        },
        initialMessage: '🎵 Agent Groove Nomad à votre service !',
        target: container, // 👈 cible DOM explicite
      });
    }
  }, []);

  return <div id="chat-container" style={{ width: '100%', height: '80vh',  borderRadius: '20px', // ✅ coins arrondis
        overflow: 'hidden',
        backdropFilter: 'blur(12px)', // ✅ effet de flou arrière
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
 }} />;
};

export default ChatIA;

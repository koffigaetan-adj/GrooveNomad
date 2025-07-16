# 🎶 GrooveNomad

GrooveNomad est une application web immersive dédiée aux passionnés de musique et de festivals. Elle aide les utilisateurs à découvrir, aimer et réserver des festivals à travers le monde, grâce à une interface dynamique, une carte interactive et un chatbot intelligent.

---

## 🌟 Fonctionnalités

- 💬 **Chat IA** interactif (remplaçant le formulaire multi-étapes)
- 🗺️ **Carte Google Maps** interactive avec festivals géolocalisés
- 📆 Affichage des **festivals à venir** (Europe, Asie, USA)
- 🌐 Interface **multilingue** (français/anglais)
- 💡 Section “How it works” animée
- ❤️ Système de **likes et réservations**
- 📱 **Responsive design** avec animations fluides

---

## ⚙️ Installation

### ✅ Prérequis

- Node.js v18+
- Compte Google Cloud pour Maps API (clé nécessaire)
- Instance n8n auto-hébergée ou publique avec webhook actif

### 📦 Dépendances à installer

```bash
# Cloner le projet
git clone https://github.com/koffigaetan-adj/GrooveNomad.git
cd GrooveNomad

# Installer les dépendances principales
npm install

# Dépendances spécifiques
npm install react-router-dom
npm install --save-dev @types/react-router-dom

npm install @n8n/chat
npm install @react-google-maps/api
npm install --save-dev @types/google.maps

# Lancer le projet en développement
npm run dev

```
---
## 🗂️ Structure du projet

```bash
📁 src
 ┣ 📂 components         → Tous les composants React réutilisables (Hero, FestivalCard, Header, Footer, ChatIA, etc.)
 ┣ 📂 data               → Données brutes (rawFestivals.ts)
 ┣ 📂 pages              → Pages statiques (About, Contact, Confidentialité)
 ┣ 📂 hooks              → Hooks personnalisés
 ┣ 📂 contexts           → Contexte global (ex: thème)
 ┣ 📂 assets             → Images, logos, polices
 ┣ 📄 App.tsx            → Composant principal avec routing
 ┣ 📄 main.tsx           → Point d'entrée Vite
 ┣ 📄 index.css          → Styles globaux (avec Tailwind)
```
---
## 🗺️ Google Maps
Utilisation de `@react-google-maps/api` pour afficher les festivals sur une carte dynamique.

## 🔑 Clé API requise
Créer un fichier `.env` à la racine du projet avec la ligne suivante :
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

```
---
### 🤖 Chat IA (n8n)
- Le composant ChatIA.tsx.
- Intégré avec @n8n/chat pour simuler une conversation utilisateur.
- Connexion à un scénario n8n qui guide les utilisateurs.


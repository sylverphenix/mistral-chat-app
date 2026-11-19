# App web minimale — Chat Mistral

App de chat simple qui appelle l'API Mistral via le SDK TypeScript officiel (`@mistralai/mistralai`) avec le modèle `mistral-small-latest`.

- Interface de chat : `public/index.html`
- Serveur + endpoint `/api/chat` : `server.js`
- La clé `MISTRAL_API_KEY` reste uniquement côté serveur (jamais envoyée au navigateur).

## Installation

```bash
npm install
```

## Configuration

Copiez `.env.example` en `.env` et renseignez votre clé API (créable sur https://console.mistral.ai) :

```bash
cp .env.example .env
```

Puis exportez la variable avant de lancer le serveur :

```bash
export $(grep -v '^#' .env | xargs)
```

## Lancement local

```bash
npm start        # ou : npm run dev (rechargement automatique)
```

Ouvrez http://localhost:3000 dans votre navigateur.

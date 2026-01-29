# TicketMaster Frontend

Interface web pour gérer les tickets. Construit avec **React 19** et **Create React App**.

## Installation

### Prérequis
- Node.js 16+
- npm (inclus avec Node.js)

### Étapes

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

L'app s'ouvre automatiquement sur `http://localhost:3000`

## Fonctionnalités

- ✅ Voir la liste des tickets
- ✅ Créer un nouveau ticket
- ✅ Modifier le statut d'un ticket
- ✅ Supprimer un ticket

## Structure du projet

```
src/
├── App.js                    # Composant principal
├── App.css                   # Styles
├── index.js                  # Point d'entrée
└── components/
    ├── TicketForm.js         # Formulaire pour créer un ticket
    ├── TicketList.js         # Liste des tickets
    ├── TicketItem.js         # Un ticket individuel
    └── TicketService.js      # Appels API
```

## Fichiers principaux

### App.js
Composant principal. Gère l'état des tickets et les appels API.

### components/TicketService.js
Contient les fonctions pour communiquer avec le backend :
- `getTickets()` : Récupère tous les tickets
- `createTicket(data)` : Crée un nouveau ticket
- `updateTicket(id, changes)` : Modifie un ticket
- `deleteTicket(id)` : Supprime un ticket

### components/TicketForm.js
Formulaire pour créer un ticket. Envoie les données au backend.

### components/TicketList.js
Affiche la liste des tickets. Utilise TicketItem pour chaque ticket.

### components/TicketItem.js
Composant pour un ticket individuel. Boutons pour modifier/supprimer.

## Commandes utiles

### Développement
```bash
npm start     # Lance le serveur (http://localhost:3000)
```

### Tests
```bash
npm test      # Lance les tests
```

### Production
```bash
npm run build # Crée une version optimisée dans le dossier 'build/'
```

## Configuration de l'API

L'URL du backend est configurée dans `TicketService.js`. Par défaut :
```javascript
'http://172.16.112.75:8000'
```

À modifier si le backend est sur une autre adresse.

## Structure d'un ticket

```json
{
  "id": 1,
  "title": "Titre du ticket",
  "description": "Description",
  "status": "Open",
  "priority": "Medium",
  "tags": ["feature"],
  "createdAt": "2026-01-29T10:00:00Z",
  "updatedAt": "2026-01-29T10:00:00Z"
}
```

## Points de statut

- **Open** : Nouveau ticket
- **In Progress** : En cours de traitement
- **Closed** : Terminé

## Points de priorité

- **Low** : Faible
- **Medium** : Moyen
- **High** : Élevé

## Voir aussi

Pour le backend : voir le repo [TicketMaster-Backend](../TicketMaster-Backend)

# Stickmania
Creation d'un wario ware 

# Conventions de Nommage et de Commit

Ce document décrit les conventions à respecter pour les noms de fichiers, dossiers, branches, et les messages de commit dans ce projet React.

---

## Conventions de Nommage

### 1. **Fichiers**
- Utiliser le **PascalCase** pour les noms des composants React.
  - Exemple : `Button.jsx`, `UserProfile.js`
- Utiliser le **kebab-case** pour les autres fichiers.
  - Exemple : `api-client.js`, `use-auth.js`
- Ajouter une extension explicite pour indiquer le type de fichier : 
  - `.jsx` ou `.tsx` pour les composants React.
  - `.js` ou `.ts` pour les utilitaires et autres fichiers JavaScript/TypeScript.

### 2. **Dossiers**
- Utiliser le **kebab-case** pour les noms de dossiers.
  - Exemple : `components`, `hooks`, `pages`
- Organiser les dossiers par fonctionnalité ou catégorie (pas par type de fichier).
  - Exemple :
    ```
    src/
    ├── composants/
    │   ├── Button/
    │   │   ├── Button.jsx
    │   │   ├── Button.module.css
    │   │   └── index.js
    ├── ui/
    ├── pages/
    ├── styles/
    ├── utils/
    ```

### 3. **Branches Git**
- Suivre ce modèle : `<type>/<description>`.
- Les types courants sont :
  - `feature` : pour une nouvelle fonctionnalité.
  - `fix` : pour une correction de bug.
  - `hotfix` : pour une correction urgente.
  - `refactor` : pour une amélioration ou restructuration du code sans ajout de fonctionnalité.
- Exemple :
  - `feature/ajout-authentification`
  - `fix/correction-login`
  - `refactor/reorganisation-services`

---

## Conventions de Commit

### Structure des messages de commit
- Un message de commit doit être clair et suivre ce format :

  ```
  <type>: <courte description>

  <description détaillée (facultative)>
  ```

### Types de commit
- **feat** : ajout d'une nouvelle fonctionnalité.
- **fix** : correction de bug.
- **docs** : changements concernant la documentation.
- **style** : modifications purement esthétiques (indentation, formatage, etc.).
- **refactor** : refactorisation du code.
- **test** : ajout ou modification de tests.
- **chore** : tâches diverses (mise à jour des dépendances, configuration, etc.).

### Exemple de messages de commit

1. Pour une nouvelle fonctionnalité :
   ```
   feat: ajout de l'authentification par email

   - Implémentation de la logique d'inscription
   - Ajout des tests unitaires pour la fonction de connexion
   ```

2. Pour une correction de bug :
   ```
   fix: correction de l'erreur 500 sur la page d'accueil

   - Résolution du problème lié à la récupération des données API
   ```

3. Pour un changement de style :
   ```
   style: uniformiser les indentations dans tous les fichiers CSS
   ```

---

## Outils Recommandés

Pour faciliter le respect de ces conventions :
- **Prettier** / **ESLint** : pour maintenir une qualité de code cohérente.
- **React DevTools** : pour déboguer efficacement les composants React.

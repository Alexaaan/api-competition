# 🏆 API Competition

API REST développée avec **NestJS** permettant de gérer des utilisateurs, des matchs et l’authentification via JWT.  
Le projet a pour objectif de proposer une base solide pour un système de compétition avec gestion des rôles et documentation automatique via **Swagger**.

---

## 📘 Description de l’API

L’API est construite sur le framework **NestJS** et offre plusieurs modules :

| Module | Fichier principal | Description |
|--------|-------------------|-------------|
| Auth | [`AuthModule`](src/auth/auth.module.ts) ([src/auth/auth.module.ts](src/auth/auth.module.ts)) | Gestion de l’authentification (register, login, logout, refresh, password-reset). Voir [`AuthController`](src/auth/auth.controller.ts) et [`AuthService`](src/auth/auth.service.ts). |
| Users | [`UsersModule`](src/users/users.module.ts) ([src/users/users.module.ts](src/users/users.module.ts)) | CRUD pour les utilisateurs (protégé par JWT & rôles). Voir [`UsersController`](src/users/users.controller.ts) et [`UsersService`](src/users/users.service.ts). |
| Matches | [`MatchesModule`](src/matches/matches.module.ts) ([src/matches/matches.module.ts](src/matches/matches.module.ts)) | Création et gestion des matchs entre utilisateurs. Voir [`MatchesController`](src/matches/matches.controller.ts) et [`MatchesService`](src/matches/matches.service.ts). |
| Swagger | Configuration dans [`main.ts`](src/main.ts) ([src/main.ts](src/main.ts)) | Documentation automatique disponible sur `/api/docs` en développement. |

Sécurité / authentification :
- Basée sur **JWT (JSON Web Token)** via [`JwtStrategy`](src/auth/jwt.strategy.ts).
- Garde d’authentification : [`JwtAuthGuard`](src/auth/jwt-auth.guard.ts).
- Gestion des rôles : décorateur [`Roles`](src/auth/roles.decorator.ts) et garde [`RolesGuard`](src/auth/roles.guard.ts).
- Les routes nécessitant un token sont annotées avec `@ApiBearerAuth()` et protégées par les guards.

---

## ⚙️ Caractéristiques principales

- Enregistrement / connexion des utilisateurs (hashage des mots de passe avec bcrypt).
- Refresh token simple en mémoire (implémenté dans [`AuthService`](src/auth/auth.service.ts)).
- CRUD utilisateurs, avec protection par rôles (`admin`).
- CRUD matchs entre utilisateurs.
- Base de données SQLite (fichier `competition.db` par défaut) avec TypeORM.
- Documentation Swagger disponible en développement sur `/api/docs`.

---

## 🧾 Prérequis

- Node.js >= 18
- npm ou yarn

---

## 🚀 Installation & Lancement

1. Cloner le dépôt
```bash
git clone https://github.com/Aleexaan/api-competition.git
cd api-competition
```

2. Installer les dépendances
```bash
npm install
# ou
# yarn
```

3. Variables d’environnement (optionnel)
- Par défaut l’application utilise `competition.db` comme base sqlite et `SECRET_KEY` comme secret JWT si `JWT_SECRET` non défini.
- Exemple de fichier `.env` :
```env
PORT=3000
JWT_SECRET=ma_cle_secrete
NODE_ENV=development
```

4. Lancer l’application
```bash
npm run start:dev
# ou en production
npm run build
npm run start:prod
```

La doc Swagger sera disponible sur http://localhost:3000/api/docs en environnement non-production (configurée dans [`src/main.ts`](src/main.ts)).

---

## 🧪 Tests

- Lancer les tests unitaires :
```bash
npm test
```

- Lancer les tests end-to-end (e2e) :
```bash
npm run test:e2e
```

Les tests et la configuration jest se trouvent dans [`package.json`](package.json) et [`test/jest-e2e.json`](test/jest-e2e.json).

---

## 📚 Endpoints principaux (récapitulatif)

Auth
- POST /auth/register — enregistrement ([`AuthController.register`](src/auth/auth.controller.ts))
- POST /auth/login — connexion, retourne access_token + refresh_token ([`AuthController.login`](src/auth/auth.controller.ts))
- POST /auth/logout — déconnexion (requiert JWT) ([`AuthController.logout`](src/auth/auth.controller.ts))
- POST /auth/refresh — rafraîchir access token ([`AuthController.refresh`](src/auth/auth.controller.ts))
- POST /auth/password-reset — demande de réinitialisation ([`AuthController.passwordReset`](src/auth/auth.controller.ts))

Users
- GET /users — liste des utilisateurs (admin seulement, voir [`UsersController`](src/users/users.controller.ts))
- GET /users/:id — récupérer utilisateur par id
- PATCH /users/:id — mettre à jour utilisateur
- DELETE /users/:id — supprimer utilisateur

Matches
- POST /matches — créer un match ([`MatchesController.create`](src/matches/matches.controller.ts))
- GET /matches — lister les matchs
- GET /matches/:id — récupérer match par id
- PATCH /matches/:id — mettre à jour match
- DELETE /matches/:id — supprimer match (réservé admin)

---

## 🧩 Structure du projet

- src/
  - app.module.ts — point d’entrée du module ([`AppModule`](src/app.module.ts))
  - main.ts — bootstrap + Swagger ([src/main.ts](src/main.ts))
  - auth/ — tout ce qui concerne l’authentification ([src/auth](src/auth))
  - users/ — gestion des utilisateurs ([src/users](src/users))
  - matches/ — gestion des matchs ([src/matches](src/matches))

---

## 🛠️ Développement & bonnes pratiques

- Format : `npm run format`
- Lint : `npm run lint`
- Build : `npm run build`

Notes :
- La gestion des refresh tokens est ici en mémoire (Map) pour simplicité. En production, stocker les refresh tokens de manière persistante (DB, Redis, …).
- Synchronize=true dans TypeORM (voir [`AppModule`](src/app.module.ts)) permet la création automatique des tables en développement. Pensez à désactiver en production et utiliser des migrations.

---

## 🤝 Contribution

Contributions bienvenues. Ouvrez une issue ou une PR pour proposer des améliorations (ex : persistance des refresh tokens, tests supplémentaires, migrations TypeORM).

---

## 📄 Licence

Projet fourni tel quel (voir `package.json` pour les informations de licence).
# AGRITECH VISION

## Équipes 👥
- Mélissa BILLARD
- Rita CARRILHO LAMEIRA
- Lola BRACCIALE-COMBAS
- Fatima-zhara BOUHASSOUN 
- Nemo LENGAGNE
- (Charlie PETRE) *présent uniqument  la 1er année*

## ⚙️ Prérequis

- Node.js et npm installés
- WAMP (ou tout autre serveur local pour MySQL)
- Angular CLI (`npm install -g @angular/cli`)

## 🗄️ 1. Base de données (WAMP)

1. Lancez WAMP (ou équivalent).
2. Créez une base de données nommée **`agritechvision`**.
3. Importez le fichier SQL fourni (`agritechvision.sql`) pour créer les **tables** et insérer les **données par défaut**.

### Comptes par défaut :

| Rôle        | Email                      | Mot de passe  |
|-------------|----------------------------|---------------|
| Administrateur | `admin@example.com`        | `admin1450`    |
| Utilisateur métier | `agriculteur1@example.com` | `johnny1221`   |

## 🔙 2. Back-end (Express.js)

1. Ouvrez un terminal dans le dossier **`/back`**.
2. Installez les dépendances :
    ```bash
   npm install
3. Lancez le serveur Express :
   ```bash
   npm start 

⚠️ Assurez-vous que WAMP et la base de données sont actifs avant de lancer le back-end, sinon les connexions échoueront.

🌐 3. Front-end (Angular)
Ouvrez un terminal dans le dossier /front.

Installez les dépendances :

bash
Copier
Modifier
npm install
Lancez le serveur Angular :

bash
Copier
Modifier
npm start
Accédez à l’application via votre navigateur à l’adresse :
👉 http://localhost:4200/

✅ Navigation
Une fois toutes les couches démarrées :

Accédez au site via votre navigateur.

Connectez-vous avec l’un des comptes fournis ci-dessus.

Profitez des fonctionnalités de gestion proposées par Agritech Vision !

💡 Astuce
Si le site ne fonctionne pas, vérifiez que :

WAMP est lancé

La base de données est bien importée

Les serveurs back et front sont démarrés

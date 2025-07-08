# AGRITECH VISION

## Équipes 👥
- Mélissa BILLARD
- Rita CARRILHO LAMEIRA
- Lola BRACCIALE-COMBAS
- Fatima-zhara BOUHASSOUN 
- Nemo LENGAGNE
- (Charlie PETRE) *présent uniquement  la 1er année*

## ⚙️ Prérequis

- Node.js et npm installés
- WAMP (ou tout autre serveur local pour MySQL)
- Angular CLI (`npm install -g @angular/cli`)

## 1. Base de données (WAMP)

1. Lancez WAMP (ou équivalent).
2. Créez une base de données nommée **`agritechvision`**.
3. Importez le fichier SQL fourni (`agritechvision.sql`) pour créer les **tables** et insérer les **données par défaut**.

### Comptes par défaut :

| Rôle        | Email                      | Mot de passe  |
|-------------|----------------------------|---------------|
| Administrateur | `admin@example.com`        | `admin1240`    |
| Utilisateur métier | `agriculteur1@example.com` | `johnny1241`   |

## 2. Back-end (Express.js)

1. Ouvrez un terminal dans le dossier **`/back`**.
2. Installez les dépendances :
    ```bash
   npm install
3. Lancez le serveur Express :
   ```bash
   npm start 

⚠️ Assurez-vous que WAMP et la base de données sont actifs avant de lancer le back-end, sinon les connexions échoueront.

## 3. Front-end (Angular)

Ouvrez un terminal dans le dossier **`/front`**.

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Lancez le serveur Angular :

   ```bash
   npm start
   ```

3. Accédez à l’application via votre navigateur à l’adresse :  
   **http://localhost:4200/**

4. Navigation

| URL / Route             | Fonctionnalité / Utilité                          |
|-------------------------|---------------------------------------------------|
| `/login`                | Page de connexion des utilisateurs                |
| ....                    |                                                   |
|                         |                                                   |

---

## 💡 Astuce

Si le site ne fonctionne pas, vérifiez que :

- WAMP est lancé  
- La base de données est bien importée  
- Les serveurs **back** et **front** sont démarrés  

---

## 4. Caméra
Pour la partie caméra, il faut s’assurer que l’URL d’accès est à jour, celle-ci pouvant fluctuer si elle est modifiée par le développeur en charge de l’administration de la caméra.

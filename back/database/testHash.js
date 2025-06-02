const { hashPassword } = require('./passwordUtils');

// Récupère le mot de passe depuis la ligne de commande
const password = process.argv[2];

console.log(password)

if (!password) {
  console.error('❌ Veuillez fournir un mot de passe :');
  console.error('Exemple : node testHash.js monMotDePasse123');
  process.exit(1);
}

hashPassword(password, (err, hash) => {
  if (err) {
    console.error('Erreur de hash :', err);
  } else {
    console.log('✅ Mot de passe hashé :', hash);
  }
});

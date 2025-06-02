const bcrypt = require('bcrypt');

// Function to hash a password
function hashPassword(password, callback) {
    const saltRounds = 10; // The number of hashing rounds
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing the password:', err);
        } else {
            // console.log('Hashed password:', hash); // Display the hashed password
            callback(err, hash);
        }
    });
}

module.exports = { hashPassword };
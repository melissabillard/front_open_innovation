const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// TOKEN
// const userServices = require("../services/userServices");
const { setToken } = require('../token.js');

// PASSWORD UTILS
const { hashPassword } = require('../database/passwordUtils.js');

// Database config
const configureDBConnection = require('../database/dbConfig');

// Configuration of the MySQL database connection
const db = configureDBConnection();

// Hachage Password
Router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Utilisez la fonction de hachage pour hacher le mot de passe
    hashPassword(password, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing the password:', err);
            return res.status(500).json({ error: 'An error occurred while hashing the password' });
        }

        res.status(200).json({
            message: 'User registered successfully',
            hashedPassword: hashedPassword 
        });
    });
});

// Define the POST route for checking if a user exists
Router.post("/check-credentials", (req, res) => {
    const { email, password } = req.body;

    console.log("Email - user", email);

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if a user with the provided email exists
    db.query('SELECT * FROM utilisateurs WHERE Email = ?', [email], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An error occurred while checking for an existing user' });
        } else {
            if (rows.length > 0) {
                const storedHashedPassword = rows[0].Mot_de_passe;

                const { Id_Utilisateur, Role } = rows[0];

                bcrypt.compare(password, storedHashedPassword, (err, result) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        res.status(500).json({ error: 'An error occurred while comparing passwords' });
                    } else if (result) {
                        // User credentials are correct
                        console.log('User credentials are correct');

                        // Generate a JWT token (if you are using JWT)
                        const token = jwt.sign({ id: Id_Utilisateur, roles: Role }, 'secretkey277898145865');

                        setToken(token); // Store the token

                        // Return the user's ID, roles, and the token
                        res.status(200).json({ message: 'User credentials are correct', token });
                    } else {
                        // Incorrect password
                        console.log('Incorrect password');
                        res.status(401).json({ error: 'Incorrect password' });
                    }
                });
            } else {
                // User with the provided email not found
                console.log('User not found');
                res.status(401).json({ error: 'User not found' });
            }
        }
    });
});


// GET ---- > All Users with Service and Function
Router.get("/allUsers", (req, res) => {
    const sql = `
    SELECT U.Nom, U.Prenom, U.Date_de_naissance, U.Telephone, U.Adresse_Mail AS "Email", S.NomService AS "Service", F.Nom_Fonction AS "Fonction", E.NomComerciale AS "Entreprise"
    FROM Utilisateur U 
    LEFT JOIN Service S ON U.ID_Utilisateur = S.id_service 
    LEFT JOIN Fonction F ON U.ID_Utilisateur = F.id_fonction
    LEFT JOIN Entreprise E ON U.ID_Utilisateur = E.ID_entreprise
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(rows);
        }
    });
});

// GET ---- > Specific User with Service and Function 
Router.get("/InfoUser/:id", (req, res) => {
    const userId = req.params.id;
    console.log("userId", userId);

    const sql = `
    SELECT U.Nom, U.Prenom, U.Date_de_naissance, U.Telephone, U.Adresse_Mail AS "Email", S.NomService AS "Service", F.Nom_Fonction AS "Fonction", E.NomComerciale AS "Entreprise"
    FROM utilisateurq U 
    LEFT JOIN Service S ON U.ID_Utilisateur = S.id_service 
    LEFT JOIN Fonction F ON U.ID_Utilisateur = F.id_fonction
    LEFT JOIN Entreprise E ON U.ID_Utilisateur = E.ID_entreprise
    WHERE U.Id_Utilisateur = ?;
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(rows);
        }
    });
});


// GET ---- > Specific Appointment for a User
Router.get("/AllAppointments/:id", (req, res) => {

    const userId = req.params.id;
    console.log("userId", userId);

    const sql = `
      SELECT D.* 
      FROM Demandeur D 
      WHERE D.ID_Utilisateur = ?;
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(rows);
        }
    });
});


// GET ---- > Specific Incident Report for a User
Router.get("/incident-report/:id", (req, res) => {

    const userId = req.params.id;
    console.log("userId", userId);

    const sql = `
    SELECT F.Anonyme AS "Declaration anonyme", F.Date_heure AS "Date/Heure demande", F.Lieu_incident "Lieu incident", F.description_incident AS "Description incident", F.Confidentialité AS "Communication interne autorisée", F.EstVictime
    FROM Formulaire_de_demande F 
    WHERE F.ID_Utilisateur = ?;
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        } else {
            res.json(rows);
        }
    });
});


module.exports = Router;
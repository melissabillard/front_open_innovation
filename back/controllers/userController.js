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
    db.query('SELECT * FROM Utilisateurs WHERE Email = ?', [email], (err, rows) => {
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
                        console.log('Incorrect password : ' + password);
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

Router.get("/all-users", (req, res) => {
    const sql = `
        SELECT U.Id_Utilisateur, U.Nom, U.Prenom, U.Email, U.Type, E.Nom_marque, E.Siret, E.Siren, E.Adresse, E.Ville, E.CP, E.Pays
        FROM utilisateurs U
        JOIN entite E ON U.Id_Utilisateur = E.Id_Utilisateur;
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

Router.get("/info-user/:id", (req, res) => {
    const userId = req.params.id;
    // console.log("userId", userId);

    const sql = `
        SELECT U.Id_Utilisateur, U.Nom, U.Prenom, U.Email, U.Type, E.Nom_marque, E.Siret, E.Siren, E.Adresse, E.Ville, E.CP, E.Pays
        FROM utilisateurs U
        JOIN entite E ON U.Id_Utilisateur = E.Id_Utilisateur
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

Router.get("/all-site-users", (req, res) => {
    const sql = `
        SELECT 
	U.Id_Utilisateur,
    U.Nom, 
    U.Prenom, 
    E.id_entite,
    E.Nom_marque,
    S.id_site,
    S.Nom AS Nom_Site,
    S.Ville,
    S.CP
    FROM 
        utilisateurs U
    JOIN 
        entite E ON U.Id_Utilisateur = E.Id_Utilisateur
    JOIN 
        site S ON U.Id_Utilisateur = S.Id_Utilisateur;
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

Router.get("/site-user/:id", (req, res) => {
    const userId = req.params.id;
    // console.log("userId", userId);

    const sql = `
       SELECT 
	U.Id_Utilisateur,
    U.Nom, 
    U.Prenom, 
    E.id_entite,
    E.Nom_marque,
    S.id_site,
    S.Nom AS Nom_Site,
    S.Ville,
    S.CP
    FROM 
        utilisateurs U
    JOIN 
        entite E ON U.Id_Utilisateur = E.Id_Utilisateur
    JOIN 
        site S ON U.Id_Utilisateur = S.Id_Utilisateur
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

Router.get("/interventions-user/:id", (req, res) => {

    const userId = req.params.id;
    // console.log("userId", userId);

    const sql = `
        SELECT * FROM interventions I
        WHERE I.Id_Utilisateur = ?;
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

Router.get("/vaches-user/:id", (req, res) => {

    const userId = req.params.id;
    // console.log("userId", userId);

    const sql = `
    SELECT 
        U.Id_Utilisateur,
        U.Nom AS Nom_Utilisateur,
        U.Prenom AS Prenom_Utilisateur,
        E.id_entite,
        E.Nom_marque,
        S.id_site,
        S.Nom AS Nom_Site,
        S.Ville,
        S.CP,
        V.id_vache,
        V.Nom_vache,
        V.Num_etiquettes_auriculaires,
        V.Etat,
        V.Note_interne
        FROM 
            utilisateurs U
        JOIN 
            entite E ON U.Id_Utilisateur = E.Id_Utilisateur
        JOIN 
            site S ON U.Id_Utilisateur = S.Id_Utilisateur
        JOIN 
            vaches V ON E.id_entite = V.id_entite AND S.id_site = V.id_site
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


module.exports = Router;
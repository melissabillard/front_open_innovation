const express = require('express');
const Router = express.Router();
// const passport = require('passport');
// const { getToken } = require('../token');

// Database config
const configureDBConnection = require('../database/dbConfig');

// Configuration of the MySQL database connection
const db = configureDBConnection();


// Function to check the validity of the date
function isValidDateFunction(dateString) {
  const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return datePattern.test(dateString);
}


// POST ---- > Incident Report
Router.post("/add-incident-report", (req, res) => {
  const { Anonyme, Date_heure, Lieu_incident, description_incident, Confidentialité, EstVictime, ID_Utilisateur } = req.body;

  // console.log("req.body", req.body);

  if (Anonyme === undefined || !Date_heure || !Lieu_incident || !description_incident || Confidentialité === undefined || EstVictime === undefined || !ID_Utilisateur) {
    return res.status(400).json({ error: 'Toutes les données sont requises' });
  }

  // Checking the validity of the date  
  const isValidDate = isValidDateFunction(Date_heure);
  if (!isValidDate) {
    return res.status(400).json({ error: 'Date_heure n\'est pas dans un format valide' });
  }

  // Checking the validity of Anonyme and Confidentialité and EstVictime (must be booleans)
  if (typeof Anonyme !== 'boolean' || typeof Confidentialité !== 'boolean' || typeof EstVictime !== 'boolean') {
    return res.status(400).json({ error: 'Les champs doivent être des booléens' });
  }

  const tableName = "Formulaire_de_demande";
  const sql = `INSERT INTO ${tableName} (Anonyme, Date_heure, Lieu_incident, description_incident, Confidentialité, EstVictime, ID_Utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [Anonyme, Date_heure, Lieu_incident, description_incident, Confidentialité, EstVictime, ID_Utilisateur];

  db.query(sql, values, (err, result) => {
    if (err) {
      // console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion des données' });
    } else {
      res.status(201).json({ message: "Demande bien envoyée" });
    }
  });
});

// DELETE ---- > Incident Report
Router.delete("/delete-incident-report/:id", (req, res) => {
  const incidentId = req.params.id;

  if (isNaN(incidentId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const tableName = "Formulaire_de_demande";
  const sql = `DELETE FROM ${tableName} WHERE ID_Demande = ?`;

  db.query(sql, [incidentId], (err, result) => {
    if (err) {
      // console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while deleting data' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(201).json({ message: "Déclaration d'incident supprimé avec succès" });
    }
  });
});

// POST ---- > Appointment
Router.post("/add-appointment", (req, res) => {
  const { DateHeure_RDV, Description, Lieu, EnVisio, ID_Utilisateur, ID_Animateur } = req.body;

  if (!DateHeure_RDV || !Description || !Lieu || EnVisio === undefined || !ID_Utilisateur || !ID_Animateur) {
    return res.status(400).json({ error: 'Toutes les données sont requises' });
  }

  // Checking the validity of ID_Utilisateur (Int)
  if (typeof ID_Utilisateur !== 'number' || typeof ID_Animateur !== 'number') {
    return res.status(400).json({ error: "Type de l'identifiant incorrect (Entier seulement)" });
  }

  const tableName = "RendezVous";
  const sql = `INSERT INTO ${tableName} (DateHeure_RDV, Description, Lieu, EnVisio) VALUES (?, ?, ?, ?)`;
  const values = [DateHeure_RDV, Description, Lieu, EnVisio];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion des données' });
    } else {
      const rendezVousID = result.insertId;

      // INSERT table "demandeur"
      const currentDate = new Date();
      const demandeurTableName = "Demandeur";
      const demandeurSql = `INSERT INTO ${demandeurTableName} (ID_RendezVous, ID_Utilisateur, DateHeureDemande) VALUES (?, ?, ?)`;
      const demandeurValues = [rendezVousID, ID_Utilisateur, currentDate];

      db.query(demandeurSql, demandeurValues, (err) => {
        if (err) {
          res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion des données' });
        } else {
          // res.status(201).json({ message: "RDV demandeur crée" });
        }
      });

       // INSERT table "Participe"
       const participeTableName = "Participe";
       const participeSql = `INSERT INTO ${participeTableName} (ID_RendezVous, ID_Utilisateur) VALUES (?, ?)`;
       const participeValues = [rendezVousID, ID_Utilisateur];
 
       db.query(participeSql, participeValues, (err) => {
         if (err) {
           res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion des données' });
         } else {
           res.status(201).json({ message: "Rendez-vous créé avec succès" });
         }
       });
    }
  });
});

// DELETE ---- > Appointment
Router.delete("/delete-appointment/:id", (req, res) => {
  const appointmentId = req.params.id;

  if (isNaN(appointmentId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const tableName = "RendezVous";
  const sql = `DELETE FROM ${tableName} WHERE Id_RendezVous = ?`;

  db.query(sql, [appointmentId], (err, result) => {
    if (err) {
      // console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while deleting data' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(201).json({ message: "Rendez-vous supprimé avec succès" });
    }
  });
});

// POST ---- > Test ethics
Router.post("/test-ethics", (req, res) => {
  //Router.post("/test-ethics", passport.authenticate("jwt", { session: false }), (req, res) => {

  const { Score, ID_Utilisateur } = req.body;

  // console.log("req.body", req.body);

  if (!Score || !ID_Utilisateur) {
    return res.status(400).json({ error: 'Toutes les données sont requises' });
  }

  const tableName = "Test_Ethics";
  const sql = `INSERT INTO ${tableName} (Score, ID_Utilisateur) VALUES (?, ?)`;
  const values = [Score, ID_Utilisateur];

  db.query(sql, values, (err, result) => {
    if (err) {
      // console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'insertion des données' });
    } else {
      res.status(201).json({ message: "Score bien envoyée" });
    }
  });
});

// PATCH ---- > Update Test ethics
// Router.post("/update-test-ethics/:id", (req, res) => {
//   const testEthicsId = req.params.id;
//   const { Score } = req.body;

//   console.log("Score********", req.body);

//   if (!testEthicsId) {
//     return res.status(400).json({ error: 'Invalid ID' });
//   }

//   if (!Score) {
//     return res.status(400).json({ error: 'Invalid Score' });
//   }

//   const tableName = "Test_Ethics";
//   const sql = `UPDATE ${tableName} SET Score=? WHERE Id_TestEthics = ?`;

//   db.query(sql, [Score, testEthicsId], (err, result) => {
//     if (err) {
//       console.error('Error executing SQL query:', err);
//       res.status(500).json({ error: 'An error occurred while updating data' });
//     } else if (result.affectedRows === 0) {
//       res.status(404).json({ error: 'Record not found' });
//     } else {
//       res.status(200).json({ message: "Données mises à jour avec succès" });
//     }
//   });
// });

// DELETE ---- > Test ethics
Router.delete("/delete-test-ethics/:id", (req, res) => {
  const testEthicscId = req.params.id;

  if (isNaN(testEthicscId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const tableName = "Test_Ethics";
  const sql = `DELETE FROM ${tableName} WHERE Id_TestEthics = ?`;

  db.query(sql, [testEthicscId], (err, result) => {
    if (err) {
      // console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while deleting data' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(201).json({ message: "Score supprimé avec succès" });
    }
  });
});


module.exports = Router;
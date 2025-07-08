-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 08 juil. 2025 à 07:47
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `agritechvision`
--

-- --------------------------------------------------------

--
-- Structure de la table `accidents`
--

DROP TABLE IF EXISTS `accidents`;
CREATE TABLE IF NOT EXISTS `accidents` (
  `Id_accident` int NOT NULL AUTO_INCREMENT,
  `Type_accident` varchar(50) NOT NULL,
  `Commentaire_libre` varchar(50) DEFAULT NULL,
  `Id_vache` int NOT NULL,
  PRIMARY KEY (`Id_accident`),
  KEY `Id_vache` (`Id_vache`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `accidents`
--

INSERT INTO `accidents` (`Id_accident`, `Type_accident`, `Commentaire_libre`, `Id_vache`) VALUES
(1, 'Blessure', 'Blessure à la patte', 2),
(2, 'Maladie', 'Fièvre inexpliquée', 3);

-- --------------------------------------------------------

--
-- Structure de la table `cameras`
--

DROP TABLE IF EXISTS `cameras`;
CREATE TABLE IF NOT EXISTS `cameras` (
  `Id_camera` int NOT NULL AUTO_INCREMENT,
  `Numero_serie` varchar(150) NOT NULL,
  `Modele` varchar(50) NOT NULL,
  `Marque` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_camera`),
  UNIQUE KEY `Numero_serie` (`Numero_serie`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cameras`
--

INSERT INTO `cameras` (`Id_camera`, `Numero_serie`, `Modele`, `Marque`) VALUES
(1, '123456789', 'Modèle XYZ', 'Marque ABC');

-- --------------------------------------------------------

--
-- Structure de la table `entite`
--

DROP TABLE IF EXISTS `entite`;
CREATE TABLE IF NOT EXISTS `entite` (
  `Id_entite` int NOT NULL AUTO_INCREMENT,
  `Nom_marque` varchar(50) NOT NULL,
  `Siret` int NOT NULL,
  `Siren` int NOT NULL,
  `Adresse` varchar(150) NOT NULL,
  `Ville` varchar(100) NOT NULL,
  `CP` varchar(50) NOT NULL,
  `Pays` varchar(100) NOT NULL,
  `Id_Utilisateur` int NOT NULL,
  PRIMARY KEY (`Id_entite`),
  UNIQUE KEY `Siret` (`Siret`),
  UNIQUE KEY `Siren` (`Siren`),
  KEY `Id_Utilisateur` (`Id_Utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `entite`
--

INSERT INTO `entite` (`Id_entite`, `Nom_marque`, `Siret`, `Siren`, `Adresse`, `Ville`, `CP`, `Pays`, `Id_Utilisateur`) VALUES
(1, 'Ferme du Soleil', 2147483647, 987654321, '123 Rue de la Ferme', 'Ville Agricole', '12345', 'France', 2);

-- --------------------------------------------------------

--
-- Structure de la table `interventions`
--

DROP TABLE IF EXISTS `interventions`;
CREATE TABLE IF NOT EXISTS `interventions` (
  `Id_intervention` int NOT NULL,
  `Dates_Heures_intervention` datetime NOT NULL,
  `Intitule` varchar(50) NOT NULL,
  `Commentaire` varchar(50) DEFAULT NULL,
  `Id_Utilisateur` int NOT NULL AUTO_INCREMENT,
  `Id_accident` int DEFAULT NULL,
  PRIMARY KEY (`Id_intervention`),
  KEY `Id_Utilisateur` (`Id_Utilisateur`),
  KEY `Id_accident` (`Id_accident`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `interventions`
--

INSERT INTO `interventions` (`Id_intervention`, `Dates_Heures_intervention`, `Intitule`, `Commentaire`, `Id_Utilisateur`, `Id_accident`) VALUES
(1, '2024-04-17 11:00:00', 'Nettoyage de la plaie', 'Utilisation de désinfectant', 2, 1),
(2, '2024-04-17 12:00:00', 'Prise de température', 'Donner de l\'antibiotique', 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `site`
--

DROP TABLE IF EXISTS `site`;
CREATE TABLE IF NOT EXISTS `site` (
  `Id_site` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) DEFAULT NULL,
  `Ville` varchar(50) NOT NULL,
  `CP` varchar(50) NOT NULL,
  `Id_Utilisateur` int NOT NULL,
  `Id_entite` int NOT NULL,
  PRIMARY KEY (`Id_site`),
  KEY `Id_entite` (`Id_entite`),
  KEY `Id_Utilisateur` (`Id_Utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `site`
--

INSERT INTO `site` (`Id_site`, `Nom`, `Ville`, `CP`, `Id_Utilisateur`, `Id_entite`) VALUES
(1, 'Site Principal', 'Ville Agricole', '12345', 2, 1),
(2, 'Site Secondaire', 'Petite Ville', '54321', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `Id_Utilisateur` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Login` varchar(50) NOT NULL,
  `Mot_de_passe` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Type` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Utilisateur`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Login` (`Login`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`Id_Utilisateur`, `Nom`, `Prenom`, `Email`, `Login`, `Mot_de_passe`, `Type`) VALUES
(1, 'Admin', 'Admin', 'admin@example.com', 'admin', '$2b$10$hTdRmcbKmzrjaDhWj8COt.R0f06Fnq00qJxVus/YtcbjK3kzV0qNe', '1'),
(2, 'Cervantes', 'Johnny', 'agriculteur1@example.com', 'CEJO', '$2b$10$MXBczlvuRYl5WgMTbOcjVOdpI378wQeeGiL7d9mtg.ikF/sns3Ice', '2');

-- --------------------------------------------------------

--
-- Structure de la table `vaches`
--

DROP TABLE IF EXISTS `vaches`;
CREATE TABLE IF NOT EXISTS `vaches` (
  `Id_vache` int NOT NULL AUTO_INCREMENT,
  `Nom_vache` varchar(50) DEFAULT NULL,
  `Num_etiquettes_auriculaires` varchar(50) NOT NULL,
  `Etat` varchar(80) NOT NULL,
  `Note_interne` varchar(50) DEFAULT NULL,
  `Id_entite` int NOT NULL,
  `Id_site` int NOT NULL,
  PRIMARY KEY (`Id_vache`),
  UNIQUE KEY `Num_etiquettes_auriculaires` (`Num_etiquettes_auriculaires`),
  KEY `Id_entite` (`Id_entite`,`Id_site`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `vaches`
--

INSERT INTO `vaches` (`Id_vache`, `Nom_vache`, `Num_etiquettes_auriculaires`, `Etat`, `Note_interne`, `Id_entite`, `Id_site`) VALUES
(1, 'Vache1', '12345', 'Saine', NULL, 1, 1),
(2, 'Vache2', '54321', 'Malade', 'Besoin de suivi', 1, 1),
(3, 'Vache3', '67890', 'Saine', NULL, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

DROP TABLE IF EXISTS `videos`;
CREATE TABLE IF NOT EXISTS `videos` (
  `Id_video` int NOT NULL AUTO_INCREMENT,
  `Fichier` varchar(350) NOT NULL,
  `DateHeure` datetime NOT NULL,
  `Id_camera` int DEFAULT NULL,
  `Id_accident` int DEFAULT NULL,
  PRIMARY KEY (`Id_video`),
  KEY `Id_camera` (`Id_camera`),
  KEY `Id_accident` (`Id_accident`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `videos`
--

INSERT INTO `videos` (`Id_video`, `Fichier`, `DateHeure`, `Id_camera`, `Id_accident`) VALUES
(1, '/chemin/vers/video1.mp4', '2024-04-17 10:30:00', 1, 1),
(2, '/chemin/vers/video2.mp4', '2024-04-17 11:45:00', 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

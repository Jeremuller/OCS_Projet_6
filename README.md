
# Interface Utilisateur - Projet Web  

## Description  
Ce projet consiste à développer une interface utilisateur interactive en respectant un modèle graphique donné. L'application se connecte à une API pour récupérer des données dynamiques et les afficher de manière intuitive.  

L'objectif principal est de combiner des technologies front-end (HTML, CSS, Bootstrap, JavaScript) pour offrir une expérience utilisateur fluide, esthétique et fonctionnelle.  

---

## Fonctionnalités  
### 🖥️ Interface utilisateur  
- Navigation simple et intuitive.  
- Design responsive grâce à Bootstrap, s'adaptant à tous les types d'écrans (mobile, tablette, desktop).  

### 📡 Intégration de l'API  
- Récupération des données dynamiques via des appels API.  
- Affichage des films par catégories, avec des options interactives comme la sélection et le filtrage.  
- Gestion des erreurs pour assurer une expérience utilisateur sans interruption (fallbacks pour les images, messages en cas d’erreur réseau, etc.).  

### 🔧 Fonctionnalités additionnelles  
- Gestion des stocks de données affichées via un chargement dynamique.  
- Modal pour afficher les détails des films sélectionnés.  

---

## Technologies utilisées  
- **HTML5** : pour la structure sémantique des pages.  
- **CSS3** : pour le design et le style visuel.  
- **Bootstrap 5** : pour la mise en page responsive et les composants prêts à l'emploi.  
- **JavaScript (ES6)** : pour la gestion des événements, l'intégration API et l'interactivité.  

---

## API utilisée  
L'application consomme les données de l'API **OCMovies**. Cette API propose des données de films (titres, images, descriptions, etc.) organisées par catégories.  

Vous pouvez consulter la documentation complète et le guide d'installation de l'API en visitant le lien suivant :  
[Documentation de l'API OCMovies](https://github.com/Jeremuller/OCS_Projet_6/blob/master/OCMovies-API-EN-FR-master/README.md).  

---

## Installation et utilisation  
### 🛠️ Prérequis  
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.).  
- Accès à un serveur local (recommandé pour utiliser les données de l'API).  

### 🚀 Étapes  
1. **Cloner ce projet** :  
   ```bash  
   git clone <url-du-repository>  
   ```  

2. **Installer et lancer l'API OCMovies** :  
   - Suivez les instructions disponibles dans le [README de l'API](https://github.com/Jeremuller/OCS_Projet_6/blob/master/OCMovies-API-EN-FR-master/README.md).  

3. **Ouvrir le projet** :  
   Ouvrez le fichier `index.html` dans un navigateur pour démarrer l'application.  

4. **Utiliser l'application** :  
   - Naviguez dans les différentes catégories pour afficher les films.  
   - Cliquez sur les films pour voir leurs détails.  

---

## Modèle graphique  
Le projet suit un modèle graphique préalablement fourni. Le design respecte les principes de clarté et d'accessibilité, avec une mise en page adaptable aux différentes tailles d'écrans.  

---

## Améliorations possibles  
- **Ajout de tests automatisés** pour valider les fonctionnalités principales.  
- **Gestion hors-ligne** pour permettre un usage limité en l'absence de connexion réseau.  
- **Optimisation des performances** pour des bases de données plus volumineuses.  
- **Recherche avancée** : ajout d'une barre de recherche et de filtres supplémentaires.  


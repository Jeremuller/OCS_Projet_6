
# **Optimisation d'Investissements**

Ce projet propose deux algorithmes pour résoudre un problème d'optimisation d'investissement, où l'objectif est de maximiser le profit obtenu à partir d'un budget fixe. Les deux solutions sont implémentées en Python et présentent des approches contrastées : une méthode par force brute et une méthode gloutonne.

---

## **Structure du Projet**

- **`bruteforce.py`** : Implémentation de l'algorithme par force brute.
- **`optimized.py`** : Implémentation de l'algorithme glouton.
- **`actions_list.csv`** : Fichier CSV contenant la liste des actions (nom, coût, retour sur investissement).

---

## **Détails des Algorithmes**

### **1. Force Brute (`bruteforce.py`)**

#### Description
L'algorithme évalue toutes les combinaisons possibles d'actions et sélectionne celle qui offre le meilleur profit tout en respectant le budget.

#### Fonctionnement
1. Charge toutes les actions depuis le fichier CSV.
2. Génère toutes les combinaisons possibles d'actions.
3. Filtre les combinaisons dépassant le budget.
4. Trie les combinaisons restantes par profit décroissant.
5. Retourne la combinaison optimale.

#### Complexité
- **Temporelle** : \( O(2^n) \), où \( n \) est le nombre d'actions. Cela en fait une méthode coûteuse, particulièrement inefficace pour des jeux de données volumineux.
- **Spatiale** : Proportionnelle au nombre de combinaisons possibles.

#### Points Forts
- Garantit une solution optimale.
  
#### Limites
- Non scalable : inefficace pour de grands nombres d'actions ou budgets élevés.

---

### **2. Algorithme Glouton (`optimized.py`)**

#### Description
Cet algorithme adopte une approche simplifiée et rapide : il trie les actions par leur rentabilité (profit/coût) et les sélectionne successivement jusqu'à épuisement du budget.

#### Fonctionnement
1. Charge toutes les actions depuis le fichier CSV.
2. Trie les actions par rentabilité décroissante.
3. Ajoute les actions les plus rentables tant que le budget le permet.
4. Retourne la combinaison d'actions choisie.

#### Complexité
- **Temporelle** : \( O(n \log n) \) pour le tri + \( O(n) \) pour la sélection = **\( O(n \log n) \)**.
- **Spatiale** : Proportionnelle au nombre d'actions.

#### Points Forts
- Rapide et efficace.
- Scalable pour de grands jeux de données.

#### Limites
- Ne garantit pas une solution optimale.

---

## **Comparaison**

| Critère               | Force Brute               | Glouton                   |
|-----------------------|--------------------------|---------------------------|
| **Complexité**         | \( O(2^n) \)             | \( O(n \log n) \)         |
| **Optimalité**         | Toujours optimale        | Pas toujours optimale     |
| **Performance**        | Lent pour \( n > 20 \)   | Rapide et scalable        |
| **Utilisation mémoire**| Élevée                   | Modérée                   |

---

## **Exécution**

### **Prérequis**
- Python 3.x
- Fichier CSV avec les colonnes suivantes : `name`, `cost`, `return_on_investment`.

### **Instructions**
1. Cloner ce dépôt.
2. Placer un fichier CSV nommé `actions_list.csv` dans le même répertoire.
3. Exécuter l'un des scripts :

#### Force Brute
```bash
python bruteforce.py
```

#### Algorithme Glouton
```bash
python optimized.py
```

---

## **Conclusion**
Ce projet démontre deux approches opposées à un problème d'optimisation. La force brute est utile pour des petits ensembles où l'optimalité est cruciale, tandis que l'approche gloutonne est idéale pour des problèmes nécessitant des solutions rapides et approximatives.

---

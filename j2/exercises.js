// ============================================
// EXERCICE 1: Calcul de la moyenne
// BUG: Division incorrecte
// ============================================
function calculerMoyenne(nombres) {
    let somme = 0;
    for (let i = 0; i < nombres.length; i++) {
        somme += nombres[i];
    }
    return somme / nombres.length;
}

function testExercice1() {
    const resultDiv = document.getElementById('result1');
    const input = document.getElementById('input1').value;
    const nombres = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    if (nombres.length === 0) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Veuillez entrer des nombres valides séparés par des virgules!`;
        return;
    }

    const resultat = calculerMoyenne(nombres);
    const moyenneAttendue = nombres.reduce((a, b) => a + b, 0) / nombres.length;

    resultDiv.className = 'result show';

    if (Math.abs(resultat - moyenneAttendue) < 0.01) {
        resultDiv.className += ' success';
        resultDiv.innerHTML = `✅ Correct! La moyenne de [${nombres.join(', ')}] est ${resultat.toFixed(2)}`;
    } else {
        resultDiv.className += ' error';
        resultDiv.innerHTML = `❌ Incorrect! Résultat obtenu: ${resultat}<br>
                              Attendu: ${moyenneAttendue.toFixed(2)}<br>
                              <small>Indice: Vérifiez les limites de la boucle!</small>`;
    }
}


// ============================================
// EXERCICE 2: Validation d'email
// PROBLÈME: Code mal structuré et difficile à lire
// ============================================
/**
 * Valide une adresse email selon les critères suivants:
 * - Présence d'un et un seul symbole @
 * - Le @ n'est pas au début
 * - Présence d'un point après le @
 * - Extension d'au moins 2 caractères
 */
function validerEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

function testExercice2() {
    const resultDiv = document.getElementById('result2');
    const emailInput = document.getElementById('input2').value.trim();

    if (!emailInput) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Veuillez entrer un email à valider!`;
        return;
    }

    const resultat = validerEmail(emailInput);

    // Validation simple pour vérifier si la fonction semble correcte
    const estValideAttendu = emailInput.includes('@') &&
                             emailInput.indexOf('@') > 0 &&
                             emailInput.indexOf('.') > emailInput.indexOf('@') &&
                             emailInput.indexOf('@') === emailInput.lastIndexOf('@') &&
                             emailInput.split('@')[1].length > 0 &&
                             emailInput.split('.')[emailInput.split('.').length - 1].length >= 2;

    resultDiv.className = 'result show';

    if (resultat === estValideAttendu) {
        resultDiv.className += ' warning';
        resultDiv.innerHTML = `⚠️ Résultat correct pour "${emailInput}": ${resultat ? 'valide' : 'invalide'}<br>
                              <small>Le code fonctionne mais il est illisible!<br>
                              Utilisez Copilot pour le refactoriser et le rendre plus clair.</small>`;
    } else {
        resultDiv.className += ' error';
        resultDiv.innerHTML = `❌ Résultat incorrect pour "${emailInput}": ${resultat ? 'valide' : 'invalide'}<br>
                              Attendu: ${estValideAttendu ? 'valide' : 'invalide'}`;
    }
}


// ============================================
// EXERCICE 3: Recherche dans un tableau
// BUG: Logique de retour incorrecte
// ============================================
function rechercherElement(tableau, element) {
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i] === element) {
            return true;
        }
    }
    return false;
}

function testExercice3() {
    const resultDiv = document.getElementById('result3');
    const fruits = ['pomme', 'banane', 'orange', 'fraise'];
    const elementRecherche = document.getElementById('input3').value.trim();

    if (!elementRecherche) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Veuillez entrer un élément à rechercher!`;
        return;
    }

    const resultat = rechercherElement(fruits, elementRecherche);
    const attendu = fruits.includes(elementRecherche);

    resultDiv.className = 'result show';

    if (resultat === attendu) {
        resultDiv.className += ' success';
        resultDiv.innerHTML = `✅ Correct! "${elementRecherche}" ${attendu ? 'est' : "n'est pas"} dans le tableau [${fruits.join(', ')}]<br>
                              Résultat: ${resultat}`;
    } else {
        resultDiv.className += ' error';
        resultDiv.innerHTML = `❌ Incorrect!<br>
                              Recherche de "${elementRecherche}" dans [${fruits.join(', ')}]<br>
                              Résultat obtenu: ${resultat} (attendu: ${attendu})<br>
                              <small>Indice: Les valeurs de retour sont inversées!</small>`;
    }
}


// ============================================
// EXERCICE 4: Filtrer les nombres pairs
// PROBLÈME: Mauvaises pratiques (boucle manuelle au lieu de filter)
// ============================================
function filtrerPairs(nombres) {
    return nombres.filter(nombre => nombre % 2 === 0);
}

function testExercice4() {
    const resultDiv = document.getElementById('result4');
    const input = document.getElementById('input4').value;
    const nombres = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    if (nombres.length === 0) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Veuillez entrer des nombres valides séparés par des virgules!`;
        return;
    }

    const resultat = filtrerPairs(nombres);
    const attendu = nombres.filter(n => n % 2 === 0);

    resultDiv.className = 'result show';

    const correct = JSON.stringify(resultat) === JSON.stringify(attendu);

    if (correct) {
        resultDiv.className += ' warning';
        resultDiv.innerHTML = `⚠️ Le résultat est correct: [${resultat.join(', ')}]<br>
                              <small>Mais le code utilise de mauvaises pratiques!<br>
                              Refactorisez avec des méthodes modernes (filter, forEach, etc.)</small>`;
    } else {
        resultDiv.className += ' error';
        resultDiv.innerHTML = `❌ Incorrect! Résultat: [${resultat.join(', ')}]<br>
                              Attendu: [${attendu.join(', ')}]`;
    }
}


// ============================================
// EXERCICE 5: Tri de personnes par âge
// BUG: Plusieurs erreurs de logique
// ============================================
function trierParAge(personnes) {
    for (let i = 0; i < personnes.length - 1; i++) {
        for (let j = 0; j < personnes.length - 1 - i; j++) {
            if (personnes[j].age > personnes[j + 1].age) {
                let temp = personnes[j];
                personnes[j] = personnes[j + 1];
                personnes[j + 1] = temp;
            }
        }
    }
    return personnes;
}

function testExercice5() {
    const resultDiv = document.getElementById('result5');
    const personnes = [
        { nom: 'Alice', age: 30 },
        { nom: 'Bob', age: 25 },
        { nom: 'Charlie', age: 35 },
        { nom: 'David', age: 20 }
    ];

    try {
        const resultat = trierParAge([...personnes]); // Copie pour ne pas modifier l'original
        const agesResultat = resultat.map(p => p.age);
        const agesAttendu = [20, 25, 30, 35];

        resultDiv.className = 'result show';

        const correct = JSON.stringify(agesResultat) === JSON.stringify(agesAttendu);

        if (correct) {
            resultDiv.className += ' success';
            resultDiv.innerHTML = `✅ Correct! Ordre des âges: [${agesResultat.join(', ')}]<br>
                                  Personnes triées: ${resultat.map(p => p.nom).join(', ')}`;
        } else {
            resultDiv.className += ' error';
            resultDiv.innerHTML = `❌ Incorrect! Ordre obtenu: [${agesResultat.join(', ')}]<br>
                                  Attendu: [${agesAttendu.join(', ')}]<br>
                                  <small>Indice: Plusieurs bugs à trouver!</small>`;
        }
    } catch (error) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Erreur: ${error.message}<br>
                              <small>Le code génère une exception!</small>`;
    }
}


// ============================================
// EXERCICE 6: Calculatrice de réduction
// PROBLÈME: Code dupliqué et répétitif
// ============================================
function calculerReduction(prix, categorie) {
    const reductions = {
        etudiant: 0.20,
        senior: 0.15,
        enfant: 0.30,
        militaire: 0.25
    };
    
    return prix * (1 - (reductions[categorie] || 0));
}

function testExercice6() {
    const resultDiv = document.getElementById('result6');
    const prix = parseFloat(document.getElementById('input6prix').value);
    const categorie = document.getElementById('input6categorie').value;

    if (isNaN(prix) || prix <= 0) {
        resultDiv.className = 'result show error';
        resultDiv.innerHTML = `❌ Veuillez entrer un prix valide!`;
        return;
    }

    const resultat = calculerReduction(prix, categorie);

    // Calcul attendu
    const reductions = {
        'etudiant': 0.20,
        'senior': 0.15,
        'enfant': 0.30,
        'militaire': 0.25,
        'normal': 0
    };

    const tauxReduction = reductions[categorie] || 0;
    const attendu = prix - (prix * tauxReduction);

    resultDiv.className = 'result show';

    const correct = Math.abs(resultat - attendu) < 0.01;

    if (correct) {
        resultDiv.className += ' warning';
        resultDiv.innerHTML = `⚠️ Le calcul est correct!<br>
                              Prix: ${prix}€, Catégorie: ${categorie}<br>
                              Résultat: ${resultat}€ (réduction de ${(tauxReduction * 100).toFixed(0)}%)<br>
                              <small>Mais il y a beaucoup de code dupliqué dans la fonction.<br>
                              Refactorisez avec un objet de configuration ou une structure plus propre.</small>`;
    } else {
        resultDiv.className += ' error';
        resultDiv.innerHTML = `❌ Le calcul est incorrect!<br>
                              Prix: ${prix}€, Catégorie: ${categorie}<br>
                              Résultat obtenu: ${resultat}€<br>
                              Attendu: ${attendu}€`;
    }
}

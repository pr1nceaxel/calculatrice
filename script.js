document.addEventListener("DOMContentLoaded", function () {
    let operationDisplay = document.getElementById("operation");
    let resultatDisplay = document.getElementById("resultat");
    let boutons = document.querySelectorAll(".bouton");
    let expression = "";
    let ansValue = 0;
    let resultatAffiche = false;

    boutons.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            let valeur = this.innerText;

            if (valeur === "C") {
                expression = "";
                resultatAffiche = false;
                operationDisplay.innerText = "";
                resultatDisplay.innerText = "";
                resultatDisplay.classList.add("erreur");
            } else if (valeur === "DEL") {
                expression = expression.slice(0, -1);
            } else if (valeur === "=") {
                try {
                    // Remplacer toutes les occurrences de "Ans" par la valeur d'Ans
                    let expressionToEvaluate = expression.replace(/Ans/g, ansValue);
                    let resultat = evaluateExpression(expressionToEvaluate);
                    displayResult(resultat);
                } catch (error) {
                    handleEvaluationError();
                }
            } else if (valeur === "Ans") {
                expression += "Ans";
                operationDisplay.innerText += "Ans";
            } else {
                handleNumericInput(valeur);
            }

            operationDisplay.innerText = expression === "" ? "0" : expression;
        });
    });

    function evaluateExpression(expression) {
        // Utiliser la fonction evaluate de math.js pour l'évaluation sécurisée
        return math.evaluate(expression);
    }

    function displayResult(resultat) {
        if (resultat === Infinity) {
            setResult("Infini", "infini");
        } else if (resultat === -Infinity) {
            setResult("-Infini", "negative-infini");
        } else {
            setResult("= " + resultat, null);
        }
        // Stockez le résultat dans ansValue
        ansValue = resultat;
        resultatAffiche = true;
    }

    function setResult(text, className) {
        resultatDisplay.innerText = text;
    
        // Supprimez toutes les classes de couleur existantes
        resultatDisplay.classList.remove("infini", "negative-infini", "erreur");
    
        // Appliquez la classe spécifique en fonction de la valeur de className
        if (className === "infini" || className === "negative-infini" || className === "erreur") {
            resultatDisplay.classList.add(className);
        }
    }

    
    function handleEvaluationError() {
        expression = "";
        operationDisplay.innerText = "";
        setResult("Erreur", "erreur");
    }

    function handleNumericInput(valeur) {
        if (resultatAffiche) {
            expression = valeur;
            resultatAffiche = false;
            operationDisplay.innerText = "";
            resultatDisplay.innerText = "";
        } else {
            expression += valeur;
            operationDisplay.innerText += valeur;
        }
    }
});

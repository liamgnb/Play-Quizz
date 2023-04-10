// VARIABLES
import {getThemes, getTheme, getQuestions} from "./api.js";
import {changeMode, changeBouton, initListeThemes, initTheme, initQuestions, play, selectReponse, verifSelect, verifQuizz, detailQuizz} from "./fonctions.js";

let nbMaxQuestion
let slugTheme
let numQuestion


// INIT
getThemes()
    .then(result => initListeThemes(result))
    .catch(error => console.log(error))

// LANCEMENT DU QUIZZ
document.querySelector("#btnLancerQuizz,#btnChargementQuizz").addEventListener("click", () => {
    document.getElementById("btnChargementQuizz").style.display = ""
    document.getElementById("btnLancerQuizz").style.display = "none"
    numQuestion = 0
    nbMaxQuestion = document.getElementById("nbQuestion").value
    slugTheme  = document.getElementById("listeTheme").value
    if (nbMaxQuestion === '1') {
        changeBouton()
    }
    getTheme(slugTheme)
        .then(result => initTheme(result))
        .catch(error => console.log(error))
    getQuestions(slugTheme, nbMaxQuestion)
        .then(result => initQuestions(result))
        .catch(error => console.log(error))
})

// CHANGEMENT DE QUESTION
document.querySelector("#btnSuivant").addEventListener("click", () => {
    if (verifSelect()) {
        numQuestion ++
        play(numQuestion)
        if (numQuestion >= nbMaxQuestion - 1) {
            changeBouton()
        }
    } else {
        document.getElementById("erreur").style.display = ""
        document.getElementById("erreur").innerText = "Veuillez sélectionner une proposition."
    }
})

// FIN QUIZZ
document.querySelector("#btnTerminer").addEventListener("click", () => {
    if (verifSelect()) {
        verifQuizz()
        changeMode("resultat")
    } else {
        document.getElementById("erreur").style.display = ""
        document.getElementById("erreur").innerText = "Veuillez sélectionner une proposition."
    }
})

// ACTION BOUTONS
document.querySelector("#btnClose").addEventListener("click", () => {
    changeMode("menu")
})

document.querySelector("#btnReponse_1").addEventListener("click", () => {
    selectReponse(1, numQuestion)
})

document.querySelector("#btnReponse_2").addEventListener("click", () => {
    selectReponse(2, numQuestion)
})

document.querySelector("#btnReponse_3").addEventListener("click", () => {
    selectReponse(3, numQuestion)
})

document.querySelector("#btnReponse_4").addEventListener("click", () => {
    selectReponse(4, numQuestion)
})

document.querySelector("#btnMenu").addEventListener("click", () => {
    changeMode("menu")
})

document.querySelector("#btnDetail").addEventListener("click", () => {
    document.getElementById("btnChargementDetail").style.display = ""
    document.getElementById("btnDetail").style.display = "none"
    detailQuizz()
    document.getElementById("btnChargementDetail").style.display = "none"
    document.getElementById("btnDetail").style.display = ""
})

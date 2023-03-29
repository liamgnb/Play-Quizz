// VARIABLES
import {getThemes, getTheme, getQuestions} from "./api.js";
import {changeMode, changeBouton, initListeThemes, initTheme, initQuestions, play, selectReponse} from "./fonctions.js";

let nbMaxQuestion
let slugTheme
let numQuestion

// INIT
getThemes()
    .then(result => initListeThemes(result))
    .catch(error => console.log(error))

document.getElementById("questionQuizz").style.display = "none"
document.getElementById("btnChargementQuizz").style.display = "none"
document.getElementById("btnTerminer").style.display = "none"

// LANCEMENT DU QUIZZ
document.querySelector("#btnLancerQuizz").addEventListener("click", () => {
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
    numQuestion ++
    play(numQuestion)
    if (numQuestion >= nbMaxQuestion - 1) {
        changeBouton()
    }
})

document.querySelector("#btnClose").addEventListener("click", () => {
    changeMode()
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









// empecher le reload
// erreur a affciher de l'API
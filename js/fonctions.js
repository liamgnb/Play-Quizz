// FONCTIONS
let questions
let reponses
let historiqueJoueur = []

/**
 * Passage du menu, au quizz et aux réponses
 */
const changeMode = () => {
    if (document.getElementById("paramQuizz").style.display !== "none") {
        document.getElementById("paramQuizz").style.display = "none"
        document.getElementById("questionQuizz").style.display = ""
    } else {
        if (confirm("Voulez vous vraiment quitter ?")) {
            window.location.reload()
        }
    }
}

const changeBouton = () => {
    if (document.getElementById("btnSuivant").style.display !== "none") {
        document.getElementById("btnSuivant").style.display = "none"
        document.getElementById("btnTerminer").style.display = ""
    }
}

const selectReponse = (numReponse, numQuestion) => {
    historiqueJoueur[`Q${numQuestion+1}`] = numReponse
    unselectReponse()
    document.getElementById(`btnReponse_${numReponse}`).className = 'btn btn-link text-primary text-decoration-none d-flex'
    console.log(historiqueJoueur)
}

const unselectReponse = () => {
    for (let i = 1; i <=4 ; i++) {
        document.getElementById(`btnReponse_${i}`).className = 'btn btn-link text-black text-decoration-none d-flex'
    }
}

const initListeThemes = themesAPI => {
    for (const theme of themesAPI) {
        const listeTheme = document.getElementById('listeTheme')
        const optionTheme = document.createElement("option")
        optionTheme.value = theme.slug
        optionTheme.innerText = theme.libelle
        listeTheme.appendChild(optionTheme)
    }
}

const initTheme = themeAPI => {
    document.getElementById("libelleTheme").innerText = themeAPI.libelle
}

const melangeQuestions = questions => {
    questions.sort(()=> Math.random() - 0.5);
}

const initQuestions = questionsAPI => {
    questions = questionsAPI
    changeMode()
    play(0)
}

const play = (numQuestion) => {
    unselectReponse()
    const question = questions[numQuestion]
    document.getElementById("noQuestion").innerText = ( numQuestion + 1 ) + ' - '
    document.getElementById("libelleQuestion").innerText = question.libelle
    reponses = question.reponses
    melangeQuestions(reponses)
    for (let i = 0; i < reponses.length; i++) {
        document.getElementById(`reponse_${i+1}`).innerText = reponses[i].libelle
    }
}

export {changeMode, changeBouton, initListeThemes, initTheme, initQuestions, play, selectReponse}
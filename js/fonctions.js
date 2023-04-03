// FONCTIONS
let questions
let reponses
let historiqueJoueur = []

/**
 * Passage du menu, au quizz et aux réponses
 */
const changeMode = (mode) => {
    if (mode !== "menu") {
        document.getElementById("row_body").className = "row justify-content-md-center position-absolute top-50 start-50 translate-middle"
        document.getElementById("chargement").style.display = "none"
        document.getElementById("paramQuizz").style.display = "none"
        document.getElementById("resultatQuizz").style.display = "none"
        document.getElementById("questionQuizz").style.display = "none"
        document.getElementById("detailQuizz").style.display = "none"
    }
    switch (mode) {
        case "param" :
            document.getElementById("paramQuizz").style.display = ""
            break

        case "quizz" :
            document.getElementById("questionQuizz").style.display = ""
            break

        case "menu" :
            if (confirm("Voulez vous vraiment quitter ?")) {
                window.location.reload()
            }
            break

        case "resultat" :
            document.getElementById("resultatQuizz").style.display = ""
            break

        case "detail" :
            document.getElementById("detailQuizz").style.display = ""
            break
    }
}

const changeBouton = () => {
    if (document.getElementById("btnSuivant").style.display !== "none") {
        document.getElementById("btnSuivant").style.display = "none"
        document.getElementById("btnTerminer").style.display = ""
    }
}

const selectReponse = (numReponse, numQuestion) => {
    historiqueJoueur[numQuestion] = numReponse
    unselectReponse()
    document.getElementById(`btnReponse_${numReponse}`).className = 'btn btn-link text-primary text-decoration-none d-flex'
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
    changeMode("param")
}

const initTheme = themeAPI => {
    document.getElementById("libelleThemeQuestion").innerText = themeAPI.libelle
    document.getElementById("libelleThemeResultat").innerText = themeAPI.libelle
    document.getElementById("libelleThemeDetail").innerText = themeAPI.libelle
}

const melangeQuestions = questions => {
    questions.sort(()=> Math.random() - 0.5);
}

const initQuestions = questionsAPI => {
    questions = questionsAPI
    changeMode("quizz")
    play(0)
}

const play = (numQuestion) => {
    document.getElementById("erreur").style.display = "none"
    document.getElementById("erreur").innerText = ""
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

const verifSelect = () => {
    for (let i = 1; i <= 4 ; i++) {
        if  (document.getElementById(`btnReponse_${i}`).className === 'btn btn-link text-primary text-decoration-none d-flex') return true
    }
    return false
}

const lancerConfetti = () => {
    const canvas = document.querySelector('#confetti-canvas');
    var myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        particleCount: 1000,
        spread: 150
    });
}

const verifQuizz = () => {
    let nbrQuestions = questions.length
    let score = 0
    let question
    let noReponse
    for (const noQuestion in questions) {
        question = questions[noQuestion]
        noReponse = historiqueJoueur[noQuestion] - 1
        if (question.reponses[noReponse].estCorrecte) score ++
    }
    document.getElementById("note").innerText = `${score} / ${nbrQuestions}`
    if ((nbrQuestions - score) <= Math.floor(nbrQuestions * 0.75)) lancerConfetti()
}

const detailQuizz = () => {
    let nbrQuestions = questions.length
    let question
    let noReponse

    if (document.querySelectorAll('#bodyDetail').length > 0) document.querySelectorAll('#bodyDetail').forEach(e => {document.getElementById(e.id).remove()})
    if (document.querySelectorAll('#btnSortir').length > 0) document.querySelectorAll('#btnSortir').forEach(e => {document.getElementById(e.id).remove()})
    if (document.querySelectorAll('#barre').length > 0) document.querySelectorAll('#barre').forEach(e => {document.getElementById(e.id).remove()})

    for (const noQuestion in questions) {
        for (let i = 0; i < 4; i++) {
           document.getElementById(`div_detail_reponse_${i+1}`).className = 'text-black d-flex my-1'
        }

        question = questions[parseInt(noQuestion)]
        noReponse = historiqueJoueur[parseInt(noQuestion)] - 1

        document.getElementById("noQuestionDetail").innerText = ( parseInt(noQuestion) + 1 ) + ' - '
        document.getElementById("libelleQuestionDetail").innerText = question.libelle

        for (let i = 0; i < question.reponses.length; i++) {
            document.getElementById(`detail_reponse_${i+1}`).innerText = question.reponses[i].libelle
            if(i === noReponse) document.getElementById(`div_detail_reponse_${i+1}`).className = 'text-danger d-flex my-1'
            if(question.reponses[i].estCorrecte) document.getElementById(`div_detail_reponse_${i+1}`).className = 'text-success d-flex my-1'
        }

        let body = document.getElementById('bodyDetailPourCopie').cloneNode(true);
        body.style.display = ""
        body.id = "bodyDetail"
        document.querySelector("#detailQuizz").appendChild(body)

        if (parseInt(noQuestion) >= 0 && parseInt(noQuestion) < nbrQuestions-1) {
            let barre = document.getElementById('barrePourCopie').cloneNode()
            barre.style.display = ""
            barre.id = "barre"
            document.querySelector("#detailQuizz").appendChild(barre)
        }

        if (parseInt(noQuestion) === nbrQuestions-1) {
            let btn = document.getElementById('btnSortirPourCopie').cloneNode(true)
            btn.style.display = ""
            btn.id = "btnSortir"
            document.querySelector("#detailQuizz").appendChild(btn)
            document.querySelector("#btnSortir").addEventListener("click", () => {
                changeMode("resultat")
                verifQuizz()
            })
        }

    }

    changeMode("detail")

    if(nbrQuestions>=3) {
        document.getElementById("row_body").className = 'row justify-content-md-center my-5'
    }

}

export {changeMode, changeBouton, initListeThemes, initTheme, initQuestions, play, selectReponse, verifSelect, verifQuizz, detailQuizz}
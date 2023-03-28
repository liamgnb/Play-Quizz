// FONCTIONS
const changeMode = () => {
    if (document.getElementById("paramQuizz").style.display !== "none") {
        document.getElementById("paramQuizz").style.display = "none"
        document.getElementById("questionQuizz").style.display = ""
    } else {
        if (confirm("Voulez vous vraiment quitter ?")) {
            document.getElementById("paramQuizz").style.display = ""
            document.getElementById("questionQuizz").style.display = "none"
        }
    }
}

const changeBouton = () => {
    if (document.getElementById("btnSuivant").style.display !== "none" &&  nbMaxQuestion <= noQuestion) {
        document.getElementById("btnSuivant").style.display = "none"
        document.getElementById("btnTerminer").style.display = ""
    }
}

const play = () => {
    fetchData('initQuestions')
    console.log(questions)
}

// API
const initThemes = (result) => {
    for (const theme of result) {
        document.getElementById('listeTheme').innerHTML += `<option value="${theme.slug}">${theme.libelle}</option>`
    }
}

const initQuestions = (result) => {
    questions = result
}

const fetchData = (calback) => {
    switch (calback){
        case 'initThemes' :
            endPoint = "http://127.0.0.1:8000/api/quizz"
            fetch(endPoint).then(res => res.json()).then(result => initThemes(result)).catch(() =>{
                console.log("erreur")
            });
            break;
        case "initQuestions" :
            endPoint = `http://127.0.0.1:8000/api/quizz/aleatoire?theme=${slugTheme}&nb=${nbMaxQuestion}`
            fetch(endPoint).then(res => res.json()).then(result => initQuestions(result)).catch(() =>{
                console.log("erreur")
            });
            break;
    }
}

// INIT
let endPoint
let questions
let nbMaxQuestion
let slugTheme
let noQuestion = 0

document.getElementById("questionQuizz").style.display = "none"
document.getElementById("btnTerminer").style.display = "none"

document.querySelector("#btnLancerQuizz").addEventListener("click", () => {
    nbMaxQuestion = document.getElementById("nbQuestion").value
    slugTheme  = document.getElementById("listeTheme").value
    changeMode()
    play()
})

document.querySelector("#btnSuivant").addEventListener("click", () => {
    changeBouton()
})

document.querySelector("#btnClose").addEventListener("click", () => {
    changeMode()
})

fetchData('initThemes')



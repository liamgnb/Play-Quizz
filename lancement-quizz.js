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

const changeQuestion = () => {

}

// INIT
const nbMaxQuestion = 1
let noQuestion = 1

document.getElementById("questionQuizz").style.display = "none"
document.getElementById("btnTerminer").style.display = "none"

document.querySelector("#btnLancerQuizz").addEventListener("click", () => {
    changeMode()
})

document.querySelector("#btnSuivant").addEventListener("click", () => {
    changeBouton()
})

document.querySelector("#btnClose").addEventListener("click", () => {
    changeMode()
})



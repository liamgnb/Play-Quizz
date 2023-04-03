// API

// const url = 'http://127.0.0.1:8000'
const url = 'http://localwin:8000'

const getThemes = () => {
    return fetch(`${url}/api/quizz`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

const getTheme = slugTheme => {
    return fetch(`${url}/api/quizz?theme=${slugTheme}`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

const getQuestions = (slugTheme, nbQuestion) => {
    return fetch(`${url}/api/quizz/aleatoire?theme=${slugTheme}&nb=${nbQuestion}`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}


export {getThemes, getQuestions, getTheme}
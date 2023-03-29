// API

const getThemes = () => {
    return fetch('http://127.0.0.1:8000/api/quizz')
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

const getTheme = slugTheme => {
    return fetch(`http://127.0.0.1:8000/api/quizz?theme=${slugTheme}`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

const getQuestions = (slugTheme, nbQuestion) => {
    return fetch(`http://127.0.0.1:8000/api/quizz/aleatoire?theme=${slugTheme}&nb=${nbQuestion}`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

export {getThemes, getQuestions, getTheme}
// API

const url = 'http://localwin:8000'

/**
 * Récupère les thèmes depuis l'API
 * @returns {Promise<any>}
 */
const getThemes = () => {
    return fetch(`${url}/api/quizz/themes`)
        .then( response => {return response.json()
        })
}

/**
 * Récupère le thème dont le slug est passé en paramètre, depuis l'API
 * @param slugTheme
 * @returns {Promise<any>}
 */
const getTheme = slugTheme => {
    return fetch(`${url}/api/quizz/themes?theme=${slugTheme}`)
        .then( response => {
            return response.json()
        })
}

/**
 * Récupère les questions dont le nombre et le slug du thème
 * ont été passé en paramètres, depuis l'API
 * @param slugTheme
 * @param nbQuestion
 * @returns {Promise<any>}
 */
const getQuestions = (slugTheme, nbQuestion) => {
    return fetch(`${url}/api/quizz/aleatoire?theme=${slugTheme}&nb=${nbQuestion}`)
        .then( response => {
            return response.json()
        })
}

export {getThemes, getQuestions, getTheme}
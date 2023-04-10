// API

const url = 'https://www.api-l2r.liam-genebrier.fr'

/**
 * Récupère les thèmes depuis l'API
 * @returns {Promise<any>}
 */
const getThemes = () => {
    return fetch(`${url}/api/quizz`, {
        method: 'GET',
        mode: 'no-cors'}
    )
        .then( response => {return response.json()
        })
}

/**
 * Récupère le thème dont le slug est passé en paramètre, depuis l'API
 * @param slugTheme
 * @returns {Promise<any>}
 */
const getTheme = slugTheme => {
    return fetch(`${url}/api/quizz?theme=${slugTheme}`)
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
import axios from 'axios'
import yaml from 'js-yaml'

export const getQuestions = ({ commit, rootGetters }) => {
  return axios.get(rootGetters['config/quizFile']).then((response) => {
    // get YAML
    let data = yaml.safeLoad(response.data)
    // assemble questions
    let counter = 1
    let questions = data.questions.map((obj) => {
      if (obj.answers) {
        obj.answers = data.answers[obj.answers]
      }
      // Add number to question
      if (obj.type === 'question') {
        obj.number = counter++
      }
      return obj
    })
    commit('setQuestions', questions)
    commit('setQuestionNumber', 1)
    commit('updateCurrentQuestion')
  })
}

export const initQuiz = ({ commit, rootGetters }) => {
  axios.post(rootGetters['config/initQuizEndpoint'], {reg_id: rootGetters['quiz/reg_id']})
    .then((response) => {
      if (response.data.unique_id) {
        commit('setUniqueId', response.data.unique_id)
      }
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export const nextQuestion = ({ commit, state }) => {
  commit('setQuestionNumber', state.currentQuestionNumber + 1)
  setTimeout(() => {
    commit('updateCurrentQuestion')
  }, 300)
}

export const prevQuestion = ({ commit, state }) => {
  commit('setQuestionNumber', state.currentQuestionNumber - 1)
  setTimeout(() => {
    commit('updateCurrentQuestion')
  }, 300)
}

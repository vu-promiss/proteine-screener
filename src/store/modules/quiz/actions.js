import axios from 'axios'
import yaml from 'js-yaml'

export const getQuestions = ({ commit, rootGetters }) => {
  let promises = [
    axios.get(rootGetters['config/quizFile']),
    axios.get(rootGetters['config/answerFile'])
  ]
  Promise.all(promises).then((response) => {
    let quiz = yaml.safeLoad(response[0].data)
    let answers = yaml.safeLoad(response[1].data)
    let counter = 1
    let questions = quiz.map((obj) => {
      if (obj.answers) {
        obj.answers = answers[obj.answers]
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

export const storeResults = ({ commit, rootGetters }) => {
  axios.post(rootGetters['config/storeResultsEndpoint'], {
    unique_id: rootGetters['quiz/unique_id'],
    reg_id: rootGetters['quiz/reg_id'],
    pred_prob: rootGetters['quiz/predprob'],
    answers: rootGetters['quiz/answers']
  })
    .then(function (response) {
      // console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const nextQuestion = ({ commit, state }) => {
  commit('setQuestionNumber', state.currentQuestionNumber + 1)
  commit('updateCurrentQuestion')
}

export const prevQuestion = ({ commit, state }) => {
  commit('setQuestionNumber', state.currentQuestionNumber - 1)
  commit('updateCurrentQuestion')
}

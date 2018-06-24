import axios from 'axios'

export const getQuestions = ({ commit }) => {
  return axios.get('quiz.json').then((response) => {
    // assemble questions
    let counter = 1
    let questions = response.data.questions.map((obj) => {
      if (obj.answers) {
        obj.answers = response.data.answers[obj.answers]
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

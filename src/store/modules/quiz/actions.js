import axios from 'axios'

export const getQuestions = ({ commit }) => {
  return axios.get('static/quiz.json').then((response) => {
    // assemble questions
    let questions = response.data.questions.map((obj) => {
      if (obj.answers) {
        obj.answers = response.data.answers[obj.answers]
      }
      return obj
    })
    commit('setQuestions', questions)
  })
}

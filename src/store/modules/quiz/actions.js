import axios from 'axios'

export const getQuestions = ({ commit }) => {
  return axios.get('static/questions.json').then((response) => {
    commit('setQuestions', response.data)
  })
}

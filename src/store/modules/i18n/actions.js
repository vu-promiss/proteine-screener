import axios from 'axios'

export const getLanguage = ({ commit }) => {
  return axios.get('static/locales/en.json').then((response) => {
    commit('setLanguage', response.data)
  })
}

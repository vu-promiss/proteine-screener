import axios from 'axios'

export const getConfig = ({ commit }) => {
  return axios.get('config.json').then((response) => {
    commit('setConfig', response.data)
  })
}

import axios from 'axios'
import yaml from 'js-yaml'

export const getConfig = ({ commit }) => {
  return axios.get('config.yaml').then((response) => {
    commit('setConfig', yaml.safeLoad(response.data))
  })
}

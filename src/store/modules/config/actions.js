import axios from 'axios'
import yaml from 'js-yaml'
import router from '../../../router'

export const loadYamlConfig = ({ commit }) => {
  return axios.get('config.yaml').then((response) => {
    commit('setConfig', yaml.safeLoad(response.data))
  })
}

export const setConfig = ({ commit }, config) => {
  commit('setConfig', config)
}

export const storeLocaleData = ({commit}, obj) => {
  commit('addlocaleData', obj)
}

export const updateLocale = ({ commit }, locale) => {
  router.app.$i18n.set(locale)
  commit('setLocaleData', locale)
}

export const updateStakeholder = ({ commit }, stakeholder) => {
  commit('setStakeholder', stakeholder)
}

export const loadPublications = ({ commit }) => {
  return axios.get('publications.yaml').then((response) => {
    commit('setPublications', yaml.safeLoad(response.data))
  })
}

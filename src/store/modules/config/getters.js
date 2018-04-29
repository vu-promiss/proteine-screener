export const config = (state) => state.config

export const configLoaded = (state) => state.configLoaded

export const locales = (state) => state.config.locales

export const cutoff = (state) => state.config.cutoff

export const cutoffPercentage = (state) => parseInt(state.config.cutoff * 100)

export const debug = (state) => state.config.debug

export const showAutonextButton = (state) => state.config.showAutonextButton

export const storeResultsEndpoint = (state) => state.config.apiBaseUrl + 'store-results'

export const initQuizEndpoint = (state) => state.config.apiBaseUrl + 'init-quiz'

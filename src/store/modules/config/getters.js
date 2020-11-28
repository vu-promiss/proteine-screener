export const config = (state) => state.config

export const configLoaded = (state) => state.configLoaded

export const locales = (state) => state.config.locales

export const localeData = (state) => state.localeData

export const cutoff = (state) => state.cutoff

export const cutoffPercentage = (state) => parseInt(state.cutoff * 100)

export const intercept = (state) => state.intercept

export const shrinkageFactor = (state) => state.shrinkageFactor

export const weightAdjustedFactor = (state) => state.weightAdjustedFactor

export const debug = (state) => state.config.debug

export const showAutonextButton = (state) => state.config.showAutonextButton

export const storeResultsEndpoint = (state) => state.config.apiBaseUrl + 'store-results'

export const initQuizEndpoint = (state) => state.config.apiBaseUrl + 'init-quiz'

export const statsEndpoint = (state) => state.config.apiBaseUrl + 'stats'

export const quizFile = (state) => state.config.quizFile

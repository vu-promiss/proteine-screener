export const setConfig = (state, config) => {
  state.config = config
  state.config.quizFile = state.config['quizFile'] ? state.config.quizFile : 'quiz.yaml'
  state.config.answerFile = state.config['answerFile'] ? state.config.answerFile : 'answers.yaml'
  state.config.stakeholder = state.config['stakeholder'] ? state.config.stakeholder : 'professional'
  state.configLoaded = true
}

export const addlocaleData = (state, obj) => {
  state.localeData[obj.locale] = obj.localeData.values
}

// Load locale data for this locale
export const setLocaleData = (state, locale) => {
  let localeData = state.localeData[locale]
  state.intercept = localeData.intercept
  state.cutoff = localeData.cutoff
  state.shrinkageFactor = localeData.shrinkageFactor
  state.weightAdjustedFactor = localeData.weightAdjustedFactor
}

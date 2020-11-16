export const setConfig = (state, config) => {
  state.config = config
  state.config.quizFile = state.config['quizFile'] ? state.config.quizFile : 'quiz.yaml'
  state.configLoaded = true
}

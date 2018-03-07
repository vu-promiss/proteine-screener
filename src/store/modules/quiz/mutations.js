import Vue from 'vue'

export const setQuestions = (state, questions) => {
  state.questions = questions
  // this.updateCurrentQuestion()
}

export const setAge = (state, val) => { state.age = val }

export const setWeight = (state, val) => { state.weight = val }

export const setLength = (state, val) => { state.length = val }

export const setQuestionNumber = (state, questionNumber) => {
  state.currentQuestionNumber = questionNumber
}

export const updateCurrentQuestion = (state) => {
  state.currentQuestion = state.questions[state.currentQuestionNumber - 1]
}

export const setAnswer = (state, {questionId, answer}) => {
  Vue.set(state.answers, questionId, answer)
}

export const resetAnswers = (state) => {
  state.answers = []
  state.age = ''
  state.weight = ''
  state.length = ''
}

export const setAutoNext = (state, val) => { state.autoNext = val }

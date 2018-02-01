import Vue from 'vue'

export const setQuestions = (state, questions) => {
  state.questions = questions
  // this.updateCurrentQuestion()
}

export const setQuestionNumber = (state, questionNumber) => {
  state.currentQuestionNumber = questionNumber
}

export const updateCurrentQuestion = (state) => {
  state.currentQuestion = state.questions[state.currentQuestionNumber - 1]
}

export const setAnswer = (state, {questionId, answer}) => {
  Vue.set(state.answers, questionId, answer)
}

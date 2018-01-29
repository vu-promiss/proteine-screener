import Vue from 'vue'

export const setQuestions = (state, questions) => {
  state.questions = questions
}

export const setAnswer = (state, {questionId, answer}) => {
  Vue.set(state.answers, questionId, answer)
}

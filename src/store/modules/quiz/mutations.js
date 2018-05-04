import Vue from 'vue'

export const setUniqueId = (state, val) => { state.unique_id = val }

export const setRegId = (state, val) => { state.reg_id = val }

export const setQuestions = (state, questions) => {
  state.questions = questions
  // this.updateCurrentQuestion()
}

export const setAge = (state, val) => { state.answers.age = val }

export const setWeight = (state, val) => { state.answers.weight = val }

export const setLength = (state, val) => { state.answers.length = val }

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
  state.answers = {
    age: '',
    weight: '',
    length: ''
  }
}

export const setAutoNext = (state, val) => { state.autoNext = val }

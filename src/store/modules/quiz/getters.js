/* eslint camelcase: "off" */

export const unique_id = (state) => state.unique_id

export const reg_id = (state) => state.reg_id

export const questions = (state) => state.questions

export const age = (state) => state.answers.age

export const validAge = (state) => {
  if (state.answers.age === '') return null
  return state.answers.age >= 1 && state.answers.age < 130
}

export const length = (state) => state.answers.length

export const validLength = (state) => {
  if (state.answers.length === '') return null
  return state.answers.length >= 30 && state.answers.length < 300
}

export const weight = (state) => state.answers.weight

export const validWeight = (state) => {
  if (state.answers.weight === '') return null
  return state.answers.weight >= 3 && state.answers.weight < 400
}

export const validBmi = (state, getters) => getters.validAge && getters.validWeight && getters.validLength

export const strQuestions = (state) => {
  return JSON.stringify(state.questions, null, 4)
}

export const totalQuestions = (state) => state.questions.length

export const currentQuestionNumber = (state) => state.currentQuestionNumber

export const currentQuestion = (state) => state.currentQuestion

export const answers = (state) => state.answers

export const getSelectedAnswer = (state) => (questionId) => {
  return state.answers[questionId]
}

export const autoNext = (state) => state.autoNext

export const recodedAnswers = (state) => {
  let results = []
  // loop over quiz
  state.questions.forEach(question => {
    // only do questions
    if (question.type !== 'question') {
      return
    }
    // get answer for this question
    let answer = state.answers[question.id]
    // get all recodes
    question.recode.forEach(recode => {
      let factor = recode['default_factor'] || 1
      // Replace Function with a parser as it's unsafe
      /* eslint-disable no-new-func */
      if (Function('"use strict";return (' + recode.comparison.replaceAll('answer', answer) + ')')()) {
        factor = recode.factor + (recode['add_answer_to_factor'] ? answer : 0)
      }
      /* eslint-enable no-new-func */
      results.push({
        name: recode.name,
        value: recode.weight * factor
      })
    })
  })

  return results
}

export const weightAdjusted = (state) => {
  let weight_adj = state.answers.weight
  let age = state.answers.age
  let height_m = state.answers.length / 100.0
  let height_squared = height_m * height_m
  let bmi = state.answers.weight / height_squared

  // berekenen weight_adj
  if (bmi < 18.5 && age < 71) weight_adj = height_squared * 18.5
  if (bmi > 25.0 && age < 71) weight_adj = height_squared * 25
  if (bmi < 22.0 && age >= 71) weight_adj = height_squared * 22
  if (bmi > 27.0 && age >= 71) weight_adj = height_squared * 27

  return weight_adj
}

export const predprob = (state, getters) => {
  // Shrinkage Factor
  let shrinkage_factor = 0.92
  let weight_adj = getters.weightAdjusted
  let results = getters.recodedAnswers

  let z = shrinkage_factor * 19.361 +
      0.106 * shrinkage_factor * weight_adj

  results.forEach(result => {
    z = z - shrinkage_factor * result.value
  })

  return 1 / (1 + Math.exp(-z))
}

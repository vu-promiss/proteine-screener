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
  let r = {
    amount_slice_breadd1: 1,
    amount_slice_breadd2: 1,
    amount_slice_breadd3: 1,
    amount_milkd1: 1,
    amount_milkd2: 1,
    amount_meatd1: 1,
    amount_meatd2: 1,
    freq_eggd1: 1,
    freq_eggd2: 1,
    freq_eggd3: 1,
    freq_dairy_dessert: 1,
    freq_pastad1: 1,
    freq_pastad2: 1,
    freq_pastad3: 1,
    freq_fishd1: 1,
    freq_fishd2: 1,
    freq_fishd3: 1,
    freq_peanutsd1: 1,
    freq_peanutsd2: 1,
    freq_cheese_on_bread: 1,
    amount_bread_with_cheesed1: 1,
    amount_bread_with_cheesed2: 1
  }

  // recode question on slices of bread.
  if (state.answers['N05b_0'] !== undefined) {
    r.amount_slice_breadd1 = state.answers['N05b_0'] === 4 ? 2 : 1
    r.amount_slice_breadd2 = state.answers['N05b_0'] === 5 ? 2 : 1
    r.amount_slice_breadd3 = state.answers['N05b_0'] >= 6 ? 2 : 1
  }

  // recode question on glasses of milk.
  if (state.answers['N15b_0'] !== undefined) {
    r.amount_milkd1 = state.answers['N15b_0'] === 2 ? 2 : 1
    r.amount_milkd2 = state.answers['N15b_0'] >= 3 ? 2 : 1
  }

  // recode question on amount meat warm meal.
  if (state.answers['N34b'] !== undefined) {
    r.amount_meatd1 = state.answers['N34b'] === 2 ? 2 : 1
    r.amount_meatd2 = state.answers['N34b'] >= 3 ? 2 : 1
  }

  // recode question on frequency egg intake.
  if (state.answers['N14a_0'] !== undefined) {
    r.freq_eggd1 = state.answers['N14a_0'] === 4 ? 2 : 1
    r.freq_eggd2 = state.answers['N14a_0'] === 5 ? 2 : 1
    r.freq_eggd3 = state.answers['N14a_0'] >= 6 ? 2 : 1
  }

  // recode question on frequency dairy dessert.
  if (state.answers['N18a_0'] !== undefined) {
    r.freq_dairy_dessert = state.answers['N18a_0'] <= 3 ? 1 : state.answers['N18a_0'] - 2
  }

  // recode question on frequency pasta.
  if (state.answers['N24a_0'] !== undefined) {
    r.freq_pastad1 = state.answers['N24a_0'] === 3 ? 2 : 1
    r.freq_pastad2 = state.answers['N24a_0'] === 4 ? 2 : 1
    r.freq_pastad3 = state.answers['N24a_0'] >= 5 ? 2 : 1
  }

  // recode question on frequency fish.
  if (state.answers['N33a_0'] !== undefined) {
    r.freq_fishd1 = state.answers['N33a_0'] === 3 ? 2 : 1
    r.freq_fishd2 = state.answers['N33a_0'] === 4 ? 2 : 1
    r.freq_fishd3 = state.answers['N33a_0'] >= 5 ? 2 : 1
  }

  // recode question on frequency peanuts.
  if (state.answers['N62a_0'] !== undefined) {
    r.freq_peanutsd1 = [2, 3].includes(state.answers['N62a_0']) ? 2 : 1
    r.freq_peanutsd2 = state.answers['N62a_0'] >= 4 ? 2 : 1
  }

  // recode question on frequency cheese on bread.
  if (state.answers['N08a_0'] !== undefined) {
    r.freq_cheese_on_bread = state.answers['N08a_0'] <= 3 ? 1 : state.answers['N08a_0'] - 2
  }

  // recode question on amount bread with cheese.
  if (state.answers['N08b_0'] !== undefined) {
    r.amount_bread_with_cheesed1 = state.answers['N08b_0'] === 3 ? 2 : 1
    r.amount_bread_with_cheesed2 = state.answers['N08b_0'] >= 4 ? 2 : 1
  }

  return r
}

export const predprob = (state, getters) => {
  // Shrinkage Factor
  let shrinkage_factor = 0.92
  let bmi
  let height_m = state.answers.length / 100.0
  let weight_adj = state.answers.weight

  // Initialize variables
  // let r = getters.recodedAnswers

  // berekenen bmi
  bmi = state.answers.weight / (height_m * height_m)

  // berekenen weight_adj
  if (bmi < 18.5 && state.answers.age < 71) weight_adj = (height_m) * (height_m) * 18.5
  if (bmi > 25.0 && state.answers.age < 71) weight_adj = (height_m) * (height_m) * 25
  // if (bmi >= 18.5 && bmi <= 25 && state.answers.age < 71) weight_adj = state.answers.weight
  if (bmi < 22.0 & state.answers.age >= 71) weight_adj = (height_m) * (height_m) * 22
  if (bmi > 27.0 & state.answers.age >= 71) weight_adj = (height_m) * (height_m) * 27
  // if (bmi >= 22.0 & bmi <= 27.0 & state.answers.age >= 71) weight_adj = state.answers.weight

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

  console.log(results)

  let z = shrinkage_factor * 19.361 +
      0.106 * shrinkage_factor * weight_adj

  results.forEach(result => {
    z = z - shrinkage_factor * result.value
  })
  //     0.326 * shrinkage_factor * r.amount_slice_breadd1 -
  //     1.175 * shrinkage_factor * r.amount_slice_breadd2 -
  //     2.750 * shrinkage_factor * r.amount_slice_breadd3 -
  //     0.344 * shrinkage_factor * r.amount_milkd1 -
  //     1.681 * shrinkage_factor * r.amount_milkd2 -
  //     1.326 * shrinkage_factor * r.amount_meatd1 -
  //     3.074 * shrinkage_factor * r.amount_meatd2 -
  //     0.175 * shrinkage_factor * r.freq_dairy_dessert -
  //     0.256 * shrinkage_factor * r.freq_eggd1 -
  //     0.636 * shrinkage_factor * r.freq_eggd2 -
  //     1.480 * shrinkage_factor * r.freq_eggd3 -
  //     0.432 * shrinkage_factor * r.freq_pastad1 -
  //     0.713 * shrinkage_factor * r.freq_pastad2 -
  //     1.409 * shrinkage_factor * r.freq_pastad3 -
  //     0.454 * shrinkage_factor * r.freq_fishd1 -
  //     0.757 * shrinkage_factor * r.freq_fishd2 -
  //     1.100 * shrinkage_factor * r.freq_fishd3 -
  //     0.393 * shrinkage_factor * r.freq_peanutsd1 -
  //     0.888 * shrinkage_factor * r.freq_peanutsd2 -
  //     0.177 * shrinkage_factor * r.freq_cheese_on_bread -
  //     0.654 * shrinkage_factor * r.amount_bread_with_cheesed1 -
  //     1.214 * shrinkage_factor * r.amount_bread_with_cheesed2

  return 1 / (1 + Math.exp(-z))
}

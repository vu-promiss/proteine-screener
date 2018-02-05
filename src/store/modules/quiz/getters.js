/* eslint camelcase: "off" */
export const questions = (state) => state.questions

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
  let shrinkage_factor = 0.83
  // Initialize variables
  let r = getters.recodedAnswers

  let z = shrinkage_factor * 22.606 -
      0.229 * shrinkage_factor * r.amount_slice_breadd1 -
      0.946 * shrinkage_factor * r.amount_slice_breadd2 -
      2.177 * shrinkage_factor * r.amount_slice_breadd3 -
      0.252 * shrinkage_factor * r.amount_milkd1 -
      1.36 * shrinkage_factor * r.amount_milkd2 -
      0.906 * shrinkage_factor * r.amount_meatd1 -
      2.193 * shrinkage_factor * r.amount_meatd2 -
      0.178 * shrinkage_factor * r.freq_dairy_dessert -
      0.380 * shrinkage_factor * r.freq_eggd1 -
      0.607 * shrinkage_factor * r.freq_eggd2 -
      1.422 * shrinkage_factor * r.freq_eggd3 -
      0.329 * shrinkage_factor * r.freq_pastad1 -
      0.666 * shrinkage_factor * r.freq_pastad2 -
      1.348 * shrinkage_factor * r.freq_pastad3 -
      0.496 * shrinkage_factor * r.freq_fishd1 -
      0.671 * shrinkage_factor * r.freq_fishd2 -
      0.970 * shrinkage_factor * r.freq_fishd3 -
      0.275 * shrinkage_factor * r.freq_peanutsd1 -
      0.742 * shrinkage_factor * r.freq_peanutsd2 -
      0.166 * shrinkage_factor * r.freq_cheese_on_bread -
      0.554 * shrinkage_factor * r.amount_bread_with_cheesed1 -
      1.06 * shrinkage_factor * r.amount_bread_with_cheesed2

  return 1 / (1 + Math.exp(-z))
}

/* eslint camelcase: "off" */
export const questions = (state) => state.questions

export const strQuestions = (state) => {
  return JSON.stringify(state.questions, null, 4)
}

export const answers = (state) => state.answers

export const getAnswerById = (state) => (id) => {
  return state.answers.find(answer => answer.id === id)
}

export const predprob = (state) => {
  // return state.answers
  let shrinkage_factor = 0.83
  let amount_slice_breadd1 = state.answers['N05b_0'] === 4 ? 2 : 1
  let amount_slice_breadd2 = state.answers['N05b_0'] === 5 ? 2 : 1
  let amount_slice_breadd3 = state.answers['N05b_0'] > 5 ? 2 : 1
  let amount_meatd1 = state.answers['N34b'] === 2 ? 2 : 1
  let amount_meatd2 = state.answers['N34b'] >= 3 ? 2 : 1

  let z = shrinkage_factor * 22.606 -
      0.229 * shrinkage_factor * amount_slice_breadd1 -
      0.946 * shrinkage_factor * amount_slice_breadd2 -
      2.177 * shrinkage_factor * amount_slice_breadd3 -
      0.906 * shrinkage_factor * amount_meatd1 -
      2.193 * shrinkage_factor * amount_meatd2

  return 1 / (1 + Math.exp(-z))
}

// COMPUTE z = shrinkage_factor *22.606 -0.229*shrinkage_factor *amount_slice_breadd1 -0.946*shrinkage_factor *amount_slice_breadd2
// -2.177*shrinkage_factor *amount_slice_breadd3 -0.252*shrinkage_factor *amount_milkd1 -1.36*shrinkage_factor *amount_milkd2
// -0.906*shrinkage_factor *amount_meatd1 -2.193*shrinkage_factor *amount_meatd2 -0.178*shrinkage_factor *freq_dairy_dessert
// -0.380*shrinkage_factor *freq_eggd1 -0.607*shrinkage_factor *freq_eggd2 -1.422*shrinkage_factor *freq_eggd3 -0.329*shrinkage_factor *freq_pastad1
// -0.666*shrinkage_factor *freq_pastad2 -1.348*shrinkage_factor *freq_pastad3 -0.496*shrinkage_factor *freq_fishd1 -0.671*shrinkage_factor *freq_fishd2
// -0.970*shrinkage_factor *freq_fishd3 -0.275*shrinkage_factor *freq_peanutsd1 -0.742*shrinkage_factor *freq_peanutsd2
// -0.166*shrinkage_factor *freq_cheese_on_bread -0.554*shrinkage_factor *amount_bread_with_cheesed1 -1.06*shrinkage_factor *amount_bread_with_cheesed2

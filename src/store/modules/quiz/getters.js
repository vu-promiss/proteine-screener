export const questions = (state) => state.questions

export const answers = (state) => state.answers

export const getAnswerById = (state) => (id) => {
  return state.answers.find(answer => answer.id === id)
}

export const setQuestions = (state, questions) => {
  state.questions = questions
}

export const setAnswer = (state, {questionId, answer}) => {
  if (state.answers.find(answer => answer.questionId === questionId)) {

  }
  state.answers[questionId] = answer
}

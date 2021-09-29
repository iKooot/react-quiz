import axios from "../../axios/axios-quiz";
import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  SET_QUIZ_NAME,
} from './actionTypes'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation(item) {
  return {
    type: RESET_QUIZ_CREATION,
    item,
  }
}

export function setQuizName(item) {
  return {
    type: SET_QUIZ_NAME,
    item,
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('quizes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}
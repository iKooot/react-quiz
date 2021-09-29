import {
  CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, SET_QUIZ_NAME,
} from '../actions/actionTypes'

const initialState = {
  quiz: {
    name: null,
    questions: [],
  },
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: {
          name: state.quiz.name,
          questions: [...state.quiz.questions, action.item],
        }
    }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: {
          name: null,
          questions: [],
        },
      }
    case SET_QUIZ_NAME:
    return {
      ...state,
      quiz: {
        name: action.item.name,
        questions: [...state.quiz.questions]
      }
    }
    default:
      return state
  }
}
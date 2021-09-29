import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const responce = await axios.get('quizes.json')

      const quizes = []
      Object.keys(responce.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `${i + 1}. ${responce.data[key].name}`,
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async  dispatch => {
    dispatch(fetchQuizesStart)

    try {
      const responce = await axios.get(`quizes/${quizId}.json`)

      const data = {
        quiz: responce.data.questions,
        quizName: responce.data.name
      }

      dispatch(setchQuizSuccess(data))
    } catch (e){
      dispatch(fetchQuizesError(e))
    }
  }
}

export function setchQuizSuccess({quiz, quizName}) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quizName,
    quiz,
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function quizSetState( answerState, results ) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizNexQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber,
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

export function quizAnswerClick(answerId) {
  return ((dispatch, getState) => {
    const  state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'},  results));

      const timout = window.setTimeout(()=>{
        if(isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNexQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timout)
      }, 500)
    } else {

      results[question.id] = 'error'

      dispatch(quizSetState({[answerId]: 'error'},  results));

    }
  })
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}


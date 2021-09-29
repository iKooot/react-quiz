import axios from 'axios'
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNWefwl39LV64I_MCGoLw3CX9v7xqi8P0';

    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNWefwl39LV64I_MCGoLw3CX9v7xqi8P0'
    }

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('usedId', data.localId)
    localStorage.setItem('expirationData', expirationData)

    dispatch(authSuccess(data.idToken))
    dispatch(autLogout(data.expiresIn))
  }
}

export function autLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('usedId')
  localStorage.removeItem('expirationData')

  return {
    type: AUTH_LOGOUT,
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')

    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationData'))

      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}
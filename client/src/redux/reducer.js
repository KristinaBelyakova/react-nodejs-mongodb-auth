import { SIGNUP, LOGIN } from "./actionTypes"

const initialState = { user: {}, isAuth: false }

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SIGNUP:
      return { ...state, user: action.payload, isAuth: true }

    case LOGIN:
      return { ...state, user: action.payload, isAuth: true }

    default:
      return state
  }
}

export default reducer

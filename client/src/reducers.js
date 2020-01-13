import { combineReducers } from 'redux'

/*
const rootReducer = (state, action) => {
    switch(action.type) {
      case 'login':
        return { ...state, user: action.user }
      case 'logout':
        return { ...state, user: null }
      case 'tema':
          return { ...state, tema: action.tema }
      case 'products':
          return { ...state, products: action.products }
      case 'showModal':
          return { ...state, modal: {
            type: action.modalType
          } }
      case 'hideModal':
          return { ...state, modal: null }
      case 'visit':
          return { ...state, visits: state.visits + 1 }
      default:
        return state || {
          tema: 'dark',
          visits: 0
        }
    }
}
*/
const userReducer = (state, action) => {
  switch(action.type) {
    case 'login': return action.user
    case 'logout': return null
    default: return state || null
  }
}

const modalReducer = (state, action) => {
  switch(action.type) {
    case 'showModal': return { type: action.modalType }
    case 'hideModal': return null
    default: return state || null
  }
}

const productReducer = (state, action) =>
  action.type === 'products' ? action.products : state || null

  const temaReducer = (state, action) =>
  action.type === 'tema' ? action.tema : state || 'dark'

  const visitReducer = (state, action) =>
  action.type === 'visit' ? state + 1 : state || 0

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  products: productReducer,
  tema: temaReducer,
  visits: visitReducer
})

export default rootReducer












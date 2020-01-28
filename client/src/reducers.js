import { createStore, combineReducers, compose} from 'redux'

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

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore () {
  const store = createStore (
    rootReducer,
    composeEnhancers()
  )
  return store
}












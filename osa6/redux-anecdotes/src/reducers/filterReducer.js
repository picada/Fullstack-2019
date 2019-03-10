export const setFilter = (content) => {
  return {
    type:'SET_FILTER',
    data: {
      content
    }
  }
}

const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
    return action.data.content
    default: return state
  }
}

export default filterReducer

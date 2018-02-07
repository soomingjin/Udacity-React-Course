import {
  GET_CATEGORIES,
} from '../actions/types'

export const categories = (state = {}, action) => {
  const { categories } = action;
  console.log(categories);
  switch(action.type){
    case GET_CATEGORIES:
      return {
        ...categories.reduce((previous, current) => {
        previous[current.name] = current
        return previous
        }, {}),
      }
    default:
      return state
  }
}

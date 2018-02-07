import {
  CHANGE_SORT,
} from '../actions/types'

const initialSortPostTypeState = {
  rule: "voteScore"
}

export const sortPostType = (state=initialSortPostTypeState, action) => {
  const { rule } = action
  switch (action.type) {
    case CHANGE_SORT:
      return {
        rule
      }
    default:
      return state
  }
}

import {
  CHANGE_SORT,
} from '../actions/types'

const initialSortCommentsTypeState = {
  rule: "voteScore"
}

export const sortCommentsType = (state=initialSortCommentsTypeState, action) => {
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

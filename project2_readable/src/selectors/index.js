import { createSelector } from 'reselect'

const getSortPostType = state => state.sortPostType.rule
const getSortCommentsType = state => state.sortCommentsType.rule
const getPosts = state => state.posts
const getComments = state => state.comments

const compareVoteScoreHighToLow = (a, b) => {
  if (a.voteScore > b.voteScore){
    return -1;
  } else if(a.voteScore < b.voteScore) {
    return 1;
  }
  return 0;
}

const compareTimestampHighToLow = (a, b) => {
  if (a.timestamp > b.timestamp){
    return -1;
  } else if(a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
}

export const getSortedPosts = createSelector(
  [getSortPostType, getPosts],
  (sortPostType, posts) => {
    switch(sortPostType){
      case "voteScore":
        return Object.values(posts).sort(compareVoteScoreHighToLow).map(post => posts[post.id])
      case "timestamp":
        return Object.values(posts).sort(compareTimestampHighToLow).map(post => posts[post.id])
      default:
        return posts
    }
  }
)

export const getSortedComments = createSelector(
  [getSortCommentsType, getComments],
  (sortCommentsType, comments) => {
    switch(sortCommentsType){
      case "voteScore":
        return Object.values(comments).sort(compareVoteScoreHighToLow).map(comment => comments[comment.id])
      case "timestamp":
        return Object.values(comments).sort(compareTimestampHighToLow).map(comment => comments[comment.id])
      default:
        return comments
    }
  }
)

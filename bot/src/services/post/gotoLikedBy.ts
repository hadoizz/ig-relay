import Post from '../../types/post/Post'
import LikesBox from '../../types/post/LikesBox'
import getLikesBox from './selectors/getLikesBox'

export default async (post: Post) => {
  let likesBox: LikesBox
  try {
    likesBox = await getLikesBox(post)
  } catch(error) {
    return 0
  }

  const likedByLink = await likesBox.$('a')
  if(likedByLink === null)
    throw `Nie ma linku do osób, które polubiły post`

  await likedByLink.click()
}
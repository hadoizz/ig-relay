import getLikesButton from '../post/selectors/getLikesBox'
import Post from '../../types/post/Post'

export default async (post: Post) => {
  const likesButton = await getLikesButton(post)
  await likesButton.click()
}
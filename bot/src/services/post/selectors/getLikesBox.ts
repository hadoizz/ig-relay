import LikesBox from '../../../types/post/LikesBox'
import Post from '../../../types/post/Post'
import x from '../../../utils/elements/x'

const getLikesBox = async (post: Post) => {
  //Liczba polubień: X
  const box = await x(post, `//*[contains(text(), 'Liczba polubień')]`)
  if(box !== null)
    return box 

  //Lubią to X i Y innych użytkowników
  return await x(post, `//*[contains(text(), 'Lubią to')]//button`)
}

export default async (post: Post): Promise<LikesBox> => {
  const likesBox = await getLikesBox(post)
  if(likesBox === null)
    throw `Nie można pobrać przycisku z likeami`

  return likesBox
}
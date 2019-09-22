import TypedEvent from './lib/TypedEvent'
import Person from './types/Person'

export const onFollow = new TypedEvent<Person>()
export const onLikePost = new TypedEvent<void>()
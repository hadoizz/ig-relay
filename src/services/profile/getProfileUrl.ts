import getCredentials from '../../config/getCredentials'

export default async () =>
  `https://www.instagram.com/${(await getCredentials()).login}/`
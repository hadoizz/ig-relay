import path from 'path'

//./insta/accounts_data/accountId
export default (accountId: number) =>
  path.resolve(__dirname, `../../../../accounts_data/${accountId}`)
import { useState, useCallback, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Account } from '../../types/Account'
import deleteAccount from '../../api/accounts/deleteAccount'

const mapStateToProps = state => ({
  currentAccount: state.bot.currentAccount
})

export default connect(mapStateToProps)(({ currentAccount }: { currentAccount: Account }) => {
  const delAccount = async () => {
    const deleted = await deleteAccount(currentAccount.accountId)
    if(deleted){
      alert('Account deleted')
      location.reload()
      return
    }

    alert(`Couldn't delete account`)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={delAccount}>
        Delete account 
      </Button>
    </div>
  )
})
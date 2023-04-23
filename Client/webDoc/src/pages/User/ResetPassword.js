import React from 'react'
import PasswordUpdate from '../../components/User/PasswordUpdate'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {userId,token} = useParams();
  return (
    <>
        <PasswordUpdate userId={userId} token={token}/>
    </>
  )
}

export default ResetPassword
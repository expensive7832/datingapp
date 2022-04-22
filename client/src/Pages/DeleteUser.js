import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const DeleteUser = () => {

    const { userId } = useParams()

    const navigate = useNavigate()

useEffect(() => {

  Axios.delete(`/delete/${userId}`, userId).then((res) => {
    localStorage.removeItem('userData')
    navigate('./../../')
    toast.success(res?.data?.msg)
  }).catch((e) =>{
    toast.danger(e.message)
  })

}, [userId])



  return (
    <div id='deleteuser'></div>
  )
}

export default DeleteUser
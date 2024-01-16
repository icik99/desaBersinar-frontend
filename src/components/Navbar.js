import React, { useEffect, useState } from 'react'
import Api from '../Api'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  
  const FetchUser = async () => {
    try {
      const response = await Api.Fetch(localStorage.getItem('token'))
      setRole(response.data.role)
      setName(response.data.username)
    } catch (error) {
      navigate('/')
    }
  }

  useEffect(() => {
    FetchUser()
  }, [])

  return (
    <>
    <div className='px-[40px]'>
        <div className='flex justify-between mt-[56px] mb-[44px]'>
          <div className='py-[14px] text-lg font-medium'>
            <h1>{name}</h1>
            {/* <h1>Muh Rizieq Fazlulrahman Djafar</h1> */}
            <h1>Role: <span className='text-red-500'>{role}</span></h1>
          </div>
          <div className='flex gap-2 items-center'>
            <h1 className='text-blue-700 font-bold'>BNN Kabupaten Banyumas</h1>
            <img src="https://bnn.go.id/konten/unggahan/2019/03/bnn-250x250.png" alt="" className='rounded-full border-2 w-[52px] h-[52px]' />
          </div>
        </div>
    </div>

    </>
  )
}

export default Navbar
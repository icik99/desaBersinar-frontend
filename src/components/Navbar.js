import React, { useEffect } from 'react'
import Api from '../Api'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  
  const FetchUser = async () => {
    try {
      const response = await Api.Fetch(localStorage.getItem('token'))
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
          <div className='py-[14px] px-[20px] flex gap-[16px] items-center bg-white rounded w-full border'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#ADA7A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 22L20 20" stroke="#ADA7A7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text" placeholder='Search...' className='text-stone-400 text-base font-normal bg-transparent outline-none w-full' name="" id="" />
          </div>
          <img src="https://bnn.go.id/konten/unggahan/2019/03/bnn-250x250.png" alt="" className='rounded-full border-2 w-[52px] h-[52px]' />
        </div>
    </div>

    </>
  )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import Api from '../Api'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  
   // State to manage the visibility of the navigation menu
   const [isNavOpen, setNavOpen] = useState(false);

   // Function to toggle the navigation menu visibility
   const toggleNav = () => {
     setNavOpen(!isNavOpen);
   };

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
    <div className=' mb-[44px] bg-white shadow border'>
      {/* <div className='px-[40px]'> */}
        <nav className="bg-white border-gray-200 md:hidden px-[40px] w-full z-50">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logo_BNN.svg/900px-Logo_BNN.svg.png" className="w-10 h-10" alt="BNN Logo" />
            </div>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              onClick={toggleNav}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            <div className={`w-full md:flex md:w-auto bg-white ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white  md ">
                <li>
                  <Link to={'/dashboard'} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-blue-700" aria-current="page">Dashboard</Link>
                </li>
                <li>
                  <Link to={'/relawan'} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-blue-700 ">Relawan</Link>
                </li>
                <li>
                  <Link to={'/responden'} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-blue-700 ">Masyarakat</Link>
                </li>
                <li>
                  <Link to={'/daerah-rawan-narkoba'} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-blue-700 ">Daerah Rawan Narkoba</Link>
                </li>
                <li>
                  <Link to={'/kuesionerType'} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 hover:bg-blue-700 ">Kuesioner</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      {/* </div> */}

    </div>
    </>
  )
}

export default Navbar
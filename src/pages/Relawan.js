import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import AddButton from '../components/AddButton'
import Modal from '../components/Modal'
import Api from '../Api'
import toast from 'react-hot-toast'

const Relawan = () => {

  const [addRelawan, setAddRelawan] = useState()
  const [editRelawan, setEditRelawan] = useState()
  const [detailRelawan, setDetailRelawan] = useState()
  const [passwordType, setPasswordType] = useState('password')
  const [dataRelawan, setDataRelawan] = useState('')
  const [refresh, setRefresh] = useState()

  //State Relawan
  const [name, setName] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [instansi, setInstansi] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const createRelawan = async () => {
    try {
      const data = {
        fullname: name,
        jabatan: jabatan,
        installation: instansi,
        email: email,
        phone: phone,
        image: '',
        address: address,
        username: username,
        password: password
      }
      const response = await Api.CreateRelawan(localStorage.getItem('token'), data)
      setRefresh(true)
      toast.success('Berhasil Buat Relawan')
      resetForm()
      setAddRelawan(!addRelawan)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const getRelawan = async () => {
    try {
      const response = await Api.GetRelawan(localStorage.getItem('token'))
      console.log(response)
      setDataRelawan(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const openDetailRelawan = async (id) => {
    try {
      const response = await Api.GetRelawanById(localStorage.getItem('token'), id)
    } catch (error) {
      
    }
  }

  const deleteRelawan = async (id) => {
    try {
      const resposne = await Api.DeleteRelawan(localStorage.getItem('token'), id)
      toast.success('Success Delete')
      setRefresh(true)
    } catch (error) {
      console.log(error)
    }
  }

  const resetForm = () =>{
    setName('')
    setJabatan('')
    setInstansi('')
    setEmail('')
    setPhone('')
    setImage('')
    setAddress('')
    setUsername('')
    setPassword('')
  }


  const ChangePasswordType = () => {
    if(passwordType === 'password') {
        setPasswordType('text')
    } else {
        setPasswordType('password')
    }
  }

  useEffect(() => {
    getRelawan()
    setRefresh(false)
  }, [refresh])

  return (

  <div>
    <Modal
      activeModal={addRelawan}
      title={'Tambahkan Relawan'}
      buttonClose={ () => setAddRelawan(!addRelawan)}
      width={'600px'}
      content={
        <div className='space-y-[40px] w-full'> 
          <div className="space-y-4 md:space-y-6">
            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Email <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
              </div>

              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Telepon <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Telepon...' />
              </div>
            </div>

            <h1 className='border-b-2 mb-2 text-sm font-medium text-gray-900 w-fit border-b-blue-700'>Detail Alamat</h1>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama Jalan / Gedung / Lokasi <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className="flex items-center gap-2">
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kabupaten <span className='text-red-600'>*</span></label>
                  <input value={'Banyumas'} type="text" disabled className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
              </div>  
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kecamatan <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Kecamatan...' />
              </div>   
            </div> 

            <div className='flex items-center gap-2'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kelurahan <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Kelurahan...' />
              </div>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Desa <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Desa...' />
              </div>
            </div>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Instansi <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setInstansi(e.target.value)} value={instansi} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Instansi...' />
            </div>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Jabatan <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setJabatan(e.target.value)} value={jabatan} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Jabatan...' />
            </div>

            <h1 className='border-b-2 mb-2 text-sm font-medium text-gray-900 w-fit border-b-blue-700'>Informasi Login</h1>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Username <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
              </div>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Password <span className='text-red-600'>*</span></label>
                  <div className='relative'>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={passwordType} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='*******' />
                    <button onClick={ChangePasswordType} className='absolute right-3 top-2.5 text-xl text-[#A8A8A8]'>
                        {passwordType === 'text' ?
                            <AiOutlineEye/>
                        :
                            <AiOutlineEyeInvisible/>
                        }
                    </button>
                  </div>
              </div>
            </div>

            

            <div className='flex items-center justify-end gap-3'>
              <button onClick={() => {setAddRelawan(!addRelawan); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
              <button onClick={createRelawan}  className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
            </div>
          </div>
        </div>
    }/>

    <Modal
      activeModal={editRelawan}
      title={'Edit Data Relawan'}
      buttonClose={ () => setEditRelawan(!editRelawan)}
      width={'600px'}
      content={
        <div className='space-y-[40px] w-full'> 
          <div className="space-y-4 md:space-y-6">
            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Email <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
              </div>

              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Telepon <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Telepon...' />
              </div>
            </div>

            <h1 className='border-b-2 mb-2 text-sm font-medium text-gray-900 w-fit border-b-blue-700'>Detail Alamat</h1>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama Jalan / Gedung / Lokasi <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className="flex items-center gap-2">
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kabupaten <span className='text-red-600'>*</span></label>
                  <input value={'Banyumas'} type="text" disabled className="bg-gray-300 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
              </div>  
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kecamatan <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Kecamatan...' />
              </div>   
            </div> 

            <div className='flex items-center gap-2'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kelurahan <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Kelurahan...' />
              </div>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Desa <span className='text-red-600'>*</span></label>
                  <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Desa...' />
              </div>
            </div>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Instansi <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setInstansi(e.target.value)} value={instansi} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Instansi...' />
            </div>

            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Jabatan <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setJabatan(e.target.value)} value={jabatan} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Jabatan...' />
            </div>

            <h1 className='border-b-2 mb-2 text-sm font-medium text-gray-900 w-fit border-b-blue-700'>Informasi Login</h1>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Username <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
              </div>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Password <span className='text-red-600'>*</span></label>
                  <div className='relative'>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={passwordType} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='*******' />
                    <button onClick={ChangePasswordType} className='absolute right-3 top-2.5 text-xl text-[#A8A8A8]'>
                        {passwordType === 'text' ?
                            <AiOutlineEye/>
                        :
                            <AiOutlineEyeInvisible/>
                        }
                    </button>
                  </div>
              </div>
            </div>

            

            <div className='flex items-center justify-end gap-3'>
              <button onClick={() => {setAddRelawan(!addRelawan); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
              <button onClick={createRelawan}  className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
            </div>
          </div>
        </div>   
    }/>

    <div className='min-h-screen'>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar/>

          <div className='flex items-end justify-between mb-[40px] px-[40px]'>
            <div className='font-medium space-y-[8px] '>
              <h1 className="text-black text-2xl">Relawan</h1>
              <h1 className="text-gray-400 text-base">List of Relawan</h1>
            </div>
            <AddButton triggerModal={() => setAddRelawan(!addRelawan)} title={'Relawan'}/>
          </div>

          <div className='px-[40px]'>
            <div className="flex flex-col">
                {/* <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5"> */}
                  {/* <div className="min-w-full sm:px-6 lg:px-8"> */}
                    <div className="overflow-auto">
                      <table className="min-w-full">
                        <thead className="bg-white border-b ">
                          <tr>
                            <th className="text-sm font-medium text-gray-900 px-1 py-2 text-center border">
                              No.
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Nama
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Instansi
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Jabatan
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Email
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Telepon
                            </th>
                            <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center border">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(dataRelawan).map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center border">{idx + 1}</td>
                              <td className="text-sm text-gray-900 font-light px-1 py-2 whitespace-nowrap text-start border">
                                {item.fullname?? '-'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-start border">
                                {item.installation?? '-'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-start border">
                                {item.jabatan?? '-'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-start border">
                                {item.email?? '-'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-start border">
                                {item.phone?? '-'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                <div className='flex items-center justify-center gap-2 text-lg'>
                                  <button className='p-1.5 bg-gray-300  rounded-lg'>
                                    <AiFillEye/>
                                  </button>
                                  <button  onClick={() => setEditRelawan(!editRelawan)} className='p-1.5 bg-gray-300  rounded-lg'>
                                    <AiFillEdit/>
                                  </button>
                                  <button onClick={() => deleteRelawan(item.id)} className='p-1.5 bg-gray-300 rounded-lg'>
                                    <AiFillDelete/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  {/* </div> */}
                {/* </div> */}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Relawan
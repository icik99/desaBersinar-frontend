import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSearch } from 'react-icons/ai'
import AddButton from '../components/AddButton'
import Modal from '../components/Modal'
import Api from '../Api'
import toast from 'react-hot-toast'
import { IconInsertPhoto } from '../assets'
import ModalDelete from '../components/ModalDelete'
import { concat, debounce } from 'lodash'
import imageHandle from '../utils/imageHandle'

const Relawan = () => {

  const [showModalDelete, setShowModalDelete] = useState()
  const [addRelawan, setAddRelawan] = useState()
  const [editRelawan, setEditRelawan] = useState()
  const [detailRelawan, setDetailRelawan] = useState()
  const [passwordType, setPasswordType] = useState('password')
  const [dataRelawan, setDataRelawan] = useState('')
  const [dataDetailRelawan, setDataDetailRelawan] = useState('')
  const [refresh, setRefresh] = useState()

  const [dataKecamatan, setDataKecamatan] = useState('')
  const [dataDesa, setDataDesa] = useState('')
  const [idKecamatan, setIdKecamatan] = useState('')

  //State Relawan
  const [idRelawan, setIdRelawan] = useState('')
  const [name, setName] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [instansi, setInstansi] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [desa, setDesa] = useState('')

  const [viewImage, setViewImage] = useState('')
  const [uploadImage, setUploadImage] = useState('')

  //Handle Image
    const handleViewImage = (e) => {
        const maxSize = 2 * 1024 * 1024
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const file = e.target.files[0]
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (file && file.size > maxSize){
            toast.error('gambar harus < 2MB')
            setUploadImage(null)
        } else if (!allowedExtensions.includes(fileExtension)){
            toast.error('file harus jpg, jpeg, atau png')
        } else {
            setViewImage(URL.createObjectURL(e.target.files[0]))
            const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                setUploadImage(reader.result)
            };
        }
    }
                                        
  
  const createRelawan = async () => {
    try {
      const data = {
        fullname: name,
        jabatan: jabatan,
        installation: instansi,
        desa: desa,
        kecamatan: kecamatan,
        email: email,
        phone: phone,
        image: uploadImage,
        address: address,
        username: username,
        password: password
      }
      const response = await Api.CreateRelawan(localStorage.getItem('token'), data)
      console.log(data)
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
      const response = await Api.GetRelawan(localStorage.getItem('token'), '')
      setDataRelawan(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getSearchRelawan = debounce(async(keyword) => {
    try {
      const response = await Api.GetRelawan(localStorage.getItem('token'), keyword)
      setDataRelawan(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }, 500)

  

  const getKecamatan = async () => {
    try {
      const response = await Api.GetKecamatanDesa(localStorage.getItem('token'), '')
      setDataKecamatan(response.data.data)
      console.log(response, 'kecamatan')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectKecamatan = (e) => {
    const selectedOption = dataKecamatan.find(
      (data) => data.districts_id === parseInt(e.target.value)
    );
    if (selectedOption) {
      setIdKecamatan(selectedOption.districts_id);
      setKecamatan(selectedOption.name_kecamatan);
    } else {
      setIdKecamatan('')
      setKecamatan('')
    }
  };

  const getDesa = async() => {
    try {
      const response = await Api.GetKecamatanDesa(localStorage.getItem('token'), idKecamatan)
      setDataDesa(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    const searchKeyword = e.target.value
    getSearchRelawan(searchKeyword)
  }

  

  const openDetailRelawan = async (id) => {
    setDetailRelawan(!detailRelawan)
    try {
      const response = await Api.GetRelawanById(localStorage.getItem('token'), id)
      setDataDetailRelawan(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const openEditRelawan = async (id) => {
    setIdRelawan(id)
    setEditRelawan(!editRelawan)
    try {
      const response = await Api.GetRelawanById(localStorage.getItem('token'), id)
      setName(response.data.data.fullname)
      setJabatan(response.data.data.jabatan)
      setInstansi(response.data.data.installation)
      setEmail(response.data.data.email)
      setPhone(response.data.data.phone)
      setAddress(response.data.data.address)
      setViewImage(response.data.data.image)
      console.log(response, 'resEditRelawan')
    } catch (error) {
      console.log(error)
    }
  }

  const updateRelawan = async () => {
    try {
      const data = {
        fullname: name,
        jabatan: jabatan,
        installation: instansi,
        kecamatan: kecamatan,
        desa: desa,
        email: email,
        phone: phone,
        image: uploadImage,
        address: address,
        username: username,
        password: password
      }
      console.log(data)
      const response = await Api.UpdateRelawan(localStorage.getItem('token'), data, idRelawan)
      toast.success('Success Update Data!')
      setRefresh(true)
      setEditRelawan(!editRelawan)
    } catch (error) {
      console.log(error)
      toast.error(error.response.message)

    }
  }

  const deleteRelawan = async () => {
    try {
      const resposne = await Api.DeleteRelawan(localStorage.getItem('token'), idRelawan)
      toast.success('Success Delete')
      setShowModalDelete(!showModalDelete)
      setRefresh(true)
    } catch (error) {
      console.log(error)
      toast.error(error.response.message)
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

  const deleteFileModal = (id) => {
    setShowModalDelete(!showModalDelete)
    setIdRelawan(id)
    setRefresh(true)
  }

  useEffect(() => {
    getRelawan()
    setRefresh(false)
  }, [refresh])

  useEffect(() => {
    getKecamatan()
  },[addRelawan, editRelawan])

  useEffect(() => {
    getDesa()
  },[idKecamatan, kecamatan])

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
            <div className='flex gap-[20px] mb-[28px]'>
                <h1 className='mb-2 text-xs font-medium text-gray-900'>Photo <span className='text-[#E00101]'>*</span></h1>
                <label htmlFor='upload-image'>
                    <div className='w-[87px] h-[87px] rounded-full bg-[#D9D9D9] bg-cover shadow-md border' style={{ backgroundImage: `url(${viewImage})` }}>
                        {!viewImage &&
                            <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                                <img src={IconInsertPhoto} alt='Insert Humanusia' className='object-contain'/>
                            </div>
                        }
                    </div>
                    <input type='file' className='hidden' id='upload-image' onChange={ (e) => handleViewImage(e) }/>
                </label>
            </div>
            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Email <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
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
                  <select onChange={handleSelectKecamatan} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                        <option value="">Pilih Kecamatan...</option>
                        {Object.values(dataKecamatan).map((item, idx) => (
                          <option key={idx} value={item.districts_id}>{item.name_kecamatan}</option>
                          ))}
                  </select>
              </div>   
            </div> 

            <div className='flex items-center gap-2'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Kelurahan / Desa<span className='text-red-600'>*</span></label>
                  <select onChange={(e) => setDesa(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                        <option selected value="">Pilih Desa...</option>
                        {Object.values(dataDesa).map((item, idx) => (
                          <option key={idx} value={item.name}>{item.name}</option>
                          ))}
                  </select>
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

            <div className='flex gap-[20px] mb-[28px]'>
                <h1 className='mb-2 text-xs font-medium text-gray-900'>Photo <span className='text-[#E00101]'>*</span></h1>
                <label htmlFor='upload-image'>
                    <div className='w-[87px] h-[87px] rounded-full bg-[#D9D9D9] bg-cover shadow-md border' style={{ backgroundImage: `url(${viewImage? imageHandle(viewImage) : image })` }}>
                        {!viewImage &&
                            <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                                <img src={IconInsertPhoto} alt='Insert Humanusia' className='object-contain'/>
                            </div>
                        }
                    </div>
                    <input type='file' className='hidden' id='upload-image' onChange={ (e) => handleViewImage(e) }/>
                </label>
            </div>
            <div>
                <label className="mb-2 text-xs font-medium text-gray-900">Nama <span className='text-red-600'>*</span></label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Email <span className='text-red-600'>*</span></label>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
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
                    <select onChange={handleSelectKecamatan} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option value="">Pilih Kecamatan...</option>
                          {Object.values(dataKecamatan).map((item, idx) => (
                            <option key={idx} value={item.districts_id}>{item.name_kecamatan}</option>
                            ))}
                    </select>
                </div>   
              </div> 

              <div className='flex items-center gap-2'>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Kelurahan / Desa<span className='text-red-600'>*</span></label>
                    <select onChange={(e) => setDesa(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option selected value="">Pilih Desa...</option>
                          {Object.values(dataDesa).map((item, idx) => (
                            <option key={idx} value={item.name}>{item.name}</option>
                            ))}
                    </select>
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
                  <input onChange={(e) => setUsername(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Email...' />
              </div>
              <div className='w-full'>
                  <label className="mb-2 text-xs font-medium text-gray-900">Password <span className='text-red-600'>*</span></label>
                  <div className='relative'>
                    <input onChange={(e) => setPassword(e.target.value)} type={passwordType} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='*******' />
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
              <button onClick={() => {setEditRelawan(!editRelawan); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
              <button onClick={updateRelawan} className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
            </div>
          </div>
        </div>   
    }/>

    <Modal
      activeModal={detailRelawan}
      title={'Detail Data Relawan'}
      buttonClose={ () => setDetailRelawan(!detailRelawan)}
      width={'600px'}
      content={
        <div className='space-y-[40px] w-full'> 
          <div className="space-y-4 md:space-y-6 ">
            <div className='flex items-start gap-5'>

              <div className='grid grid-cols-10 w-full'>
                <div className='flex flex-col col-span-3 w-full'>
                    <h1 className='border-b-2 py-1 text-sm'>Nama</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Instansi</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Jabatan</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Email</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Telepon</h1>
                </div>
                <div className='flex flex-col col-span-7 w-full'>
                  <h1 className='border-b-2 py-1 text-sm'>: {dataDetailRelawan.fullname?? '-'}</h1>
                  <h1 className='border-b-2 py-1 text-sm'>: {dataDetailRelawan.installation?? '-'}</h1>
                  <h1 className='border-b-2 py-1 text-sm'>: {dataDetailRelawan.jabatan?? '-'}</h1>
                  <h1 className='border-b-2 py-1 text-sm'>: {dataDetailRelawan.email?? '-'}</h1>
                  <h1 className='border-b-2 py-1 text-sm'>: {dataDetailRelawan.phone?? '-'}</h1>
                </div>
              </div>

              <img className='w-[100px] h-[100px] rounded-lg border-2' src={imageHandle(dataDetailRelawan.image)} alt="profile" />

            </div>
            <div className='flex items-center justify-end gap-3'>
              <button onClick={() => setDetailRelawan(!detailRelawan)} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Close</button>
            </div>

          </div>
        </div>   
    }/>

    <ModalDelete
        activeModal={showModalDelete}
        buttonClose={() => setShowModalDelete(!showModalDelete)}
        submitButton={deleteRelawan}
    />

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
            <div className='flex gap-2'>
              <div className='relative'>
                  <AiOutlineSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                  <input placeholder='Cari Nama atau Nomor Telepon ...' onChange={handleSearch} className='text-[#A8A8A8] text-xs font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px]'/>
              </div>
              <AddButton triggerModal={() => setAddRelawan(!addRelawan)}  bgColor={'blue-700'} title={'Relawan'}/>
            </div>
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
                          {dataRelawan? Object.values(dataRelawan).map((item, idx) => (
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
                                  <button onClick={() => openDetailRelawan(item.id)} className='p-1.5 bg-gray-300  rounded-lg'>
                                    <AiFillEye/>
                                  </button>
                                  <button  onClick={() => openEditRelawan(item.id)} className='p-1.5 bg-gray-300  rounded-lg'>
                                    <AiFillEdit/>
                                  </button>
                                  <button onClick={() => deleteFileModal(item.id)} className='p-1.5 bg-gray-300 rounded-lg'>
                                    <AiFillDelete/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <h1 className='mt-9 flex items-center justify-start'>(Tidak ada data relawan)</h1>
                          )}
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
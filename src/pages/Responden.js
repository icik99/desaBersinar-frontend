import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSearch } from 'react-icons/ai'
import AddButton from '../components/AddButton'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import toast from 'react-hot-toast'
import { IconInsertPhoto } from '../assets'
import Modal from '../components/Modal'
import Api from '../Api'
import ModalDelete from '../components/ModalDelete'
import { debounce } from 'lodash'

const Responden = () => {
  // State Modal
  const [modalCreateResponden, setModalCreateResponden] = useState(false)
  const [modalEditResponden, setModalEditResponden] = useState(false)
  const [modalDeleteResponden, setModalDeleteResponden] = useState(false)
  const [modalDetailResponden, setModalDetailResponden] = useState(false)

    //State Responden
  const [idMasyarakat, setIdMasyarakat] = useState('')
  const [idRelawan, setIdRelawan] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [address, setAddress] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [desa, setDesa] = useState('')

  const [dataKecamatan, setDataKecamatan] = useState('')
  const [dataDesa, setDataDesa] = useState('')
  const [idKecamatan, setIdKecamatan] = useState('')
  const [idDesa, setIdDesa] = useState('')
  const [refresh, setRefresh] = useState('')

  const [viewImage, setViewImage] = useState('')
  const [uploadImage, setUploadImage] = useState('')
  const [dataRelawan, setDataRelawan] = useState('')
  const [dataMasyarakat, setDataMasyarakat] = useState('')

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

    const handleSelectDesa = (e) => {
      const selectedOption = dataDesa.find(
        (data) => data.id === e.target.value
      );
      console.log(selectedOption, 'selectedArray')
      if (selectedOption) {
        setIdDesa(selectedOption.id);
        setDesa(selectedOption.name);
      } else {
        setIdDesa('')
        setDesa('')
      }
    };

    const resetForm = () => {
      setName('')
      setImage('')
      setTempatLahir('')
      setTanggalLahir('')
      setAddress('')
      setKecamatan('')
      setDesa('')
      setPhone('')
      setEmail('')
      setIdDesa('')
      setIdRelawan('')
    }

    const openEditMasyarakat = async (id) => {
      setModalEditResponden(!modalEditResponden)
      setIdMasyarakat(id)
      try {
        const response = await Api.GetMasyarakatById(localStorage.getItem('token'), id)
        console.log(response, 'byIdMasyarakat')
        setName(response.data.data.fullname)
        setImage(response.data.data.image)
        setTempatLahir(response.data.data.placeBirth)
        setTanggalLahir(response.data.data.dateBirth)
        setAddress(response.data.data.address)
        setKecamatan(response.data.data.kecamatan)
        setDesa(response.data.data.desa)
        setPhone(response.data.data.phone)
        setEmail(response.data.data.email)
        setIdDesa(response.data.data.desaKecamatanId)
        setIdRelawan(response.data.data.relawanId)
      } catch (error) {
        console.log(error)
      }
    }

    const updateMasyarakat = async () => {
      try {
        const data = {
          fullname: name,
          image: uploadImage,
          placeBirth: tempatLahir, 
          dateBirth: tanggalLahir, 
          address: address, 
          kecamatan: kecamatan, 
          desa: desa, 
          phone: phone, 
          email: email, 
          desaKecamatanId: idDesa,
          relawanId: idRelawan,
        }
        const response = await Api.UpdateMasyarakat(localStorage.getItem('token'), data, idMasyarakat)
        toast.success('Success Update Masyarakat')
        resetForm()
        setRefresh(true)
        setModalEditResponden(!modalEditResponden)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

    const createMasyarakat = async () => {
      try {
        const data = {
          fullname: name,
          image: uploadImage,
          placeBirth: tempatLahir, 
          dateBirth: tanggalLahir, 
          address: address, 
          kecamatan: kecamatan, 
          desa: desa, 
          phone: phone, 
          email: email, 
          desaKecamatanId: idDesa,
          relawanId: idRelawan,
        }
        const response = await Api.CreateMasyarakat(localStorage.getItem('token'), data)
        toast.success('Success Create Masyarakat')
        resetForm()
        setRefresh(true)
        setModalCreateResponden(!modalCreateResponden)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

    const deleteMasyarakat = async () => {
      try {
        const response = await Api.DeleteMasyarakat(localStorage.getItem('token'), idMasyarakat)
        toast.success('Success Delete')
        setModalDeleteResponden(!modalDeleteResponden)
        setRefresh(true)
      } catch (error) {
        console.log(error)
        toast.error(error.response.message)
      }
    }

    const deleteModal = (id) => {
      setModalDeleteResponden(!modalDeleteResponden)
      setIdMasyarakat(id)
      setRefresh(true)
    }

    const getMasyarakat = async () => {
      try {
        const response = await Api.GetMasyarakat(localStorage.getItem('token'), '')
        setDataMasyarakat(response.data.data)
        console.log(response, 'masyarakat')
      } catch (error) {
        console.log(error)
      }
    }

    const getRelawan = async () => {
      try {
        const response = await Api.GetRelawan(localStorage.getItem('token'), '')
        setDataRelawan(response.data.data)
        console.log(response, 'dataRelawan')
      } catch (error) {
        console.log(error)
      }
    }

    const getSearchMasyarakat = debounce(async(keyword) => {
      try {
        const response = await Api.GetMasyarakat(localStorage.getItem('token'), keyword)
        setDataMasyarakat(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }, 500)
  const handleSearch = (e) => {
      const searchKeyword = e.target.value
      getSearchMasyarakat(searchKeyword)
    }

    const getKecamatan = async () => {
      try {
        const response = await Api.GetKecamatanDesa(localStorage.getItem('token'), '')
        setDataKecamatan(response.data.data)
        console.log('dataKecamatan', response)
      } catch (error) {
        console.log(error)
      }
    }
    const getDesa = async() => {
      try {
        const response = await Api.GetKecamatanDesa(localStorage.getItem('token'), idKecamatan)
        setDataDesa(response.data.data)
        console.log('dataDesa', response)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getMasyarakat()
      setRefresh(false)
    }, [refresh])

    useEffect(() => {
      getRelawan()
      getKecamatan()
    }, [modalCreateResponden, modalEditResponden])


    useEffect(() => {
      getDesa()
    }, [idKecamatan, kecamatan])

    return (
      <div className='min-h-screen '>
      <Modal
        activeModal={modalEditResponden}
        title={'Edit Relawan'}
        buttonClose={ () => setModalEditResponden(!modalEditResponden)}
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
              <div className='flex items-center gap-2'>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Relawan<span className='text-red-600'>*</span></label>
                    <select onChange={(e) => setIdRelawan(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option selected value="">Pilih Relawan...</option>
                          {Object.values(dataRelawan).map((item, idx) => (
                            <option key={idx} value={item.id}>{item.fullname}</option>
                            ))}
                    </select>
                </div>
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
              <div className='flex items-center gap-3'>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tempat Lahir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTempatLahir(e.target.value)} value={tempatLahir} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tempat Lahir...' />
                </div>

                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tanggal Lahir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTanggalLahir(e.target.value)} value={tanggalLahir} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tanggal Lahir...' />
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
                    <select onChange={handleSelectDesa} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option selected value="">Pilih Desa...</option>
                          {Object.values(dataDesa).map((item, idx) => (
                            <option key={idx} value={item.id}>{item.name}</option>
                            ))}
                    </select>
                </div>
              </div>

              <div className='flex items-center justify-end gap-3'>
                <button onClick={() => {setModalEditResponden(!modalEditResponden); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                <button onClick={updateMasyarakat} className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
              </div>
            </div>
          </div>
      }/>
      <Modal
        activeModal={modalCreateResponden}
        title={'Tambahkan Relawan'}
        buttonClose={ () => setModalCreateResponden(!modalCreateResponden)}
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
              <div className='flex items-center gap-2'>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Relawan<span className='text-red-600'>*</span></label>
                    <select onChange={(e) => setIdRelawan(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option selected value="">Pilih Relawan...</option>
                          {Object.values(dataRelawan).map((item, idx) => (
                            <option key={idx} value={item.id}>{item.fullname}</option>
                            ))}
                    </select>
                </div>
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
              <div className='flex items-center gap-3'>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tempat Lahir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTempatLahir(e.target.value)} value={tempatLahir} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tempat Lahir...' />
                </div>

                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tanggal Lahir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTanggalLahir(e.target.value)} value={tanggalLahir} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tanggal Lahir...' />
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
                    <select onChange={handleSelectDesa} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 "> 
                          <option selected value="">Pilih Desa...</option>
                          {Object.values(dataDesa).map((item, idx) => (
                            <option key={idx} value={item.id}>{item.name}</option>
                            ))}
                    </select>
                </div>
              </div>

              <div className='flex items-center justify-end gap-3'>
                <button onClick={() => {setModalCreateResponden(!modalCreateResponden); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                <button onClick={createMasyarakat} className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
              </div>
            </div>
          </div>
      }/>
      <ModalDelete
        activeModal={modalDeleteResponden}
        buttonClose={() => modalDeleteResponden(!modalDeleteResponden)}
        submitButton={deleteMasyarakat}
    />
        <div className='flex bg-[#F8F8F8]'>
          <Sidebar />
          <div className='w-full overflow-hidden'>
            <Navbar />

            <div className='flex items-center justify-between mb-[40px] px-[40px]'>
              <div className='font-medium space-y-[8px] '>
                <h1 className="text-black text-2xl">Responden</h1>
                <h1 className="text-gray-400 text-base">List of Responden</h1>
              </div>
              <div className='flex items-center justify-end gap-2'>
                <div className='relative'>
                    <AiOutlineSearch className='absolute left-[14px] top-[10px] text-[#A8A8A8] text-lg'/>
                    <input placeholder='Cari Nama atau Nomor Telepon ...' onChange={handleSearch} className='text-[#A8A8A8] text-xs font-[500] pl-12 border rounded-[12px] py-2 w-full lg:w-[300px] outline-none'/>
                </div>
                <AddButton bgColor={'blue-700'} title={'Responden'} triggerModal={() => setModalCreateResponden(!modalCreateResponden)}/>
              </div>
            </div>

            <div>
              <div class="flex flex-col">
                  <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                      <div class="overflow-hidden rounded-xl ">
                        <table class="min-w-full ">
                          <thead class="bg-white border-b ">
                            <tr>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                No.
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Nama
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Tempat, Tanggal Lahir
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Kecamatan
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Desa / Kelurahan
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Telepon
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Email
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Relawan
                              </th>
                              <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                                Action
                              </th>
                            </tr>
                          </thead>
                          {dataMasyarakat === 'tidak ada masyarakat' ? (
                            <div className='flex items-center justify-start mt-9'>(Tidak ada masyarakat)</div>
                          ) : (
                            <tbody>
                              {Object.values(dataMasyarakat).map((item, idx) => (
                                <tr key={idx} class="bg-gray-100 border-b">
                                  <td class="px-1.5 border py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">1</td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.fullname}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.placeBirth}, {item.dateBirth}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.kecamatan?? '-'}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.desa?? '-'}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.phone}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    {item.email}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    Diptya Bagus
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                                    <div className='flex items-center justify-center gap-2 text-xl'>
                                      <button onClick={() => deleteModal(item.id)} className='p-2 bg-red-700 rounded-md text-white'>
                                        <AiFillDelete/>
                                      </button>
                                      <button onClick={() => openEditMasyarakat(item.id)} className='p-2 bg-blue-700 rounded-md text-white'>
                                        <AiFillEdit/>
                                      </button>
                                      <button className='p-2 bg-indigo-700 rounded-md text-white'>
                                        <AiFillEye/>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Responden
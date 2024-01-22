import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import Api from '../Api'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
import AddButton from '../components/AddButton'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '../components/ModalDelete'

const KuesionerType = () => {
    const [modalFormAddType, setModalFormAddType] = useState('')
    const [modalFormEditType, setModalFormEditType] = useState('')
    const [showDetailTypeForm, setShowDetailTypeForm] = useState('')
    const [detailTypeForm, setDetailTypeForm] = useState('')
    const [detailQuestion, setDetailQuestion] = useState('')
    const [kuesionerType, setKuesionerType] = useState('')
    const [typeForm, setTypeForm] = useState('')
    const [typeAnswer, setTypeAnswer] = useState('')
    const [dataTypeForm, setDataTypeForm] = useState('')
    const [typeFormId, setTypeFormId] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [nameForm, setNameForm] = useState('')
    const [idKuesionerType, setIdKuesionerType] = useState('')
    const [answerType, setAnswerType] = useState('')

    const navigate = useNavigate()

    const createTypeForm = async () => {
        try {
          const data = {
            name: typeForm,
            typeAnswer: typeAnswer
          }
          const response = await Api.CreateTypeForm(localStorage.getItem('token'), data)
          toast.success('Sukses Create Tipe Formulir!')
          console.log(response)
          setRefresh(true)
          resetForm()
          setModalFormAddType(!modalFormAddType)
        } catch (error) {
          console.log(error)
        }
      }

      const editTypeForm = async () => {
        try {
            const data = {
                name: typeForm,
                typeAnswer: typeAnswer
            }
            const response = await Api.UpdateTypeForm(localStorage.getItem('token'), data, typeFormId)
            setRefresh(true)
            toast.success('Sukses Update Tipe Formulir!')
            resetForm()
            setModalFormEditType(!modalFormEditType)
        } catch (error) {
            console.log(error)
        }
      }
    
      const getTypeForm = async () => {
        try {
          const response = await Api.GetTypeForm(localStorage.getItem('token'))
          console.log(response, 'typeForm')
          setDataTypeForm(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }

      const openDetail = async (id) => {
        setShowDetailTypeForm(!showDetailTypeForm)
        try {
          const response = await Api.GetTypeFormById(localStorage.getItem('token'), id)
          setDetailTypeForm(response.data.data)
          setDetailQuestion(response.data.data.question)
        } catch (error) {
          console.log(error)
        }  
      }

      const openEditTypeForm = async (id) => {
        setTypeFormId(id)
        setModalFormEditType(!modalFormEditType)
        try {
            const response = await Api.GetTypeFormById(localStorage.getItem('token'), id)
            setTypeForm(response.data.data.name)
            setTypeAnswer(response.data.data.typeAnswer)
        } catch (error) {
            console.log(error)
        }
      }

      const resetForm = () => {
        setTypeForm('')
        setTypeAnswer('')
      }

      const [showModalDelete, setShowModalDelete] = useState()

      const deleteRelawan = async () => {
          try {
            const resposne = await Api.DeleteTypeForm(localStorage.getItem('token'), idKuesionerType)
            toast.success('Success Delete')
            setShowModalDelete(!showModalDelete)
            setRefresh(true)
          } catch (error) {
            console.log(error)
            toast.error(error.response.message)
          }
        }
      const deleteFileModal = (id) => {
          setShowModalDelete(!showModalDelete)
          setIdKuesionerType(id)
          setRefresh(true)
        }

      useEffect(() => {
        getTypeForm()
        setRefresh(false)
      }, [refresh])

    return (
        <div className='min-h-screen '>
        <Modal
            activeModal={modalFormAddType}
            title={'Tambahkan Tipe Formulir'}
            buttonClose={ () => setModalFormAddType(!modalFormAddType)}
            width={'600px'}
            content={
            <div className='space-y-[40px] w-full'> 
            <div className="space-y-4 md:space-y-6">
                
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tipe Formulir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTypeForm(e.target.value)} value={typeForm} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
                </div>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tipe Jawaban<span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTypeAnswer(e.target.value)} value={typeAnswer} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tipe Jawaban...' />
                </div>

                <div className='flex items-center justify-end gap-3'>
                    <button onClick={() => {setModalFormAddType(!modalFormAddType); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                    <button onClick={createTypeForm} className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
                </div>
            </div>
            </div>
        }/>
        <Modal
            activeModal={modalFormEditType}
            title={'Edit Tipe Formulir'}
            buttonClose={ () => setModalFormEditType(!modalFormEditType)}
            width={'600px'}
            content={
            <div className='space-y-[40px] w-full'> 
            <div className="space-y-4 md:space-y-6">
                
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tipe Formulir <span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTypeForm(e.target.value)} value={typeForm} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Nama...' />
                </div>
                <div className='w-full'>
                    <label className="mb-2 text-xs font-medium text-gray-900">Tipe Jawaban<span className='text-red-600'>*</span></label>
                    <input onChange={(e) => setTypeAnswer(e.target.value)} value={typeAnswer} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg  w-full p-2.5 " placeholder='Tipe Jawaban...' />
                </div>

                <div className='flex items-center justify-end gap-3'>
                    <button onClick={() => {setModalFormEditType(!modalFormEditType); resetForm()}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                    <button onClick={editTypeForm} className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
                </div>
            </div>
            </div>
        }/>
        <ModalDelete
        activeModal={showModalDelete}
        buttonClose={() => setShowModalDelete(!showModalDelete)}
        submitButton={deleteRelawan}
        />
        <Modal
            activeModal={showDetailTypeForm}
            title={'Detail Formulir Type'}
            buttonClose={ () => setShowDetailTypeForm(!showDetailTypeForm)}
            width={'600px'}
            content={
            <div className='space-y-[40px] w-full'> 
                <div className="space-y-4 md:space-y-6">
                    <div className='flex items-center justify-start gap-2 text-sm'>
                        <h1 className='font-medium'>Nama Formulir: </h1>
                        <h1>{detailTypeForm.name}</h1>
                    </div>
                    <div className='flex items-center justify-start gap-2 text-sm'>
                        <h1 className='font-medium'>Tipe Jawaban Formulir: </h1>
                        <h1>{detailTypeForm.typeAnswer}</h1>
                    </div>
                    <h1 className='text-sm font-medium'>List Pertanyaan:</h1>
                    <div className='text-sm space-y-2 ml-2'>
                        {detailQuestion && detailQuestion.length > 0 ? (
                            detailQuestion.map((item, idx) => (
                            <h1 key={idx + 1}>{idx + 1}. {item.question}</h1>
                            ))
                        ) : (
                            <h1 className='flex items-center justify-center'>Tidak ada pertanyaan</h1>
                        )}
                    </div>
                </div>
            </div>
        }/>

        <div className='flex bg-[#F8F8F8]'>
            <Sidebar />
            <div className='w-full overflow-hidden'>
            <Navbar />

            <div className='flex items-end justify-between mb-[40px] px-[40px]'>

                <div className='font-medium space-y-[8px] '>
                <h1 className="text-black text-2xl">Formulir Type</h1>
                <h1 className="text-gray-400 text-base">List of Formulir Type</h1>
                </div>

                <AddButton triggerModal={()=> setModalFormAddType(!modalFormAddType)} bgColor={'blue-700'} title={'Form Type'}/>

            </div>

            <div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden rounded-xl">
                        <table class="min-w-full">
                            <thead class="bg-white border-b ">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                                No.
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                                Form Type
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                                Id Form Type
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                                Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {Object.values(dataTypeForm).map((item, idx) => (
                                    <tr class="bg-gray-100 border-b">
                                        <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{idx + 1}</td>
                                        <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap text-center">{item.name}</td>
                                        <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap text-center">{item.id}</td>
                                        <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap text-center">
                                        <div className='flex items-center justify-center gap-2 text-xl'>
                                            <button onClick={() => navigate('/kuesioner', {state: {formTypeId: item.id}})} className='p-2 bg-blue-700 rounded-md text-white'>
                                            <h1 className='text-xs font-semibold'>Edit Kuesioner</h1>
                                            </button>
                                            <button onClick={() => openDetail(item.id)} className='p-2 bg-indigo-700 rounded-md text-white'>
                                            <h1 className='text-xs font-semibold'>Detail</h1>
                                            </button>
                                            <button onClick={() => {openEditTypeForm(item.id)}} className='p-1.5 bg-gray-500 rounded-lg text-white'>
                                            <AiFillEdit/>
                                            </button>
                                            <button onClick={() => deleteFileModal(item.id)} className='p-1.5 bg-red-700 rounded-md text-white'>
                                            <AiFillDelete/>
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
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

export default KuesionerType
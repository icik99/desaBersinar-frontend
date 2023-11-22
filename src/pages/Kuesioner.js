import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddButton from '../components/AddButton'
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io'
import Api from '../Api'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import CheckboxRepeater from '../components/CheckboxRepeater'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'

const Kuesioner = () => {
  const [modalFormAddType, setModalFormAddType] = useState('')
  const [dataKuesionerType, setDataKuesionerType] = useState('')
  const [typeForm, setTypeForm] = useState('')
  const [typeFormId, setTypeFormId] = useState('')

  //Repeater Question
  const [questions, setQuestions] = useState(['']);
  console.log(questions, 'questions')

  const handleInputChangeQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const [descriptions, setDescriptions] = useState(['']);
  
  
  //Repeater Question
  console.log(descriptions, 'desc')

  const handleInputChangeDescription = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleDeleteDescription = (index) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions.splice(index, 1);
    setDescriptions(updatedDescriptions);
  };

  const getTypeForm = async () => {
    try {
      const response = await Api.GetTypeForm(localStorage.getItem('token'))
      console.log(response, 'typeForm')
      setDataKuesionerType(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createFormulir = async() => {
    try {
      const data ={
        question: questions,
        description: descriptions,
        typeFormulirId: typeFormId
      }
      console.log(data, 'sendedData')
      const response = await Api.CreateForm(localStorage.getItem('token'), data)
      toast.success('Sukses Create Form')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getTypeForm()
  }, [])

  return (
    <div className='min-h-screen pb-10 '>
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

            <div className='flex items-center justify-end gap-3'>
              <button onClick={() => {setModalFormAddType(!modalFormAddType)}} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
              <button className=" text-white bg-primary-600  font-medium rounded-lg text-sm px-7 py-2.5 text-center ">Save</button>
            </div>
          </div>
        </div>
      }/>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar />
          <div className='px-[40px] space-y-[40px]'>
              <div className='flex items-end justify-between'>
                <div className='font-medium space-y-[8px] '>
                  <h1 className="text-black text-2xl">Kuesioner</h1>
                  <h1 className="text-gray-400 text-base">List of Kuesioner</h1>
                </div>
                <div className='flex gap-3'>
                  <Link to={'/kuesionerType'}>
                    <AddButton bgColor={'blue-700'} title={'Form Type'}/>
                  </Link>
                  <AddButton bgColor={'blue-700'} title={'Kuesioner'}/>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='relative w-1/2'>
                    <select onChange={(e) => setTypeFormId(e.target.value)} className='text-xs rounded-md border border-gray-300 outline-none text-gray-500 w-full py-[10px] px-[19px] appearance-none'>
                        <option value="">Select Kuesioner...</option>
                        {Object.values(dataKuesionerType).map((item,idx) => (
                          <option key={idx} value={item.id}>{item.name}</option>

                        ))}
                    </select>
                    <IoMdArrowDropdown className='absolute top-[9px] right-1 text-xl text-[#6B7280]'/>
                </div>
              </div>

          <div>
            <div className='flex items-center justify-end mb-2'>
            </div>
            {questions.map((question, index) => (
              <div key={index} className='py-[12px] px-[11px] border rounded-lg shadow-sm mb-3'>
                <h1 className="text-zinc-800 text-xs font-medium mb-[16px]">{`Question ${index + 1}`}</h1>
                <div>
                  <div className="flex gap-[15px] mb-[12px]">
                    <div className='w-full space-y-2'>
                      <input
                        type="text"
                        className='bg-white rounded-md border border-gray-300 py-[10px] px-[19px] outline-none text-xs w-full'
                        placeholder='Input Question'
                        value={question}
                        onChange={(e) => handleInputChangeQuestion(index, e.target.value)}
                      />
                      <input
                        type="text"
                        className='bg-white rounded-md border border-gray-300 py-[10px] px-[19px] outline-none text-xs w-full'
                        placeholder='Input Description'
                        onChange={(e) => handleInputChangeDescription(index, e.target.value)}
                      />
                    </div>
                    <button className='rounded bg-red-500 text-white p-2 font-bold text-lg' onClick={() => {handleDeleteQuestion(index); handleDeleteDescription(index)}} ><AiFillDelete /></button>
                    <button className='rounded bg-primary-500 text-white p-2 text-lg' onClick={handleAddQuestion}><AiOutlinePlus/></button>

                  </div>
                </div>
              </div>
            ))}
            <div className='flex gap-2 items-center justify-start'>
              <button className='rounded bg-primary-700 text-white p-2 text-md' onClick={createFormulir}>Submit</button>
            </div>
          </div>

          </div>
        </div>
      </div>
      {/* {questions.map((qna, index) => (
        <div key={index}>
          <input
            type="text"
            name="question"
            value={qna.question}
            placeholder="Pertanyaan"
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="answer"
            value={qna.answer}
            placeholder="Jawaban"
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Tambah Pertanyaan dan Jawaban</button> */}
    </div>
  )
}

export default Kuesioner
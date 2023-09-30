import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const AddButton = ({title, triggerModal}) => {
  return (
    <button onClick={triggerModal} className='py-2 px-3 gap-2 flex items-center border rounded-md bg-blue-700 text-sm text-white font-medium'>
        <AiOutlinePlus className='font-bold'/>
        <h1>Add {title}</h1>
    </button>
  )
}

export default AddButton
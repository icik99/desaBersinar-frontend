import React from 'react'
import { IoClose } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

const ModalDelete = ({activeModal, buttonClose, submitButton}) => {

    return (
        <div className={`${activeModal ? 'translate-y-0' : '-translate-y-[2000px]'} transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50`}>
            <div className='h-screen w-screen bg-black backdrop-blur-sm bg-opacity-50 overflow-hidden flex items-center justify-center p-10'>
                <div className={`max-h-[700px] overflow-auto shadow-lg bg-white rounded-[12px] px-[41px] py-[37px] scrollbar-hide w-[500px]`}>
                    <div className='flex items-center justify-end'>
                        <button onClick={buttonClose}>
                            <IoClose/>
                        </button>
                    </div>
                    <div className='mt-6 flex flex-col justify-center items-center gap-5'>
                        <RxCrossCircled className='text-[120px] text-[#C1121F]'/>
                        <h1 className='text-center'>Do you really want to delete these records? This process cannot be undone.</h1>
                        <div className='flex item-center justify-center gap-3 mt-5'>
                            <button onClick={buttonClose} className='bg-[#ECECEC] text-[#015995] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={submitButton} className='bg-[#015995] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete
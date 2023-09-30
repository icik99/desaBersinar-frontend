import React from 'react'
import { IoClose } from 'react-icons/io5'

const Modal = ({activeModal, title, buttonClose, width, content}) => {

    return (
        <div className={`${activeModal ? 'translate-y-0' : '-translate-y-[2000px]'} transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50`}>
            <div className='h-screen w-screen bg-black backdrop-blur-sm bg-opacity-50 overflow-hidden flex items-center justify-center p-10'>
                <div className={`max-h-[700px] overflow-auto shadow-lg bg-white rounded-[12px] px-[41px] py-[37px] scrollbar-hide`} style={{ width: width }}>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black font-[500]'>{title}</h1>
                        <button onClick={buttonClose}>
                            <IoClose/>
                        </button>
                    </div>
                    <div className='mt-6'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { MapContainer, TileLayer } from 'react-leaflet'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'

const DaerahRawanNarkoba = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar Judul={'Peta Rawan Narkoba'} SubJudul={'Peta Rawan Narkoba Kabupaten Banyumas'} />
          <div className='px-[40px]'>
            <div className='w-full h-[381] rounded-lg border-2 shadow-md'>
              <MapContainer center={[-7.442715737441341, 109.17473342231702]} zoom={13}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
            <h1>Redotest</h1>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DaerahRawanNarkoba
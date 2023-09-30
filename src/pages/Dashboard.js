import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GrUserAdmin } from 'react-icons/gr';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Logo_BNN } from '../assets';

function Dashboard() {

  const customIcon = L.icon({
    iconUrl: Logo_BNN,
    iconSize: [32, 32]
});

  return (
    <div className='min-h-screen'>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar Judul={'Dashboard'} SubJudul={''} />
          <div className='px-[40px]'>
              <div className='flex gap-[40px] items-start mb-10'>
                  <div className='py-[40px] px-[30px] bg-white w-full'>
                      <div className='flex items-center justify-between  mb-2'>
                        <h1 className='text-[22px] font-medium'>Responden</h1>
                        <h1 className='text-red-500 text-[22px] font-medium'>29</h1>
                      </div>
                      <p className='w-[280px] opacity-40 text-black text-sm font-normal'>Terdapat 29 responden yang telah merespon kuesioner.</p>
                  </div>
                  <div className='py-[40px] px-[30px] bg-white w-full'>
                      <div className='flex items-center justify-between  mb-2'>
                        <h1 className='text-[22px] font-medium'>Kuesioner</h1>
                        <h1 className='text-red-500 text-[22px] font-medium'>29</h1>
                      </div>
                      <p className='w-[280px] opacity-40 text-black text-sm font-normal'>Sudah ada 29 kuesioner yang telah disiapkan.</p>
                  </div>
                  <div className='py-[40px] px-[30px] bg-white w-full'>
                      <div className='flex items-center justify-between  mb-2'>
                        <h1 className='text-[22px] font-medium'>Relawan</h1>
                        <h1 className='text-red-500 text-[22px] font-medium'>29</h1>
                      </div>
                      <p className='w-[280px] opacity-40 text-black text-sm font-normal'>Jumlah relawan saat ini mencapai 29 orang.</p>
                  </div>
              </div>
              <div className='bg-white py-[20px] px-[30px] space-y-3'>
                <h1 className=''>Lokasi Rawan Narkoba di Kabupaten Banyumas</h1>
                <div className='rounded-xl overflow-hidden shadow-lg border-gray-400 border'>
                  <MapContainer center={[-7.424451664797593, 109.23011867976774]} zoom={14} style={{ height: '400px', width: '100%', zIndex: '10'}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Desa Bersinar BNN Using Leaflet"
                    />
                    <Marker position={[-7.424451664797593, 109.23011867976774]} icon={customIcon}>
                      <Popup>Ini Purwokerto</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
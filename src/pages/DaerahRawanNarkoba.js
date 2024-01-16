import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import 'leaflet/dist/leaflet.css';
import Api from '../Api'
import { Logo_BNN } from '../assets'
import { resolvePath, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const DaerahRawanNarkoba = () => {

  const [modalDetail, setModalDetail] = useState(false)
  const [dataBatasDesa, setDataBatasDesa] = useState()
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState('');
  const [dataDetailIndikator, setDataDetailIndikator] = useState('')
  const navigate = useNavigate()

  const customIcon = L.icon({
    iconUrl: Logo_BNN,
    iconSize: [16, 16]
  });

  const getBatasDesa = async () => {
    try {
      const response = await Api.GetBatasArea(localStorage.getItem('token'))
      setDataBatasDesa(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getDetailIndikator = async (id) => {
    try {
      const response = await Api.GetDetailIndikator(localStorage.getItem('token'), id)
      setDataDetailIndikator(response.data.data[0])
      console.log(response.data.data[0], 'detailIndikator')
    } catch (error) {
      console.log(error)
    }
  }

  const openDetailIndikator = async (id) => {
    setModalDetail(!modalDetail)
    try {
      const response = await Api.GetDetailIndikator(localStorage.getItem('token'), id)
      setDataDetailIndikator(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  function calculateCenterCoordinate(coordinates) {
    // Logika untuk menghitung koordinat tengah dari suatu daerah
    // Misalnya, dengan menghitung rata-rata koordinat
    const totalPoints = coordinates.length;
    const sumLat = coordinates.reduce((sum, coord) => sum + coord[0], 0);
    const sumLng = coordinates.reduce((sum, coord) => sum + coord[1], 0);
  
    return [sumLat / totalPoints, sumLng / totalPoints];
  }


  useEffect(() => {
    getBatasDesa()
  }, [])

  if (!dataBatasDesa) {
    return(
      <h1 className='h-screen flex items-center justify-center text-2xl'>Memuat data peta....</h1>
    )
  }

  return (
    <div className='min-h-screen'>
      <Modal
      activeModal={modalDetail}
      title={'Detail Data Relawan'}
      buttonClose={ () => setModalDetail(!modalDetail)}
      width={'600px'}
      content={
        <div className='space-y-[40px] w-full'> 
          <div className="space-y-4 md:space-y-6 ">
            <div className='flex items-start gap-5'>

              <div className='grid grid-cols-10 w-full'>
                <div className='flex flex-col col-span-3 w-full'>
                    <h1 className='border-b-2 py-1 text-sm'>Nama</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Alamat</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Pekerjaan</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Email</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Telepon</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Kasus Kejahatan Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Kasus Kriminalitas</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Bandar Pengedar Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Produksi Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Pengguna Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Barang Bukti Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Entry Point Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Kurir Narkoba</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Jumlah Lokasi Hiburan</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Hunian Privasi Tinggi</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Angka Prevalensi</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Sarana Publik Kurang Memadai</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Rendah Interaki Sosial Masyarakat</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Dirasakan Masyarakat</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Keberlanjutan Program</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Pelaksana Program</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Pelaksanaan Program</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Sinergi Pemerintah</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Kemitraan Usaha</h1>
                    <h1 className='border-b-2 py-1 text-sm'>Dampak Masyarakat</h1>
                </div>
                <div className='flex flex-col col-span-7 w-full'>
                  <h1 className='border-b-2 py-1 text-sm'>data</h1>
                  <h1 className='border-b-2 py-1 text-sm'>data</h1>
                  <h1 className='border-b-2 py-1 text-sm'>data</h1>
                  <h1 className='border-b-2 py-1 text-sm'>data</h1>
                  <h1 className='border-b-2 py-1 text-sm'>data</h1>
                </div>
              </div>

              <img className='w-[100px] h-[100px] rounded-lg border-2' src="https://i.pravatar.cc/200" alt="profile" />

            </div>
            <div className='flex items-center justify-end gap-3'>
              <button onClick={() => setModalDetail(!modalDetail)} className=" text-primary-600 border bg-gray-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Close</button>
            </div>

          </div>
        </div>   
    }/>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar Judul={'Peta Rawan Narkoba'} SubJudul={'Peta Rawan Narkoba Kabupaten Banyumas'} />
          <div className='px-[40px]'>
            <div className='w-full h-1/3 rounded-lg border-2 shadow-md'>
              <MapContainer center={[-7.454701519566872, 109.17318016583107]} zoom={12}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* {loading && <p>Loading...</p>} */}
                {
                  Object.values(dataBatasDesa).map((item, idx) => {
                  const koordinat = item.batas_area[0].map((data) => [data[1], data[0]])  
                  const centerCoordinate = calculateCenterCoordinate(koordinat);
                  const fillcolor = item.status === 'Aman'? 'green': item.status === 'Siaga' ? 'Yellow' : 'red'
                  // console.log(koordinat, 'koordinat');
                  return(
                    <div key={idx}>
                      <Polygon 
                        positions={koordinat}
                        pathOptions={{
                          fillColor: fillcolor,
                          fillOpacity: 0.7,
                          weight: 2,
                          opacity: 1,
                          dashArray: 1,
                          color: 'white'
                        }}
                        eventHandlers={{
                          mouseover: (e) => {
                            const layer = e.target
                            layer.setStyle({
                              fillOpacity: 0.7,
                              weight: 2,
                              dashArray: "",
                              color: 'black'
                            })
                          },
                          mouseout: (e) => {
                            const layer = e.target
                            layer.setStyle({
                              fillOpacity: 0.7,
                              weight: 2,
                              dashArray: "3",
                              color: 'white',
                              fillcolor: fillcolor
                            })
                          },
                          click: () => {
                            setPopupData(item);
                            setPopupOpen(!popupOpen);
                          },
                        }}
                      />
                    </div>
                  )
                })}
                 {popupOpen && (
                    <Popup position={calculateCenterCoordinate(popupData.batas_area[0].map((data) => [data[1], data[0]]))}>
                      <div style={{ fontWeight: 'bold' }}>
                        <p style={{ textAlign: 'center' }}>Informasi daerah</p>
                        <p>Kecamatan: <span style={{ fontWeight: 'normal' }}>{popupData.name_kecamatan}</span></p>
                        <p>Desa: <span style={{ fontWeight: 'normal' }}>{popupData.name}</span></p>
                        <p>Status: <span style={{ fontWeight: 'normal' }}>{popupData.status}</span></p>
                        <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/daerah-rawan-narkoba/detail-daerah', {state: {idDesaKecamatan: popupData.id}})}>
                          Lihat Detail
                        </p>
                      </div>
                    </Popup>
                  )}
              </MapContainer>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DaerahRawanNarkoba
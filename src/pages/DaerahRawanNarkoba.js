import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import 'leaflet/dist/leaflet.css';
import Api from '../Api'
import { Logo_BNN } from '../assets'
import moment from 'moment/moment';

const DaerahRawanNarkoba = () => {

  const [dataBatasDesa, setDataBatasDesa] = useState()

  const customIcon = L.icon({
    iconUrl: Logo_BNN,
    iconSize: [16, 16]
});

  const getBatasDesa = async () => {
    try {
      const response = await Api.GetIndikator(localStorage.getItem('token'))
      setDataBatasDesa(response.data.data)
      console.log(response.data.data)
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
                
                {Object.values(dataBatasDesa).map((item, idx) => {
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
                          click: (e) => {
                            const layer = e.target
                            layer.bindPopup(
                              `<div style="font-weight: bold">
                                <p style="text-align: center">Informasi daerah</p>
                                <p>Kecamatan: <span style="font-weight:normal" >${item.name_kecamatan}</span></p>
                                <p>Desa: <span style="font-weight:normal" >${item.name}</span></p>
                                <p>Status: <span style="font-weight:normal" >${item.status}</span></p>
                                <p>Terakhir di update: <span style="text-decoration: underline; ">${moment(item.indikator.updatedAt).format('DD MMMM YYYY')}</span></p>
                                <p style="text-decoration: underline; color: blue;" >Lihat Detail</p>
                              </div>`
                            ).openPopup();
                          }
                        }}
                      />

                  {/* <Marker position={centerCoordinate} icon={customIcon}>
                      <Popup>
                        <div>
                          <p>Informasi daerah</p>
                          <p>Nama Desa: {item.name}</p>
                          <p>Status: {item.status}</p>
                        </div>
                      </Popup>
                  </Marker> */}
                    </div>
                  )
                })}
              </MapContainer>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DaerahRawanNarkoba
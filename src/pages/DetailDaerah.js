import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'
import Api from '../Api'
import { Secret } from '../assets'

const DetailDaerah = () => {
    const params = useLocation()
    const [dataDetailIndikator, setDataDetailIndikator] = useState('')
    const [desaKecamatan, setDesaKecamatan] = useState('')

    const getDetailIndikator = async () => {
        try {
          const response = await Api.GetDetailIndikator(localStorage.getItem('token'), params.state.idDesaKecamatan)
          console.log(response, 'detailIndikator')
          setDataDetailIndikator(response.data.data[0])
          setDesaKecamatan(response.data.data[0].desa_kecamatan)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getDetailIndikator()
    }, [])

  return (
    <div className='min-h-screen '>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar />

          <div className='flex items-end justify-between mb-[40px] px-[40px]'>
            <div className='font-medium space-y-[4px] '>
              <h1 className="text-black text-2xl">Detail Daerah</h1>
              <h1 className="text-gray-400 text-base">Kecamatan: {desaKecamatan.name_kecamatan? desaKecamatan.name_kecamatan : "-"}</h1>
              <h1 className="text-gray-400 text-base">Kelurahan / Desa: {desaKecamatan.name? desaKecamatan.name : "-"}</h1>
            </div>
          </div>

          <div className='space-y-[40px] w-full px-12 pb-12'> 
          <div className="space-y-4 md:space-y-6 ">
            <div className='absolute bg-[#F8F8F8] flex justify-center'>
              <img src={Secret} className='z-10 h-[800px]'/>
            </div>
            <div className='flex items-start gap-5'>

              <div className='grid grid-cols-12 w-full'>
                <div className='flex flex-col col-span-6 w-full'>
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
                <div className='flex flex-col col-span-6 w-full text-red-700 font-medium'>
                <h1 className='border-b-2 py-1 text-sm text-black'>{dataDetailIndikator? dataDetailIndikator.fullname : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm text-black'>{dataDetailIndikator? dataDetailIndikator.address : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm text-black'>{dataDetailIndikator? dataDetailIndikator.pekerjaan : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm text-black'>{dataDetailIndikator? dataDetailIndikator.email : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm text-black'>{dataDetailIndikator? dataDetailIndikator.phone : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.kasus_kejahatan_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.kasus_kriminalitas : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.bandar_pengedar_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.produksi_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.pengguna_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.barang_bukti_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.entry_point_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.kurir_narkoba : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.jumlah_lokasi_hiburan : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.hunian_privasi_tinggi : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.angka_prevalensi : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.sarana_publik_kurang_memadai : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.rendahnya_interaksi_sosial_masyarakat : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.dirasakan_masyarakat : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.keberlanjutan_program : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.pelaksana_program : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.pelaksanaan_program : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.sinergi_pemerintah : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.kemitraan_usaha : '-'}</h1>
                <h1 className='border-b-2 py-1 text-sm'>{dataDetailIndikator? dataDetailIndikator.dampak_masyarakat : '-'}</h1>


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

export default DetailDaerah
import React from 'react'

function LaporForm() {
  return (
    <div className='px-10'>
        <h1 className='text-center text-2xl font-bold mb-10'>Formulir Lapor Relawan</h1>
        <p className='mb-3'>Dukung Gerakan Desa Bersinar BNN Kab. Banyumas dengan <span className='font-medium'>melaporkan penyalahgunaan narkotika!</span></p>
        <p className='mb-10'>Untuk bisa menindak lanjuti laporan anda, kami perlu informasi lebih lengkap. Mohon mengisi data-data yang akurat sesuai yang diperlukan. <span className='font-medium'>Data yang Anda kirimkan akan kami rahasiakan sepenuhnya.</span></p>

        <h2 className='mb-6 font-medium text-xl'>Identitas Pelapor</h2>
        <div className="mb-6">
            <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pelapor</label>
            <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama lengkap" required/>
        </div> 
        <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Pelapor (jika ada)</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required/>
        </div> 
        <div className="mb-6">
            <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon Pelapor</label>
            <input type="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="08xxxxxxxx" required/>
        </div> 
        <div className="mb-6"> 
            
            <h1 for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Pelapor</h1>
            <label for="kabupaten" class="block mb-1 text-sm font text-gray-900 dark:text-white">Kabupaten</label>
            <select id="kabupaten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
            <option selected>Pilih Kabupaten</option>
            <option value="kab">Kabupaten Banyumas</option>
            </select>

            <label for="kecamatan" class="block mb-1 text-sm font text-gray-900 dark:text-white">Kecamatan</label>
            <select id="kecamatan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
            <option selected>Pilih Kecamatan</option>
            <option value="kec1">Kecamatan Purwokerto Selatan</option>
            <option value="kec2">Kecamatan Purwokerto Utara</option>
            <option value="kec3">Kecamatan Sokaraja</option>
            </select>
            
            <label for="desa" class="block mb-1 text-sm font text-gray-900 dark:text-white">Desa</label>
            <select id="kabupaten" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
            <option selected>Pilih Desa</option>
            <option value="desa1">Kedung Banteng</option>
            <option value="desa2">Karang Lewas</option>
            </select>

            <label for="alamat" class="block mb-2 text-sm font text-gray-900 dark:text-white">Alamat Detail Pelapor</label>
            <textarea id="alamat" rows="4" class="block p-2.5 w-full lg:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder="Jl. Jenderal Sudirman, Kec. Purwokerto Selatan, Kab. Banyumas"></textarea>
        </div> 
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
  )
}

export default LaporForm
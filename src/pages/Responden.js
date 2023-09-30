import React from 'react'
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import AddButton from '../components/AddButton'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Responden = () => {
  return (
    <div className='min-h-screen '>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar />

          <div className='flex items-center justify-between mb-[40px] px-[40px]'>
            <div className='font-medium space-y-[8px] '>
              <h1 className="text-black text-2xl">Responden</h1>
              <h1 className="text-gray-400 text-base">List of Responden</h1>
            </div>
            <AddButton title={'Responden'}/>
          </div>

          <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden rounded-xl">
                      <table class="min-w-full">
                        <thead class="bg-white border-b ">
                          <tr>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              No.
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Nama
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Tempat, Tanggal Lahir
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Kecamatan
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Desa / Kelurahan
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Telepon
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Email
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Relawan
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-1.5 border py-4 text-center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-gray-100 border-b">
                            <td class="px-1.5 border py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">1</td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              Muh Rizieq Fazlulrahman Djafar
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              Palu, 9 September 2002
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              Purwokerto Selatan
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              Berkoh
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              08123456789
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              riziq@mail.com
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              Diptya Bagus
                            </td>
                            <td class="text-sm text-gray-900 font-light px-1.5 border py-4 whitespace-nowrap text-center">
                              <div className='flex items-center justify-center gap-2 text-xl'>
                                <button className='p-2 bg-red-700 rounded-md text-white'>
                                  <AiFillDelete/>
                                </button>
                                <button className='p-2 bg-blue-700 rounded-md text-white'>
                                  <AiFillEdit/>
                                </button>
                                <button className='p-2 bg-indigo-700 rounded-md text-white'>
                                  <AiFillEye/>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default Responden
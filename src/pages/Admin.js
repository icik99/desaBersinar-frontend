import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const Admin = () => {
  return (
    <div className='min-h-screen '>
      <div className='flex bg-[#F8F8F8]'>
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <Navbar />

          <div className='flex items-end justify-between mb-[40px] px-[40px]'>

            <div className='font-medium space-y-[8px] '>
              <h1 className="text-black text-2xl">Admin</h1>
              <h1 className="text-gray-400 text-base">List of Admin</h1>
            </div>


          </div>

          <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden rounded-xl">
                      <table class="min-w-full">
                        <thead class="bg-white border-b ">
                          <tr>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                              No.
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                              Username
                            </th>
                            <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-4 text-center">
                              Password
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-gray-100 border-b">
                            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">1</td>
                            <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap text-center">
                              Admin
                            </td>
                            <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap text-center">
                              Admin123!
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

export default Admin
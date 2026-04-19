import AddAmountModal from '@/components/Amount/AddAmountModal'
import HeaderName from '@/components/reusable/HeaderName'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'

const AmountPage = () => {
  return (
    <>
      <div className='container py-10 px-4'>
        <HeaderName />
        <div className='card w-1/3 border py-5 rounded flex items-center justify-between px-4 mt-4'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold'>Add Amount</h1>
            <p>Total Amount: 150/-</p>
          </div>

          
          <AddAmountModal />
        </div>   
      </div> 
    </>
  )
}

export default AmountPage
"use client"
import AddAmountModal from '@/components/Amount/AddAmountModal'
import HeaderName from '@/components/reusable/HeaderName'
import { useMainContext } from '@/context/MainContext'
import React from 'react'
import { CiSquarePlus } from 'react-icons/ci'

const AmountPage = () => {
  const {user} = useMainContext()
  return (
    <>
      <div className='container py-10 px-4'>
        <HeaderName />
        <div className='card w-1/3 border py-5 rounded flex items-center justify-between px-4 mt-4'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold'>Add Amount</h1>
            <p className='text-sm text-zinc-500 font-medium'>{user.account_no}</p>
            <p>Total amount: ₹<span className={user.amount > 5 ? "text-green-600" : "text-red-600"}>{user.amount}</span></p>
          </div>

          
          <AddAmountModal id={user.account_no}/>
        </div>   
      </div> 
    </>
  )
}

export default AmountPage
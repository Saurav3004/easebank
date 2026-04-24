"use client"

import { useMainContext } from '@/context/MainContext'
import { axiosClient } from '@/utils/AxiosClient'
import { checkoutUrl, razorpayCallbackUrl } from '@/utils/constant'
import { loadScripts } from '@/utils/loadScripts'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { SiRazorpay } from 'react-icons/si'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export default function AddAmountModal({id}) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  const {user} = useMainContext()
  const initialState = {
    amount:0,
    account_no:id
  }
  const validationSchema = yup.object({
    amount:yup.number().min(1,"Enter Minimum Amount 1 INR").required("Amount is required")
  })

  const onSubmitHandler = async (values,{resetForm}) => {
    try {
      setLoading(true)
      
      await loadScripts(checkoutUrl);

      const response = await axiosClient.post("/amount/add-money",values,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
        amount: (values.amount * 100).toString(),
        currency: "INR",
        name: "EASEBANK",
        description: "Add Money Transaction",
        callback_url: razorpayCallbackUrl(data.txn_id),
        // image: {logo},
        order_id: data.order_id,
        prefill:{
          name: "EASEBANK",
          email:"info@easebank.com",
          contact: user?.contact ? String(user.contact) : "",
        },
        notes:{
          address: "EaseBank Banking",
        },
        theme:{
          color:"#61dafb"
        },
      }
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      toast.success("Amount added successfully")
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    }finally{
      setLoading(false);
      resetForm()
    }
  }

  return (
    <>
        <button onClick={() => setIsOpen(true)} className='text-2xl text-blue-700 cursor-pointer'>
          <CiSquarePlus />
        </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-start justify-center pt-40 p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 text-black">
            <DialogTitle className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between">
              <span>Add Payment</span>
              <button  onClick={() => setIsOpen(false)} className='cursor-pointer hover:bg-gray-300 rounded-full text-lg p-1'> 
                <IoClose />
              </button>
            </DialogTitle>
            
            <Formik validationSchema={validationSchema} initialValues={initialState} onSubmit={onSubmitHandler}>
              {({values,handleSubmit}) => (
                <form onSubmit={handleSubmit} className='w-[96%] lg:w-[80%] mx-auto'>
              <div className='mb-3 flex items-center gap-x-2 border w-full px-2 border-gray-400 rounded-md'>
               <RiMoneyRupeeCircleLine size={17} /> <Field name="amount" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} type="text" className='w-full py-2 outline-none  ' placeholder='Enter Amount (in INR)' />
              </div>
              <div className='mb-3 flex w-full justify-end'>
                <button disabled={values.amount < 1 || loading} className="px-6 py-2 flex items-center gap-x-2 bg-blue-700 hover:bg-blue-600 text-white rounded cursor-pointer disabled:bg-blue-300">
                    <span>Pay with</span> <SiRazorpay />
                </button>
              </div>
            </form>
              )}
            </Formik>

          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

"use client"

import { Button } from '@/components/ui/button';
import { axiosClient } from '@/utils/AxiosClient';
import { Eye, EyeClosed, EyeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as yup from "yup";
import { toast } from 'react-toastify';
import CustomAuthButton from '@/components/reusable/CustomAuthButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMainContext } from '@/context/MainContext';

const RegisterPage = () => {
  const initialValue = {
    name: '',
    email: '',
    password: '',
    account_type: ''
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email().required("Email is Required"),
    password: yup.string().required("Password is Required"),
    account_type: yup.string().oneOf(["saving", "current"], "Account should be a valid Saving or Current Account").required("Account type is required")
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useRouter()
  const {fetchUserProfile} = useMainContext()

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true)
      const response = await axiosClient.post('/auth/register', values);
      const {data} = response
      navigate.push("/login")
      toast.success(data.msg);
      localStorage.setItem("token",data.token)
      fetchUserProfile()
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg || error.message)
    }finally{
      helpers.resetForm()
      setLoading(false)
    }
  }
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className='w-full xl:w-[60%]  flex items-stretch justify-center border'>
          <div className='hidden lg:block h-auto'>
            <img src="https://static.mygov.in/media/blog/2017/06/pic3.jpg" alt="" className="h-full object-cover" />
            </div>

            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
              <Form className='w-full lg:min-w-1/2 max-w-md px-10 py-10 border'>
                <div className='mb-3'>
                  <Field type="text" name='name' className='w-full py-3 px-3 rounded border  outline-none focus:border-black' placeholder='Enter Your Name' />
                  <ErrorMessage name='name' className='text-red-500 text-sm' component={'p'} />

                </div>
                <div className='mb-3'>
                  <Field type="text" name='email' className='w-full py-3 px-3 rounded border outline-none focus:border-black' placeholder='Enter Your Email' />
                  <ErrorMessage name='email' className='text-red-500 text-sm' component={'p'} />

                </div>
                <div className="mb-3">
                  <div className='flex items-center  px-3 rounded border focus-within:border-black'>
                    <Field
                      type={`${showPassword ? "text" : "password"}`}

                      name='password'

                      className="flex-1 py-3 outline-none bg-transparent"
                      placeholder="Enter Your Password"
                    />


                    <span className="ml-2 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeClosed size={12} /> : <Eye size={12} />}
                    </span>
                  </div>
                  <ErrorMessage name='password' className='text-red-500 text-sm' component={'p'} />
                </div>
                <div className='mb-3'>
                  <Field as="select" className='w-full py-3 px-3 rounded border outline-none' id="" name='account_type'>
                    <option value="">Select Account Type</option>
                    <option value="saving">Saving</option>
                    <option value="current">Current</option>
                  </Field>
                  <ErrorMessage name='account_type' className='text-red-500 text-sm' component={'p'} />
                </div>
                <div className='mb-3 '>
                  <CustomAuthButton text={"Register"} isLoading={loading} type="submit" />
                </div>
                <div className='mb-3'>
                  <p className='text-center'>Already have an account? <Link href={"/login"} 
                  className='text-blue-800'>Login</Link></p>
                </div>
              </Form>
            </Formik>
          
        </div>
      </div>
    </>
  )
}

export default RegisterPage
"use client"

import { Button } from '@/components/ui/button';
import { axiosClient } from '@/utils/AxiosClient';
import { Eye, EyeClosed, EyeIcon } from 'lucide-react';
import React, { useState } from 'react'

const LoginPage = () => {
  const [states, setStates] = useState({
    email: '',
    password: '',
  });
  const [showPassword,setShowPassword] = useState(false)

  const onChangeHandler = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login',states);
      const data = await response.data
      console.log(data)
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <form onSubmit={onSubmitHandler} className='w-1/2 px-10 py-10 border'>
          <div className='mb-3'>
            <input type="text" value={states.email} name='email' onChange={onChangeHandler} className='w-full py-3 px-3 rounded border outline-none focus:border-black' placeholder='Enter Your Email' />

          </div>
          <div className="mb-3 flex items-center  px-3 rounded border focus-within:border-black">
            <input
              type={`${showPassword ? "text":"password"}`}
              value={states.password}
              name='password'
              onChange={onChangeHandler}
              className="flex-1 py-3 outline-none bg-transparent"
              placeholder="Enter Your Password"
            />

            <span className="ml-2 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeClosed size={12} /> : <Eye size={12}  />}
            </span>
          </div>
          <div className='mb-3 '>
            <Button  className="w-full text-md bg-blue-500 text-white hover:bg-blue-400 py-6 cursor-pointer">Login</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage
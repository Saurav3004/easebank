"use client"

import React from 'react'
import Logo from './reusable/Logo'
import Link from 'next/link'
import { useMainContext } from '@/context/MainContext'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { setIsToggle } from '@/redux/slice/sidebarSlice'

const Navbar = () => {
    const {user,logoutHandler} = useMainContext()
    const dispatch = useDispatch()
    
  return (
    <>
        <header className='w-full border-b rounded-b-md'>
            <nav className='w-[98%] lg:w-[80%] py-4 mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                    <button onClick={() => dispatch(setIsToggle())} className='bg-gray-100 rounded-full p-2 sm:hidden text-xl hover:bg-gray-200 cursor-pointer'><GiHamburgerMenu /></button>
                    <Logo />
                </div>
                <ul className="flex items-center justify-center gap-x-10">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/services"}>Services</Link>
                    </li>
                    <li>
                        <Link href={"/about"}>About</Link>
                    </li>
                    <li>
                        {
                            user ? (<button className='bg-red-600 py-3 px-4 rounded-md text-sm text-white cursor-pointer font-medium hover:bg-red-500' onClick={logoutHandler}>Logout</button>) : (<Link href={"/login"}>Login</Link>)
                        }
                    </li>
                </ul>
            </nav>

        </header>   
    </>
  )
}

export default Navbar
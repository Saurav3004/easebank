"use client"

import Loader from '@/components/Loader'
import { useMainContext } from '@/context/MainContext'
import { setIsToggle, SidebarSlicePath } from '@/redux/slice/sidebarSlice'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { GrCurrency } from 'react-icons/gr'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux'


const RootTemplate = ({ children }) => {
  const { user } = useMainContext()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isToggle = useSelector(SidebarSlicePath)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  const CustomMenu = ({link,text,Icon}) => {
    const pathname = usePathname()
    return (<>
      <MenuItem 
      style={{
        background: pathname === link ? '#193cb8' : '#fff',
        color: pathname === link ? "#fff" : "#000",
        borderRadius: pathname === link && "3px"
      }}
      icon={Icon}
       component={<Link href={link}/>}> {text} </MenuItem>
    </>)
  }

  return (
    <>
      <section className='flex items-start'>
        <Sidebar breakPoint='lg' toggled={isToggle} onBackdropClick={() => dispatch(setIsToggle())}>
          <Menu className='bg-white! min-h-screen! lg:min-h-[90vh]! py-10 px-3'>
            
            <CustomMenu link={'/'} text={"Home"} Icon={<BiHome size={15}  />} />
            <CustomMenu link={'/amount'} text={"Amount"} Icon={<GrCurrency size={15} />} />
            <CustomMenu link={'/profile'} text={"Profile"} Icon={<FaUser size={15} />} />
            <CustomMenu link={'/profile'} text={"Profile"} Icon={<FaUser size={15} />} />
            
          </Menu>
        </Sidebar>
        <main className='px-1 md:px-3 w-full'>
          {children}
        </main>
      </section>
    </>
  )
}

export default RootTemplate
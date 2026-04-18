import { clsx } from 'clsx';
import React from 'react';
import {CgSpinner} from "react-icons/cg"

const CustomAuthButton = ({
  isLoading=false,
  className="",
  type="submit",
  text,
  ...props
}) => {
  return (
    <>
      <button type={type} {...props} disabled={isLoading} className={clsx(className,isLoading && "disabled:bg-blue-400 disabled:text-blue-100","w-full flex items-center justify-center text-sm bg-blue-800 py-3 rounded shadow text-white cursor-pointer hover:bg-blue-700")}>
        <span>{isLoading ? "Just a moment..." : text}</span> {isLoading && <CgSpinner className="animate-spin ml-2" />}
      </button>
    </>
  )
}

export default CustomAuthButton
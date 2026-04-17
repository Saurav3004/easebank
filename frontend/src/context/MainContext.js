"use client"

import Loader from "@/components/Loader";
import { axiosClient } from "@/utils/AxiosClient";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const mainContext = createContext({user:{},fetchUserProfile(){}});

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) return
            const res = await axiosClient.get("/auth/profile",{
                headers:{
                    'Authorization': "Bearer " + token
                }
            })
            const data = await res.data;
            console.log(data)
            setUser(data)
            
        } catch (error) {
            toast.error(error.response.data.msg || error.message)
        }finally{
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserProfile()
    },[])

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center w-full">
                <Loader  />
            </div>
        )
    }

    return <mainContext.Provider value={{user,fetchUserProfile}}>
        {children}
    </mainContext.Provider>
}
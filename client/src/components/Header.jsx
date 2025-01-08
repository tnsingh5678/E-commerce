import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify'

export default function Header(){
    const options = [
        "Home","About","Contact","Cart","Login","SignUp"
    ]
    const [ choose ,setChoose ] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(choose){
        navigate(`/${choose}`)
        }
    },[choose,navigate])

    const logoutHandler = ()=>{
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        toast.success("Logged out successfully")
        navigate('/Login')
    }
    

    return(
        <>
        <div className="m-5 p-5 bg-blue-500 border rounded-md">
           {options.map((option,index)=>(
            <button key={index} className="bg-slate-500 m-2 p-2 border rounded-lg" onClick={()=>setChoose(option)}>{option}</button>
           ))}
           <button className="bg-slate-500 m-2 p-2 border rounded-lg" onClick={logoutHandler}>Logout</button>
        </div>
        </>
    )
}
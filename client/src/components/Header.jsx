import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

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
    

    return(
        <>
        <div className="m-5 p-5 bg-blue-500 border rounded-md">
           {options.map((option,index)=>(
            <button key={index} className="bg-slate-500 m-2 p-2 border rounded-lg" onClick={()=>setChoose(option)}>{option}</button>
           ))}
        </div>
        </>
    )
}
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function Login(){
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const onLogin = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:4000/auth/login',{
                password,
                email
            })
            const { token } = response.data;
            localStorage.setItem('token',token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            toast.success("Login successful")
            navigate('/')
        } catch (error) {
            toast.error("Login failed. Try again later")
            console.log("Error occured during login ", error)
        }
    }
    return(
    <>
       <div className="p-10 m-5 bg-orange-400">
        <form onSubmit={onLogin}>
        <input value={email} className="p-2 m-2 bg-gray-400" placeholder="email" onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <input value={password} type="password" className="p-2 m-2 bg-gray-400" placeholder="password" onChange={(e)=>setPassword(e.target.value)}>
        </input>
        <button className="p-2 m-2 bg-green-500" type="submit" placeholder="Login">Login
        </button>
        </form>
       </div>
     
      
    </>);
}
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function Signup(){
    const [ name , setName] = useState("");
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const onSignUp = async (e)=>{
        try {
            e.preventDefault();
            await axios.post('http://localhost:4000/auth/signup',{
                name,
                password,
                email
            })
            navigate('/login')
        } catch (error) {
            console.log("Error occured during signup : ",error)
        }
    }
    return(
    <>
      
       <div className="p-10 m-5 bg-orange-400">
        <form onSubmit={onSignUp}>
        <input value={name} className="p-2 m-2 bg-gray-400" placeholder="name" onChange={(e)=>setName(e.target.value)}>
        </input>
        <input value={email} className="p-2 m-2 bg-gray-400" placeholder="email" onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <input value={password} type="password" className="p-2 m-2 bg-gray-400" placeholder="password" onChange={(e)=>setPassword(e.target.value)}>
        </input>
        <button className="p-2 m-2 bg-green-500" type="submit" placeholder="Signup" >Signup
        </button>
        </form>

       </div>
      
    </>);
}
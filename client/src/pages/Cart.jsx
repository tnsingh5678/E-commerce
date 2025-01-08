import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";

export default function Cart(){
    
    const [ items , setItems ] = useState([]);

    const { user } = useContext(UserContext);

    return (
        <>
        <p>{user.userId}</p>
        <p>{user.email}</p>
        </>
    )
    

    
}
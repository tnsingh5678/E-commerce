import {useState , useEffect, useContext} from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { UserContext } from "../context/UserContext";


export default function Home(){
    const { user } = useContext(UserContext);
    
    return(
        <>  
        <Header/>
        <p> Home </p>
        <p> {user.email}</p>
        <p> {user.userId}</p>
        <Footer/>
        </>
    )
}

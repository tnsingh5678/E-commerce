import { useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard";

export default  function Dashboard(){
    const [items , setItems] = useState([]);

    const getItems = async ()=>{
        const response = await axios.get('http://localhost:4000/product/allitem');
        setItems(response.data);
    }

    return(
        <>
        <div className="m-2 p-2 bg-slate-300 grid grid-cols-5">
            {
                items.map((item)=>(
                    <ProductCard
                    itemId={item.itemId}
                    itemName={item.itemName}
                    Urls={item.Urls}
                    quantity={item.quantity}
                    price={item.price}
                    />
                ))
            }
        </div>
        </>
    )
}
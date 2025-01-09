import {useState} from "react"
import axios from "axios"
import {v4 as uuidv4} from "uuid"
import { toast } from "react-toastify"

export default function AddItem(){
    const [itemName , setItemName] = useState("");
    const [quantity , setQuantity] = useState(0);
    const [price , setPrice] = useState(0);
    const [image , setImage] = useState();
    const [message , setMessage] = useState("");
    const [itemId , setItemId] = useState();
    
    
    const FileUpload = (e)=>{
        const files = e.target.files[0];
        setImage(files);
    }

    const CloudinaryUpload = async (e)=>{
        e.preventDefault();
        
        if(!itemName||!quantity||!price||!image){
            setMessage("All fields are required");
            toast.error("All fileds are required")
            return;
        }
        const itemid = uuidv4();
        setItemId(itemid)
        const form = new FormData();
        form.append('itemId',itemId)
        form.append('itemName',itemName);
        form.append('quantity',quantity);
        form.append('price',price);

        form.append('file',image);                                                                                 

        try{
            const response = await axios.post('http://localhost:4000/item/additem',form,{
                header: {
                    'Content-Type' : 'multipart/form-data' 
                }
            })
            setMessage(response.data.message);
            toast.success("Image uploaded successfully")


        }catch(error){
            setMessage("Error uploading item: ",error.response.data.message)
            toast.error("Image upload failed")
        }
    }

    const UpdateData = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/item/updateitem',{
                    itemId,
                    itemName,
                    quantity,
                    price
            })
            toast.success("Data updated successfully")
        } catch (error) {
            console.log("Error while uploading item details : ",error.message)
            toast.error("Data not updated")
        }
        
    }

    const UpdateImage = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/item/update/img',{
                index,
                itemId
            });
            console.log(response.data.message)
            toast.success("Image updated successfully")

        } catch (error) {
            console.log("Error while updating item image : ",error.message);
            toast.error("Image not updated")
        }
    }

    const DeleteItem = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/item/deleteitem',{
                itemId
            });
            toast.success("Item deleed successfully")
            console.log("Item deleted successfully :",response.data.message);
        } catch (error) {
            console.log("Error while deleting item :",error.message);
            toast.error("Error while deleting item")
        }
    }

    return(
        <>
        <div>
            <input className="m-2 p-2 bg-gray-300 border-red-400" placeholder="itemname"
             value={itemName} onChange={(e)=>setItemName(e.target.value)}></input>
            <input className="p-2 m-2 bg-gray-300 border-red-400" placeholder="quantity"
            value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>

            <input className="p-2 m-2 bg-gray-300 border-red-400" placeholder="price"
            value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            <input type="file" onChange={FileUpload} className="p-2 m-2 bg-blue-500"/>

            <button className="btn" onClick={CloudinaryUpload}>Add Item</button>
            <button className="btn" onClick={UpdateData}>Update Item</button>
            <button className="btn" onClick={UpdateImage}>Update Image</button>
            <button className="btn" onClick={DeleteItem}>Delete Item</button>

            <p>{message}</p>

        </div>
        </>
    )
}
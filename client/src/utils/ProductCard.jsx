import {Img} from "react"


export default function ProductCard(props){

    return(
        <>
        <div className="m-5 p-5 bg-gray-600 border rounded-xl">
            <li className="m-2 p-2 bg-orange-400">{props.itemName}</li>
            <div className="w-100px h-200px border-red-500">
                <Img
                src={props.Urls[0]}
                loader={<span>Loading...</span>}
                unloader={<span>Error loading Image</span>}
                ></Img>
            </div>
            <div className="m-2 p-2 bg-orange-400 grid grid-cols-2">
                <li>{props.quantity}</li>
                <li>{props.price}</li>
            </div>
        </div>
        </>
    )
}
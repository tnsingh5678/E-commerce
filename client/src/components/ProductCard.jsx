import { Image } from "react"
export default function ProductCard({props}){
    return(
        <>
        <div className="bg-red-500 border border-r-8 w-400px h-300px">
            <div>{props.itemName}</div>
            <Image
            src={props.Urls[0]}
            width={300}
            height={300}
            ></Image>
            <div className="bg-slate-500">
                <li>{props.quantity}</li>
                <li>{props.price}</li>
            </div>

        </div>
        </>
    )
}
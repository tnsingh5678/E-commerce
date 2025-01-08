import { useState } from "react";
import axios from "axios";

export default function Item() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);

    const category = ["Accessories", "Electronics", "Cosmetics", "Grocery"];

    const getItem = async () => {
        const response = await axios.get('http://localhost:4000/product/');
        setItems(response.data);  
    };

    const getByCategory = async (category) => {
        const response = await axios.get('http://localhost:4000/product/filter/category', {
            params: { category }
        });
        setItems(response.data);
    };

    const getByPrice = async (price) => {
        const response = await axios.get('http://localhost:4000/product/filter/price', {
            params: { price }
        });
        setItems(response.data);
    };

    const getBySortInc = async () => {
        const response = await axios.get('http://localhost:4000/product/filter/sort', {
            params: { type: "INC" }
        });
        setItems(response.data);
    };

    const getBySortDec = async () => {
        const response = await axios.get('http://localhost:4000/product/filter/sort', {
            params: { type: "DEC" }
        });
        setItems(response.data);
    };

    const toggleDropDown = () => {
        setOpen(!open);
    };

    const toggleCategoryDropDown = () => {
        setCategoryOpen(!categoryOpen);
    };

    const setOptionCategory = (category) => {
        setOption(category);
        setCategories([category]);
        setCategoryOpen(false);
        getByCategory(category);  
    };

    const setOptionPrice = (price) => {
        setOption(price);
        setPrice(price);
        getByPrice(price);  
        setOpen(false);
    };

    return (
        <>
            <div className="dropdown">
                <button onClick={toggleDropDown} className="m-2 p-2 bg-slate-400">
                    {option || 'Sort By'}
                </button>
                {open && (
                    <ul className="m-2 p-2 border-r-4 bg-blue-500">
                        <li className="bg-yellow-600" onClick={getItem}>All</li>
                        <li className="bg-yellow-300" onClick={toggleCategoryDropDown}>
                            <div>
                                Categories
                                {categoryOpen && (
                                    <ul>
                                        {category.map((cat, index) => (
                                            <li key={index} className="bg-yellow-300" onClick={() => setOptionCategory(cat)}>
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li className="bg-yellow-300" onClick={() => setOptionPrice(10)}>Price: 10</li>
                        <li className="bg-yellow-300" onClick={getBySortDec}>High to Low</li>
                        <li className="bg-yellow-300" onClick={getBySortInc}>Low to High</li>
                    </ul>
                )}
            </div>
            
            <div>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="p-2">
                            <h3>{item.name}</h3>
                            <p>Category: {item.category}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No items found</p>
                )}
            </div>
        </>
    );
}

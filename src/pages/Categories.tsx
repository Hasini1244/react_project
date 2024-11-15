import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Categories() {

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    async function loadCategories() {
        const apiResponse = await axios.get("http://localhost:8081/categories");
        setCategories(apiResponse.data);
    }

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value);
    }

    async function addCategory() {
        await axios.post("http://localhost:8081/categories", {
            name: categoryName
        });
        loadCategories();
    }

    useEffect(function () {
        //action to take
        loadCategories();
    }, []) //dependency array, if blank runs at the component load
    

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Categories</h1>
            
            <ul>
                {categories.map(category => (
                    <li className="inline-block px-3 py-2 me-3 mb-3 border border-slate-200 rounded-lg shadow-lg text-slate-600">{category.name}</li>
                ))}
            </ul>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                <h2 className="text-xl font-medium mb-4">Add Category</h2>
                
                <label className="text-sm text-slate-600 block mb-3">Enter category name</label>

                <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleCategoryName} />

                <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>Add Category</button>
            </div>
        </div>
    )
}

export default Categories;
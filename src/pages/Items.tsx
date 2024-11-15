import { useEffect, useState } from "react";

import axios from "axios";

import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";
import ItemType from "../types/ItemType";

function Items() {

    
const{isAuthenticated,jwtToken}=useAuth();
    const [items, setItems] = useState<ItemType[]>([]);

    const [itemName, setItemName] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

   
    
    //api request to get products
    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items", config);
        setItems(response.data);
    }

    async function loadCategories() {
        const apiResponse = await axios.get("http://localhost:8081/categories", config);
        setCategories(apiResponse.data);
    }

    async function saveItem() {
        await axios.post("http://localhost:8081/items", {
            name: itemName,
            price: itemPrice,
            categoryId: categoryId,
            description: description
        }, config);
        loadItems();
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadItems();
            loadCategories();
        }
    }, [isAuthenticated])
    function handleItemName(event: any) {
        setItemName(event.target.value);
    }

    function handleItemPrice(event: any) {
        setItemPrice(event.target.value);
    }

    function handleCategoryId(event: any) {
        setCategoryId(event.target.value);
    }

    function handleDescription(event: any) {
        setDescription(event.target.value);
    }

   

    const [itemEditing, setitemEditing] = useState<ItemType | null>();

    function editItem(item: ItemType) {
        setitemEditing(item);
        setItemName(item.name);
        setItemPrice(item.price);
        setCategoryId(item.category.id);
        setDescription(item.description);
    }

    async function updateItem() {
        try {
            await axios.put(`http://localhost:8081/items/${itemEditing?.id}`, {
                name: itemName,
                price: itemPrice,
                categoryId: categoryId,
                description: description
            });
          loadItems();
            setitemEditing(null);
            setItemName("");
            setItemPrice(0);
            setCategoryId(0);
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteItem(itemId: number) {
        try {
            await axios.delete(`http://localhost:8081/items/${itemId}`);
          loadItems();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">
            Items
            </h1>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[200px] text-left">Item Name</th>
                        <th className="p-2 text-left w-[100px]">Item Price</th>
                        <th className="p-2 text-left w-[200px]">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(function (item) {
                        return (
                            <tr>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.id}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.name}</td>
                                <td className="p-2 text-slate-600 text-right border-b border-slate-200">{item.price}</td>
                                <td className="p-2 text-slate-600 border-b border-slate-200">{item.category.name}</td>
                                <td className="p-2 border-b border-slate-200">
                                    <button className="me-3" type="button"
                                        onClick={() => editItem(item)}>Edit</button>
                                    <button type="button"
                                        onClick={() => deleteItem(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                <h2 className="text-xl font-medium mb-4">
                    {itemEditing ? 'Edit Item' : 'Add Item'}
                </h2>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter item name</label>
                    <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={itemName} onChange={handleItemName} />
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter item price</label>
                    <input type="number" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={itemPrice} onChange={handleItemPrice} />
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter category id</label>
                    <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={categoryId} onChange={handleCategoryId} >
                        <option value="">Select Category</option>

                        {categories.map(function (category) {
                            return (
                                <option value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="text-sm text-slate-600 block mb-3">Enter description</label>
                    <textarea className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm" value={description} onChange={handleDescription}>
                    </textarea>
                </div>

                {itemEditing ? (
                    <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateItem}>Update Item</button>
                ) : (
                    <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={saveItem}>Add Item</button>
                )}
            </div>
        </div>
    )
}

export default Items;
import axios from "axios";
import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import { useNavigate } from "react-router-dom";

function CreateOrder() {

    const [items, setItems] = useState<ItemType[]>([]);

    async function getItems() {
        const response = await axios.get("http://localhost:8081/items");
        setItems(response.data);
    }  

    useEffect(function () {
        getItems();
    }, [])

    const [orderedItems, setOrderedItems] = useState<ItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    function addItemToOrder(item: ItemType) {
        const newArray = [...orderedItems, item]
        setOrderedItems(newArray);
    }

    useEffect(function() {
        orderedItems.map(function(item) {
            const total = totalPrice + item.price;
            setTotalPrice(total);
        });
    },[orderedItems]); //trigger when orderedProduct state changes

    const navigate = useNavigate();

    async function saveOrder() {
        try {
            const itemIds:any = [];

            orderedItems.map(function(item) {
                itemIds.push(item.id);
            });

            await axios.post("http://localhost:8081/orders", {
                itemIds: itemIds
            });

            navigate("/orders");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex">
            <div className="p-2 w-[300px] border-r border-slate-100">
                <div className="text-xl text-slate-800 font-semibold">
                Items
                </div>
                <div className="mt-5">
                    {/* display products list here */}
                    {items.map(function (item) {
                        return (
                            <div onClick={() => addItemToOrder(item)} className="p-3 mb-3 border border-slate-200 rounded-lg">
                                <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                                <div className="text-sm text-slate-600">{item.category.name}</div>
                                <div className="text-sm text-right text-green-500">Rs. {item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full p-2">
                <div className="text-xl text-slate-800 font-semibold mb-5">
                    New Stock
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                            <th className="p-2 w-[50px] text-left">#</th>
                            <th className="p-2 w-[300px] text-left">Item</th>
                            <th className="p-2 text-left w-[300px] text-right">Total Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedItems.map(function (item) {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="text-right">{item.price}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="font-semibold" colSpan={2}>
                                Grand Total
                            </td>
                            <td className="font-semibold text-right">{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-5">
                    <button type="button" onClick={saveOrder}>Save Stock</button>
                </div>
            </div>
        </div>
    )
}

export default CreateOrder;
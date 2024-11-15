import ItemType from "./ItemType";


interface OrderType {

    id: number,
    orderDateTime: Date,
    totalPrice: number,
    orderedItems: ItemType[]
}

export default OrderType;
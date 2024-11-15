import CategoryType from "./CategoryType";

interface ItemType {
    id: number,
    name: string,
    description: string,
    price: number,
    category: CategoryType
}

export default ItemType;
export interface IDataIngredients {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IOrder {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

export interface IOrdersAll{
    success: boolean;
    orders: Array<IOrder>;
    total: number;
    totalToday: number;
}

export interface IIngredientsOrder{
    id: string;
    cnt: number;
    data: IDataIngredients
}

export default IDataIngredients;
import React, {FC} from 'react';
import styles from './product-list.module.css';
import Product from "../product/product";
import clsx from 'clsx';
import IDataIngredients from '../../types';

interface IProductListProps {
    listName: string;
    type: string;
    data: Array<IDataIngredients>;
}

export const ProductList: FC<IProductListProps> = ({listName, type, data}) => {
    const pList = data.map(function (el: IDataIngredients, index:number) {
        return (
            <Product key={el._id} data={el}/>
        )
    });
    return (
        <div id={type} className={styles.position}>
            <h3 className="text text_type_main-medium mb-6">{listName}</h3>
            <div className={clsx(styles.list, " pl-4 mb-10")}>
                {pList}
            </div>
        </div>
    )
}

export default ProductList;
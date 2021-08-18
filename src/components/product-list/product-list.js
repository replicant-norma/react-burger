import React from 'react';
import styles from './product-list.css';
import Product from "../product/product";

{/* Компонент для отображения списка продуктов из левого экрана */}

function ProductList(props){
    const pList = props.data.map(function(el, index){
        if (el.type == props.type){
            return(
            <Product key={index} name={el.name}
                     img={el.image}
                     price={el.price}
            />)
        }
    });
    return(
        <div className="position">
            <h3 className="text text_type_main-medium mb-6">{props.listName}</h3>
            <div className="product-list pl-4 mb-10">

                {pList}

            </div>
        </div>
    )
}

export default ProductList;
import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import styles from './wrapper-constructor-element.module.css';
import {Box, Typography, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import ProductList from "../product-list/product-list";
import {
    DELETE_ORDER_ITEM,
    SET_DRAGGED_ELEMENT,
    SET_SWAP_ELEMENT
} from "../../services/actions/burger-constructor-action";

function WrapperConstructorElement(props) {
    const {draggedElement} = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();
    const dragIngredient = (e, el, index) => {
        e.preventDefault();
        //console.log('drag', index);
        dispatch({type: SET_DRAGGED_ELEMENT, index: index});
        //console.log(draggedElement);

    }

    const dropIngredient = (e, el, index) => {
        e.preventDefault();
        //dispatch({
        //    type: 'SWAP_CONSTRUCTOR_INGREDIENT',
        //    draggedElement: draggedElement, swapElement: index
        //});
        //console.log('drop',index)
        dispatch({
            type: SET_SWAP_ELEMENT, index: index
        })
    }

    const [{isDrag}, dragRefInner] = useDrag({
        type: "inner",
        item: props,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    });


    const deleteItemIngredient = (e, index, type) => {
        e.preventDefault();
        dispatch({type: DELETE_ORDER_ITEM, index: index, ingredient: type})
    }
    const opacity = isDrag ? 0 : 1;
    return (
        <div  className={styles.wrapper} style={{opacity:opacity}}  data-index={props.index} ref={dragRefInner}
             onDrag={(e) => dragIngredient(e, props, props.index)}
             onDragEnter={(e) => dropIngredient(e, props, props.index)}
             >
            <DragIcon type="primary"/>
            <ConstructorElement
                text={props.data.name}
                price={props.data.price}
                thumbnail={props.data.image}
                handleClose={(e) => deleteItemIngredient(e, props.index, props.data.type)}
            />
        </div>
    )
}

WrapperConstructorElement.propTypes = {
    data: dataProp.isRequired,
    index: PropTypes.number.isRequired
}

export default WrapperConstructorElement;
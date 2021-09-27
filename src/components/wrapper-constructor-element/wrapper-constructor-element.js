import React, {useContext, useEffect, useMemo, useReducer, useRef} from 'react';
import styles from './wrapper-constructor-element.module.css';
import {Box, Typography, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import dataProp from "../../utils/data-prop";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
    DELETE_ORDER_ITEM,
    SET_DRAGGED_ELEMENT,
    SET_SWAP_ELEMENT, SWAP_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/burger-constructor-action";

function WrapperConstructorElement({index, data}) {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const dragIngredient = (e, el, index) => {
        e.preventDefault();
        dispatch({type: SET_DRAGGED_ELEMENT, index: index});
    }

    const dropIngredient = (e, el, index) => {
        e.preventDefault();
        dispatch({
            type: SET_SWAP_ELEMENT, index: index
        })
    }

    const [{isDrag}, dragRefInner] = useDrag({
        type: "inner",
        item: () => {
            return {index}
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    });

    const [{isDrop}, dropTargetInner] = useDrop({
        accept: "inner",
        collect: monitor => ({
            isDrop: monitor.isOver()
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            //console.log('hover',hoverIndex, hoverClientY);
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dropIngredientInner(dragIndex, hoverIndex)
            item.index = hoverIndex;
        }
    });

    dragRefInner(dropTargetInner(ref));

    const dropIngredientInner = (dragIndex, hoverIndex) => {
        dispatch({
            type: SWAP_CONSTRUCTOR_INGREDIENT,
            draggedElement: dragIndex, swapElement: hoverIndex
        });
    }

    const deleteItemIngredient = (e, index, type) => {
        e.preventDefault();
        dispatch({type: DELETE_ORDER_ITEM, index: index, ingredient: type})
    }
    const opacity = isDrop ? 0 : 1;

    return (
        <div className={styles.wrapper} style={{opacity: opacity}} draggable ref={ref}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={(e) => deleteItemIngredient(e, index, data.type)}
            />
        </div>
    )
}

WrapperConstructorElement.propTypes = {
    data: dataProp.isRequired,
    index: PropTypes.number.isRequired
}

export default WrapperConstructorElement;
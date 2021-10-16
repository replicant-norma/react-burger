import React, {FC, SyntheticEvent, useRef} from 'react';
import styles from './wrapper-constructor-element.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from "react-dnd";
import {
    DELETE_ORDER_ITEM,
    SET_DRAGGED_ELEMENT,
    SET_SWAP_ELEMENT, SWAP_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/burger-constructor-action";
import IDataIngredients from "../../types";
import {useAppDispatch} from "../../services/types/hooks";

interface IWrappedConstructorElement {
    index:number;
    data: IDataIngredients
}

export const WrapperConstructorElement: FC<IWrappedConstructorElement> = ({data, index}) => {

    const dispatch = useAppDispatch();
    const ref = useRef(null);

    const dragIngredient = (e: SyntheticEvent<HTMLElement, Event>, el: IDataIngredients, index: number) => {
        e.preventDefault();
        dispatch({type: SET_DRAGGED_ELEMENT, index: index});
    }

    const dropIngredient = (e: SyntheticEvent<HTMLElement, Event>, el: IDataIngredients, index: number) => {
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
            // @ts-ignore
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // @ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dropIngredientInner(dragIndex, hoverIndex)
            // @ts-ignore
            item.index = hoverIndex;
        }
    });

    dragRefInner(dropTargetInner(ref));

    const dropIngredientInner = (dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: SWAP_CONSTRUCTOR_INGREDIENT,
            draggedElement: dragIndex, swapElement: hoverIndex
        });
    }

    const deleteItemIngredient = (e:React.SyntheticEvent<HTMLElement,Event>, index: number, type: string) => {
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
                // @ts-ignore
                handleClose={(e) => deleteItemIngredient(e, index, data.type)}
            />
        </div>
    )
}

export default WrapperConstructorElement;
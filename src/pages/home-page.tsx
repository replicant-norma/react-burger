import React, {FC} from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";


export const HomePage: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <section className={styles.burger_ingredients}>
                <BurgerIngredients/>
            </section>
            <section className={styles.burger_constructor}>
                <BurgerConstructor/>
            </section>
        </DndProvider>
    )
}
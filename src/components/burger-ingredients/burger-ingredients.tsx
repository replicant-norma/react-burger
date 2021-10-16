import React, {useMemo} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import clsx from 'clsx';
import ProductList from '../product-list/product-list';
import {SET_CURRENT_TAB} from "../../services/actions/burger-ingredients-action";
import IDataIngredients from '../../types';
import {RootState} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/types/hooks";

{/* Собираем левую часть конструктора */
}
export const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const {data, doneLoad, currentTab} = useAppSelector((state: RootState) => state.burgerIngredients);
    const bun = useMemo(() => data.filter((item: IDataIngredients) => item.type === 'bun'), [data]);
    const main = useMemo(() => data.filter((item: IDataIngredients) => item.type === 'main'), [data]);
    const sauce = useMemo(() => data.filter((item: IDataIngredients) => item.type === 'sauce'), [data]);

    const setTab = (tab: string) => {
        dispatch({type: SET_CURRENT_TAB, currentTab: tab})
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    };

    const scrollTab = (tab: string) => {
        dispatch({type: SET_CURRENT_TAB, currentTab: tab})
    };
    const handleScroll = () => {
        // @ts-ignore
        const bunPosition = document.getElementById('bun').getBoundingClientRect().top;
        // @ts-ignore
        const saucePosition = document.getElementById('sauce').getBoundingClientRect().top;
        // @ts-ignore
        const mainPosition = document.getElementById('main').getBoundingClientRect().top;
        // @ts-ignore
        const tabPosition = document.getElementById('tab').getBoundingClientRect().top;

        const deltaBun = Math.abs(Math.abs(tabPosition) - Math.abs(bunPosition));
        const deltaSauce = Math.abs(Math.abs(tabPosition) - Math.abs(saucePosition));
        const deltaMain = Math.abs(Math.abs(tabPosition) - Math.abs(mainPosition));

        if (deltaBun < deltaSauce) {
            scrollTab('bun');
        } else if (deltaSauce < deltaMain) {
            scrollTab('sauce');
        } else {
            scrollTab('main');
        }

    }
    return (
        <>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div id="tab" className={styles.tab}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <div className={clsx(styles.products, "mt-4")} onScroll={handleScroll}>
                {doneLoad && <ProductList listName="Булки" type="bun" data={bun}/>}
                {doneLoad && <ProductList listName="Соусы" type="sauce" data={sauce}/>}
                {doneLoad && <ProductList listName="Начинки" type="main" data={main}/>}
            </div>
        </>

    )
}


export default BurgerIngredients;
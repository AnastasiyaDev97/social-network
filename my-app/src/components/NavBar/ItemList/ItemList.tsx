import {NavLink} from "react-router-dom";
import style from './ItemList.module.scss';
import {FC, memo} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


type ItemListT = {
    path: string
    title: string
    icon: IconProp
}

export const ItemList: FC<ItemListT> = memo(({path, title,icon}) => {
    return (
        <li className={style.item}>
            <NavLink activeClassName={style.active} to={path}>
                <span className={style.icon}>
                    <FontAwesomeIcon icon={icon}/></span>
                <span>{title}</span>
            </NavLink></li>
    )
})
import React, {memo} from "react";
import s from "../Header/Header.module.css";
import {NavLink} from "react-router-dom"

export const Header = memo(() => {


    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.header__inner}>
                    <h1 className={s.header__title}>
                        <NavLink to="/">
                            &#128224;
                        </NavLink>
                    </h1>
                    <ul className={s.menu}>
                        <li className={s.menu__item}>
                            <NavLink className={({isActive}) => isActive ? s.link__active : s.menu__link}
                                     to="/kindergarten">Садики</NavLink>
                        </li>
                        <li className={s.menu__item}>
                            <NavLink className={({isActive}) => isActive ? s.link__active : s.menu__link}
                                     to="/rent">Аренда</NavLink>
                        </li>
                        <li className={s.menu__item}>
                            <NavLink className={({isActive}) => isActive ? s.link__active : s.menu__link}
                                     to="/credit">Кредиты</NavLink>
                        </li>
                        <li className={s.menu__item}>
                            <NavLink className={({isActive}) => isActive ? s.link__active : s.menu__link}
                                     to="/homework">Ежедневник</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
})
